import fs from "fs/promises";
import os from "os";
import path from "path";
import { createClient, SupabaseClient } from "@supabase/supabase-js";
import {
  isSupabaseConfigured,
  SUPABASE_PUBLIC_URL,
  SUPABASE_PUBLIC_ANON_KEY,
} from "../supabase/client";

const DATA_DIR = path.join(process.cwd(), "data");

let cachedDirectClient: SupabaseClient | null = null;

/**
 * Cliente Supabase singleton para operações de servidor (Route Handlers / DB Layer).
 */
export function getDirectSupabaseClient(): SupabaseClient | null {
  if (!isSupabaseConfigured()) return null;
  if (cachedDirectClient) return cachedDirectClient;

  if (!SUPABASE_PUBLIC_URL || !SUPABASE_PUBLIC_ANON_KEY) return null;

  try {
    cachedDirectClient = createClient(
      SUPABASE_PUBLIC_URL,
      SUPABASE_PUBLIC_ANON_KEY,
      {
        auth: { persistSession: false },
      }
    );
    return cachedDirectClient;
  } catch {
    return null;
  }
}

/**
 * Envolve qualquer Promise/Thenable do Supabase em um timeout estrito (padrão 2000ms),
 * rejeitando graciosamente para acionar o fallback local em caso de lentidão de rede.
 */
export function withTimeout<T>(promise: PromiseLike<T>, ms = 2000): Promise<T> {
  let timer: ReturnType<typeof setTimeout> | undefined;
  const timeoutPromise = new Promise<never>((_, reject) => {
    timer = setTimeout(
      () => reject(new Error(`Timeout de ${ms}ms excedido na consulta remota`)),
      ms
    );
  });

  return Promise.race([Promise.resolve(promise), timeoutPromise]).finally(() => {
    if (timer) clearTimeout(timer);
  });
}

export interface HybridJsonStoreOptions<T> {
  filename: string;
  seedData?: T[];
  getKey?: (item: T) => string;
}

export interface HybridJsonStore<T> {
  filename: string;
  dataFilePath: string;
  tmpFilePath: string;
  ensureInitialized: () => Promise<void>;
  readAll: () => Promise<T[]>;
  writeAll: (items: T[]) => Promise<void>;
  read: () => Promise<T[]>;
  write: (items: T[]) => Promise<void>;
  upsert: (item: T) => Promise<T>;
  remove: (key: string) => Promise<boolean>;
}

async function readJsonArraySafe<T>(filePath: string): Promise<T[] | null> {
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? (parsed as T[]) : null;
  } catch {
    return null;
  }
}

async function writeAtomicFile(filePath: string, payload: string): Promise<boolean> {
  const dir = path.dirname(filePath);
  const tmpFile = `${filePath}.tmp.${Date.now()}.${Math.random().toString(36).slice(2, 7)}`;
  try {
    await fs.mkdir(dir, { recursive: true });
    await fs.writeFile(tmpFile, payload, "utf-8");
    await fs.rename(tmpFile, filePath);
    return true;
  } catch {
    try {
      await fs.unlink(tmpFile);
    } catch {
      // Ignora se tmp não chegou a ser criado
    }
    return false;
  }
}

/**
 * Cria um repositório JSON híbrido resiliente a ambientes serverless read-only (EROFS).
 * - Lê e mescla `seedData` + `data/${filename}` + `os.tmpdir()/nativaram_${filename}`.
 * - Grava atomicamente via `.tmp` + `rename` em `data/` e espelha em `os.tmpdir()`.
 * - Respeita exclusões explícitas (`writeAll` / `remove`) sem ressuscitar itens deletados.
 */
export function createHybridJsonStore<T = { id?: string }>(
  options: HybridJsonStoreOptions<T>
): HybridJsonStore<T> {
  const { filename, seedData = [] } = options;
  const resolveKey =
    options.getKey ||
    ((item: T) =>
      String((item as { id?: string })?.id ?? "")
        .trim()
        .toUpperCase());

  const dataFilePath = path.join(DATA_DIR, filename);
  const tmpFilePath = path.join(os.tmpdir(), `nativaram_${filename}`);
  const deletedKeys = new Set<string>();
  const knownKeys = new Set<string>(
    seedData.map((item) => resolveKey(item)).filter(Boolean)
  );

  async function ensureInitialized(): Promise<void> {
    try {
      await fs.access(dataFilePath);
      return;
    } catch {
      // Arquivo principal ainda não existe
    }

    const payload = JSON.stringify(seedData, null, 2);
    const wroteMain = await writeAtomicFile(dataFilePath, payload);
    if (!wroteMain) {
      try {
        await fs.access(tmpFilePath);
      } catch {
        await writeAtomicFile(tmpFilePath, payload);
      }
    }
  }

  async function readAll(): Promise<T[]> {
    const mainItems = await readJsonArraySafe<T>(dataFilePath);
    const tmpItems = await readJsonArraySafe<T>(tmpFilePath);

    if (mainItems === null && tmpItems === null) {
      await ensureInitialized();
    }

    let includeTmpOverlay = tmpItems !== null;
    if (mainItems !== null && tmpItems !== null) {
      try {
        const [mainStat, tmpStat] = await Promise.all([
          fs.stat(dataFilePath),
          fs.stat(tmpFilePath),
        ]);
        // Aplica overlay de tmpdir quando tmpFile for mais recente que o arquivo principal (ex: EROFS ou escrita direta em tmpdir)
        includeTmpOverlay = tmpStat.mtimeMs > mainStat.mtimeMs;
      } catch {
        includeTmpOverlay = true;
      }
    }

    const mapa = new Map<string, T>();

    for (const item of seedData) {
      if (!item) continue;
      const key = resolveKey(item);
      if (!key || deletedKeys.has(key)) continue;
      knownKeys.add(key);
      mapa.set(key, item);
    }

    if (mainItems) {
      for (const item of mainItems) {
        if (!item) continue;
        const key = resolveKey(item);
        if (!key || deletedKeys.has(key)) continue;
        knownKeys.add(key);
        mapa.set(key, item);
      }
    }

    if (tmpItems && includeTmpOverlay) {
      for (const item of tmpItems) {
        if (!item) continue;
        const key = resolveKey(item);
        if (!key || deletedKeys.has(key)) continue;
        knownKeys.add(key);
        mapa.set(key, item);
      }
    }

    return Array.from(mapa.values());
  }

  async function writeAll(items: T[]): Promise<void> {
    const incomingKeys = new Set<string>();
    for (const item of items) {
      if (!item) continue;
      const key = resolveKey(item);
      if (key) {
        incomingKeys.add(key);
        knownKeys.add(key);
        deletedKeys.delete(key);
      }
    }

    for (const knownKey of Array.from(knownKeys)) {
      if (!incomingKeys.has(knownKey)) {
        deletedKeys.add(knownKey);
      }
    }

    const payload = JSON.stringify(items, null, 2);
    const wroteTmp = await writeAtomicFile(tmpFilePath, payload);
    if (!wroteTmp) {
      try {
        await fs.writeFile(tmpFilePath, payload, "utf-8");
      } catch {
        // Ignora erro secundário de tmpdir
      }
    }
    await writeAtomicFile(dataFilePath, payload);
  }

  async function upsert(item: T): Promise<T> {
    const key = resolveKey(item);
    if (key) {
      deletedKeys.delete(key);
      knownKeys.add(key);
    }
    const current = await readAll();
    const index = current.findIndex((existing) => resolveKey(existing) === key);
    if (index >= 0) {
      current[index] = item;
    } else {
      current.unshift(item);
    }
    await writeAll(current);
    return item;
  }

  async function remove(key: string): Promise<boolean> {
    const normalized = key.trim().toUpperCase();
    const current = await readAll();
    const filtered = current.filter(
      (item) => resolveKey(item).toUpperCase() !== normalized
    );
    if (filtered.length === current.length) {
      return false;
    }
    deletedKeys.add(normalized);
    await writeAll(filtered);
    return true;
  }

  return {
    filename,
    dataFilePath,
    tmpFilePath,
    ensureInitialized,
    readAll,
    writeAll,
    read: readAll,
    write: writeAll,
    upsert,
    remove,
  };
}
