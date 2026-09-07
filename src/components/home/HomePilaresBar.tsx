import React from "react";
import { MapPin, Sun, Plane, Scale } from "lucide-react";

const pilares = [
  {
    icon: MapPin,
    title: "Feitio no Acre",
    desc: "Tradição cabocla no Vale do Juruá/AC",
  },
  {
    icon: Sun,
    title: "Alquimia Consciente",
    desc: "Equilíbrio, harmonia e alta vibração",
  },
  {
    icon: Plane,
    title: "Envio Aéreo Gollog",
    desc: "Despacho expresso e pureza preservada",
  },
  {
    icon: Scale,
    title: "Blindagem CONAD 01/2010",
    desc: "Rigor litúrgico e sem fins lucrativos",
  },
];

export const HomePilaresBar = () => {
  return (
    <section className="bg-floresta-950/95 border-y border-ambar-500/15 backdrop-blur-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6">
          {pilares.map(({ icon: Icon, title, desc }) => (
            <div key={title} className="flex items-start gap-3 group">
              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-ambar-500/25 bg-floresta-900 text-ambar-400 group-hover:border-ambar-500/50 group-hover:text-ambar-300 transition-all duration-300 shadow-sm">
                <Icon className="h-4 w-4" />
              </div>
              <div className="space-y-0.5">
                <h4 className="text-xs font-semibold text-areia-100 group-hover:text-ambar-300 transition-colors">
                  {title}
                </h4>
                <p className="text-[11px] text-areia-400 leading-tight">
                  {desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
