"use client";

import Link from "next/link";
import Image from "next/image";
import { MarqueeContainer } from "@/components/ui/MarqueeContainer";
import { ArrowRight } from "lucide-react";

const ROW_1 = [
    { id: '1', name: 'Sushi', image: '/images/Salmon-nigiri.jpeg', slug: 'sushi' },
    { id: '2', name: 'Maki', image: '/images/California-roll.jpeg', slug: 'maki' },
    { id: '3', name: 'Gunkan', image: '/images/Gunkan-union.jpeg', slug: 'gunkan' },
    { id: '4', name: 'Sashimi', image: '/images/Tuna-sashimi.jpeg', slug: 'sashimi' },
];

const ROW_2 = [
    { id: '5', name: 'Pratos Quentes', image: '/images/Tempura-udon.jpeg', slug: 'quentes' },
    { id: '6', name: 'Especiais', image: '/images/Wagyu-beef-roll.jpeg', slug: 'especiais' },
    { id: '7', name: 'Premium', image: '/images/Truffle-Salmon-Nigiri.jpeg', slug: 'premium' },
    { id: '8', name: 'Entradas', image: '/images/spring-rolls.png', slug: 'entradas' },
];

function CategoryCard({ item }: { item: typeof ROW_1[0] }) {
    return (
        <Link
            href="/menu"
            className="group relative flex-shrink-0 w-[300px] h-[140px] bg-[#121212] rounded-xl border border-white/5 overflow-hidden hover:border-accent/50 transition-all duration-300"
        >
            <div className="absolute inset-0 flex items-center justify-between px-6">
                <div className="z-10 flex flex-col items-start gap-2">
                    <span className="font-bold text-lg uppercase tracking-wider group-hover:text-accent transition-colors">
                        {item.name}
                    </span>
                    <span className="text-xs text-gray-500 flex items-center gap-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-300">
                        Ver Opções <ArrowRight className="w-3 h-3" />
                    </span>
                </div>

                <div className="relative w-28 h-28 transform translate-x-4 group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                    <Image
                        src={item.image}
                        alt={item.name}
                        fill
                        className="object-cover rounded-full shadow-2xl"
                    />
                </div>
            </div>

            {/* Glossy Effect */}
            <div className="absolute inset-0 bg-gradient-to-tr from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
        </Link>
    );
}

export function CategoriesCarousel() {
    return (
        <section className="py-20 bg-black text-white relative overflow-hidden">
            <div className="container mx-auto px-4 mb-12">
                <h2 className="text-3xl md:text-5xl font-medium uppercase tracking-wide">
                    Nossas <span className="font-bold text-white">Categorias</span>
                </h2>
            </div>

            <div className="flex flex-col gap-6">
                <MarqueeContainer baseVelocity={-1}>
                    {ROW_1.map((cat) => (
                        <CategoryCard key={cat.id} item={cat} />
                    ))}
                </MarqueeContainer>

                <MarqueeContainer baseVelocity={1}>
                    {ROW_2.map((cat) => (
                        <CategoryCard key={cat.id} item={cat} />
                    ))}
                </MarqueeContainer>
            </div>
        </section>
    );
}
