"use client";

import { MarqueeContainer } from "@/components/ui/MarqueeContainer";

const BRANDS = [
    "SUSHI FRESCO", "ENTREGA RÁPIDA", "QUALIDADE PREMIUM", "SAITAMA DELIVERY",
    "MELHORES INGREDIENTES", "CHEF ESPECIALISTA", "SABOR AUTÊNTICO", "EXPERIÊNCIA ÚNICA"
];

export function BrandsMarquee() {
    return (
        <section className="bg-accent py-2 border-y border-white/10 overflow-hidden">
            <MarqueeContainer baseVelocity={-2} className="py-0">
                {BRANDS.map((text, i) => (
                    <span key={i} className="text-[10px] md:text-xs font-bold italic tracking-wider text-black uppercase mx-4 opacity-70 whitespace-nowrap">
                        {text}
                    </span>
                ))}
            </MarqueeContainer>
        </section>
    );
}
