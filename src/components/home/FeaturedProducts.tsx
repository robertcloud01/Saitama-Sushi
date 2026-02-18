"use client";

import { Product } from "@/types";
import { ProductCard } from "@/components/ui/ProductCard";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

interface FeaturedProductsProps {
    products: Product[];
}

export function FeaturedProducts({ products }: FeaturedProductsProps) {

    return (
        <section className="py-20 bg-black text-white border-t border-white/10">
            <div className="container mx-auto px-4 md:px-6">
                <div className="flex justify-between items-end mb-12">
                    <div>
                        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 uppercase">
                            Mais <span className="text-accent">Procurados</span>
                        </h2>
                        <p className="text-gray-400">Escolhas favoritas dos nossos clientes.</p>
                    </div>
                    <Link
                        href="/menu"
                        className="hidden md:flex items-center gap-2 font-medium hover:text-accent transition-colors"
                    >
                        Ver Menu Completo <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} />
                    ))}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link
                        href="/menu"
                        className="inline-flex items-center gap-2 font-medium hover:text-accent transition-colors"
                    >
                        Ver Menu Completo <ArrowRight className="w-4 h-4" />
                    </Link>
                </div>
            </div>
        </section>
    );
}
