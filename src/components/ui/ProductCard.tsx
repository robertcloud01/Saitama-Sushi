"use client";

import Image from "next/image";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cart.store";
import { CartItem } from "@/types";
import React from "react";
import Link from "next/link";

import { Product } from "@/types";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const addItem = useCartStore((state) => state.addItem);

    const handleAdd = (e: React.MouseEvent) => {
        e.stopPropagation();
        const item: CartItem = {
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
        };
        addItem(item);
    };

    return (
        <Link href={`/product/${product.id}`} className="block group relative bg-[#1A1A1A] border border-white/10 rounded-xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-accent/20 transition-all cursor-pointer">
            <div className="relative aspect-[4/3] bg-gray-900">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                {/* Quick Add Overlay Button - Visible on Desktop Hover */}
                <button
                    onClick={handleAdd}
                    className="absolute bottom-4 right-4 bg-white text-black p-3 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-300 hover:bg-accent hover:text-white z-20"
                    aria-label="Adicionar Rápido"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="p-4 text-white">
                <div className="flex justify-between items-start mb-2">
                    <h3 className="font-bold text-lg leading-tight group-hover:text-accent transition-colors">{product.name}</h3>
                </div>
                <p className="text-gray-400 text-sm line-clamp-2 mb-4 h-10">
                    {product.description}
                </p>
                <div className="flex items-center justify-between">
                    <span className="font-bold text-lg">
                        {(product.price / 100).toLocaleString("pt-BR", {
                            style: "currency",
                            currency: "BRL",
                        })}
                    </span>
                    {/* Mobile Add Button */}
                    <button
                        onClick={handleAdd}
                        className="md:hidden p-2 bg-white text-black rounded-full active:bg-accent active:text-white z-20"
                    >
                        <Plus className="w-4 h-4" />
                    </button>
                </div>
            </div>
        </Link>
    );
}
