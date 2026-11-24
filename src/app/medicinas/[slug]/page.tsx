import { permanentRedirect } from "next/navigation";

// As antigas fichas individuais saíram do site (plano 013). Toda URL antiga volta ao acervo.
export default function AcervoItemRedirect(): never {
  permanentRedirect("/sacramentos");
}
