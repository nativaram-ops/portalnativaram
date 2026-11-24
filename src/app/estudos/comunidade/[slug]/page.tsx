import { permanentRedirect } from "next/navigation";

// O mural e os perfis de templos saíram das páginas públicas (plano 013).
// Os componentes de comunidade continuam no código, sem uso público.
export default function PerfilTemploRedirect(): never {
  permanentRedirect("/estudos");
}
