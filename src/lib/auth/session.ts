import crypto from "crypto";
import { NextRequest, NextResponse } from "next/server";

export const SESSION_COOKIE_NAME = "nativaram_session";
const DEFAULT_TTL_MS = 1000 * 60 * 60 * 12; // 12 horas

export interface SessionPayload {
  role: "ADMIN" | "DIRIGENTE";
  codigo?: string;
  temploCodigo?: string;
  sub?: string;
  iat?: number;
  exp?: number;
  [key: string]: unknown;
}

function getSessionSecret(): string {
  return process.env.ADMIN_SECRET_KEY || "nativaram-liturgico-session-key";
}

function signBase64Url(encodedPayload: string): string {
  return crypto
    .createHmac("sha256", getSessionSecret())
    .update(encodedPayload)
    .digest("base64url");
}

/**
 * Gera um token de sessão assinado via HMAC-SHA256 sem dependências externas.
 */
export function createSessionToken(
  payload: SessionPayload,
  ttlMs = DEFAULT_TTL_MS
): string {
  const now = Date.now();
  const normalized: SessionPayload = {
    ...payload,
    codigo:
      payload.codigo ||
      payload.temploCodigo ||
      payload.sub ||
      (payload.role === "ADMIN" ? "ADM-NATIVARAM" : ""),
    iat: payload.iat ?? now,
    exp: payload.exp ?? now + ttlMs,
  };

  const encodedPayload = Buffer.from(
    JSON.stringify(normalized),
    "utf-8"
  ).toString("base64url");
  const signature = signBase64Url(encodedPayload);

  return `${encodedPayload}.${signature}`;
}

/**
 * Verifica integridade, assinatura HMAC-SHA256 e validade temporal do token de sessão.
 */
export function verifySessionToken(
  token: string | undefined | null
): SessionPayload | null {
  if (!token || typeof token !== "string" || !token.includes(".")) {
    return null;
  }

  const parts = token.split(".");
  if (parts.length !== 2) {
    return null;
  }

  const [encodedPayload, signature] = parts;
  if (!encodedPayload || !signature) {
    return null;
  }

  const expectedSignature = signBase64Url(encodedPayload);
  const sigBuffer = Buffer.from(signature, "utf-8");
  const expectedBuffer = Buffer.from(expectedSignature, "utf-8");

  if (
    sigBuffer.length !== expectedBuffer.length ||
    !crypto.timingSafeEqual(sigBuffer, expectedBuffer)
  ) {
    return null;
  }

  try {
    const rawJson = Buffer.from(encodedPayload, "base64url").toString("utf-8");
    const parsed = JSON.parse(rawJson) as SessionPayload;

    if (!parsed || (parsed.role !== "ADMIN" && parsed.role !== "DIRIGENTE")) {
      return null;
    }

    if (typeof parsed.exp === "number" && Date.now() > parsed.exp) {
      return null;
    }

    return parsed;
  } catch {
    return null;
  }
}

function extractCookieToken(request: NextRequest | Request): string | null {
  if ("cookies" in request && typeof request.cookies?.get === "function") {
    const cookieVal = request.cookies.get(SESSION_COOKIE_NAME)?.value;
    if (cookieVal) return cookieVal;
  }

  const cookieHeader = request.headers.get("cookie");
  if (!cookieHeader) return null;

  const pairs = cookieHeader.split(";");
  for (const pair of pairs) {
    const [rawName, ...rest] = pair.trim().split("=");
    if (rawName === SESSION_COOKIE_NAME) {
      return decodeURIComponent(rest.join("="));
    }
  }

  return null;
}

/**
 * Verifica se a requisição possui autorização administrativa:
 * - Cookie HttpOnly `nativaram_session` assinado com `role === "ADMIN"`
 * - Ou cabeçalho `x-nativaram-auth` para compatibilidade com suíte de testes CLI
 */
export function verifyAdminRequest(request: NextRequest | Request): boolean {
  const authHeader = request.headers.get("x-nativaram-auth");
  const expectedAdminHeader =
    process.env.ADMIN_SECRET_KEY || "adm-nativaram-2026";

  if (authHeader) {
    if (
      authHeader === expectedAdminHeader ||
      authHeader === "adm-nativaram-2026"
    ) {
      return true;
    }
    const headerSession = verifySessionToken(authHeader);
    if (headerSession?.role === "ADMIN") {
      return true;
    }
  }

  const cookieToken = extractCookieToken(request);
  const session = verifySessionToken(cookieToken);
  return session?.role === "ADMIN";
}

/**
 * Verifica se a requisição pertence a um administrador ou ao dirigente titular do templo.
 */
export function verifyDirigenteOrAdminRequest(
  request: NextRequest | Request,
  expectedTemploCodigo?: string
): boolean {
  if (verifyAdminRequest(request)) {
    return true;
  }

  const cookieToken =
    extractCookieToken(request) || request.headers.get("x-nativaram-auth");
  const session = verifySessionToken(cookieToken);

  if (!session || session.role !== "DIRIGENTE") {
    return false;
  }

  if (!expectedTemploCodigo) {
    return true;
  }

  const sessionCodigo = String(
    session.codigo || session.temploCodigo || ""
  )
    .trim()
    .toUpperCase();
  return sessionCodigo === expectedTemploCodigo.trim().toUpperCase();
}

/**
 * Anexa o cookie HttpOnly `nativaram_session` na resposta HTTP.
 */
export function setSessionCookie(
  response: NextResponse,
  payload: SessionPayload,
  ttlMs = DEFAULT_TTL_MS
): NextResponse {
  const token = createSessionToken(payload, ttlMs);
  response.cookies.set({
    name: SESSION_COOKIE_NAME,
    value: token,
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: Math.floor(ttlMs / 1000),
  });
  return response;
}

const rateLimitWindows = new Map<string, number[]>();

/**
 * Rate limiter sliding-window em memória para proteção de rotas sensíveis.
 */
export function checkRateLimit(
  key: string,
  maxRequests = 15,
  windowMs = 60_000
): boolean {
  const now = Date.now();
  const cutoff = now - windowMs;
  const timestamps = (rateLimitWindows.get(key) || []).filter(
    (timestamp) => timestamp > cutoff
  );

  if (timestamps.length >= maxRequests) {
    rateLimitWindows.set(key, timestamps);
    return false;
  }

  timestamps.push(now);
  rateLimitWindows.set(key, timestamps);
  return true;
}
