"use client";

import Image from "next/image";
import Link from "next/link";
import { Plus } from "lucide-react";
import { useCartStore } from "@/store/cart.store";

import { Product } from "@/types";

interface PopularDishesSectionProps {
    products: Product[];
}



export function PopularDishesSection({ products }: PopularDishesSectionProps) {
    const addItem = useCartStore((state) => state.addItem);

    // Use passed products instead of mock
    const col2Products = products.filter((_, i) => i % 2 === 0);
    const col3Products = products.filter((_, i) => i % 2 !== 0);

    const handleAdd = (e: React.MouseEvent, product: Product) => {
        e.preventDefault();
        e.stopPropagation();
        addItem({
            id: product.id,
            name: product.name,
            price: product.price,
            quantity: 1,
            image: product.image,
        });
    };

    return (
        <section className="relative w-full bg-[#0E0E0E] min-h-screen">
            <div className="grid grid-cols-1 lg:grid-cols-[45%_27.5%_27.5%] w-full">

                {/* COLUMN 1 - Sticky Fixed Left */}
                <div className="hidden lg:block relative h-screen sticky top-0 overflow-hidden">
                    {/* Background Image */}
                    <Image
                        src="/images/sticky-sidebar-bg.png"
                        alt="Premium Background"
                        fill
                        className="object-cover opacity-60"
                        priority
                    />

                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-transparent" />

                    {/* Content */}
                    <div className="absolute inset-0 flex flex-col justify-center p-12 lg:p-16 z-10">
                        <h2 className="text-5xl lg:text-7xl font-bold text-white tracking-tighter leading-[1.1] mb-8 font-sans">
                            VEJA NOSSOS <br />
                            PRODUTOS <br />
                            <span className="text-[#ff2ca2]">MAIS POPULARES</span>
                        </h2>

                        <p className="text-gray-300 text-lg mb-10 max-w-md font-light">
                            Uma seleção exclusiva dos pratos mais amados pelos nossos clientes. Sabor inigualável e qualidade premium.
                        </p>

                        <Link
                            href="/menu"
                            className="inline-flex max-w-fit px-8 py-4 bg-[#ff2ca2] text-white rounded-full font-bold text-lg hover:bg-[#d9007e] transition-all transform hover:scale-105 shadow-lg shadow-[#ff2ca2]/20"
                        >
                            Faça seu pedido agora
                        </Link>
                    </div>
                </div>

                {/* Mobile Header (Only visible on small screens) */}
                <div className="lg:hidden p-8 pb-0">
                    <h2 className="text-3xl font-bold text-white tracking-tight mb-4">
                        PRODUTOS MAIS POPULARES
                    </h2>
                </div>

                {/* COLUMN 2 - Scrollable Cards */}
                <div className="flex flex-col gap-6 p-4 lg:p-6 lg:pt-24 lg:pb-24">
                    {col2Products.map((product) => (
                        <PopularCard key={product.id} product={product} onAdd={handleAdd} />
                    ))}
                </div>

                {/* COLUMN 3 - Scrollable Cards */}
                <div className="flex flex-col gap-6 p-4 lg:p-6 lg:pt-48 lg:pb-24">
                    {col3Products.map((product) => (
                        <PopularCard key={product.id} product={product} onAdd={handleAdd} />
                    ))}
                </div>
            </div>
        </section>
    );
}

function PopularCard({ product, onAdd }: { product: Product, onAdd: (e: React.MouseEvent, p: Product) => void }) {
    return (
        <div className="group relative bg-[#111111] rounded-2xl overflow-hidden cursor-pointer transition-transform duration-300 hover:-translate-y-1">
            <div className="relative aspect-[1.2/1] w-full">
                <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    className="object-cover"
                />

                {/* Gradient Overlay for Text Readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[#111111] via-transparent to-transparent opacity-90" />

                {/* Floating Add Button */}
                <button
                    onClick={(e) => onAdd(e, product)}
                    className="absolute top-4 right-4 bg-white/10 backdrop-blur-md p-2 rounded-full text-white hover:bg-[#ff2ca2] transition-colors"
                >
                    <Plus className="w-5 h-5" />
                </button>
            </div>

            <div className="p-5 pt-2 relative">
                <h3 className="text-white font-medium text-lg leading-tight mb-1 group-hover:text-[#ff2ca2] transition-colors">
                    {product.name}
                </h3>

                {/* Price Display */}
                <div className="inline-flex items-baseline gap-1">
                    <span className="text-gray-400 text-xs">R$</span>
                    <span className="text-white font-bold text-xl">
                        {(product.price / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                    </span>
                </div>
            </div>
        </div>
    );
}
