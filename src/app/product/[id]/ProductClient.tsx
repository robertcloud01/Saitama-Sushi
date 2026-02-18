"use client";

import { useRouter } from "next/navigation";
import Image from "next/image";
import { ArrowLeft, Minus, Plus, ShoppingBag } from "lucide-react";
import { useState } from "react";
import { Product } from "@/types";
import { SAUCES } from "@/lib/mock-data";
import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface ProductClientProps {
    product: Product;
}

export function ProductClient({ product }: ProductClientProps) {
    const router = useRouter();
    const [quantity, setQuantity] = useState(1);
    const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
    const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    // Related products logic (simplified for now, or use prop if passed)
    const relatedProducts: Product[] = [];



    const currentSaucesPrice = selectedSauces.reduce((total, sauceId) => {
        const sauce = SAUCES.find((s) => s.id === sauceId);
        return total + (sauce?.price || 0);
    }, 0);

    const unitPrice = product.price + currentSaucesPrice;
    const finalTotalPrice = unitPrice * quantity;

    const handleAddToCart = () => {
        const sauceNames = selectedSauces
            .map((id) => SAUCES.find((s) => s.id === id)?.name)
            .filter(Boolean)
            .join(", ");

        const displayName = sauceNames
            ? `${product.name} (+ ${sauceNames})`
            : product.name;

        // Create a unique ID based on options so different variations are distinct items
        const compositeId = `${product.id}-${selectedSauces.sort().join("-")}`;

        addItem({
            id: compositeId,
            name: displayName,
            price: unitPrice,
            quantity: quantity,
            image: product.image,
        });
    };

    return (
        <div className="min-h-screen bg-[#111] text-white pb-32 md:pb-0">
            {/* Header / Back Button */}
            <div className="fixed top-0 left-0 right-0 z-40 p-4 md:p-8 pointer-events-none">
                <button
                    onClick={() => router.back()}
                    className="pointer-events-auto bg-black/50 backdrop-blur-md p-3 rounded-full text-white hover:bg-black/70 transition-colors border border-white/10"
                >
                    <ArrowLeft className="w-6 h-6" />
                </button>
            </div>

            <div className="flex flex-col md:flex-row min-h-screen">
                {/* Left: Image */}
                <div className="w-full md:w-1/2 relative h-[50vh] md:h-screen bg-gray-900">
                    <Image
                        src={product.image}
                        alt={product.name}
                        fill
                        className="object-cover"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-[#111] via-transparent to-transparent md:hidden" />
                </div>

                {/* Right: Content */}
                <div className="w-full md:w-1/2 flex flex-col md:h-screen bg-[#111] md:overflow-y-auto custom-scrollbar">
                    <div className="flex-1 p-6 md:p-12 md:pt-24 space-y-8">
                        {/* Header Info */}
                        <div>
                            <span className="text-accent text-sm font-bold uppercase tracking-widest mb-2 block">
                                {product.categoryId}
                            </span>
                            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-4">
                                {product.name}
                            </h1>
                            <p className="text-gray-400 text-lg leading-relaxed max-w-xl">
                                {product.description}
                            </p>
                            <div className="mt-6 flex items-center gap-3">
                                <span className="text-3xl font-bold text-white">
                                    {formatCurrency(product.price)}
                                </span>
                            </div>
                        </div>

                        <div className="h-px bg-white/10 w-full" />

                        {/* Ingredients Accordion */}
                        <div className="border border-white/10 rounded-2xl overflow-hidden bg-white/5">
                            <button
                                onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                                className="w-full px-6 py-4 flex items-center justify-between text-sm font-bold uppercase tracking-wider hover:bg-white/5 transition-colors"
                            >
                                <span>Ingredientes e Detalhes</span>
                                <Plus
                                    className={`w-5 h-5 transition-transform duration-300 ${isIngredientsOpen ? "rotate-45" : ""
                                        }`}
                                />
                            </button>
                            <AnimatePresence>
                                {isIngredientsOpen && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: "auto", opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        className="px-6 pb-6 text-gray-400"
                                    >
                                        {product.ingredients || "Ingredientes premium selecionados por nossos chefs."}
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>

                        {/* Sauces / Options Example (Hidden if empty in mock) */}

                        {/* Related Products */}
                        {relatedProducts.length > 0 && (
                            <div className="space-y-4 pt-4">
                                <h3 className="text-lg font-bold">Você também pode gostar</h3>
                                <div className="grid grid-cols-1 gap-3">
                                    {relatedProducts.map((related) => (
                                        <Link
                                            href={`/product/${related.id}`}
                                            key={related.id}
                                            className="flex items-center justify-between p-3 rounded-xl border border-white/5 bg-white/5 hover:bg-white/10 transition-all group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className="relative w-16 h-16 rounded-lg overflow-hidden bg-gray-800">
                                                    <Image
                                                        src={related.image}
                                                        alt={related.name}
                                                        fill
                                                        className="object-cover group-hover:scale-105 transition-transform"
                                                    />
                                                </div>
                                                <div>
                                                    <p className="font-bold text-white group-hover:text-accent transition-colors">
                                                        {related.name}
                                                    </p>
                                                    <p className="text-sm text-gray-400">
                                                        {formatCurrency(related.price)}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center group-hover:bg-accent group-hover:text-white transition-colors">
                                                <Plus className="w-5 h-5" />
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Fixed Bottom Action Bar (Mobile & Desktop) */}
                    <div className="p-6 md:p-8 bg-[#111] border-t border-white/10 sticky bottom-0 z-10 w-full mt-auto">
                        <div className="flex gap-4 max-w-xl mx-auto md:mx-0">
                            {/* Quantity */}
                            <div className="flex items-center bg-white/5 rounded-full px-1 border border-white/10 h-14">
                                <button
                                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                    disabled={quantity <= 1}
                                    className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-white disabled:opacity-30"
                                >
                                    <Minus className="w-5 h-5" />
                                </button>
                                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                                <button
                                    onClick={() => setQuantity(quantity + 1)}
                                    className="w-12 h-full flex items-center justify-center text-gray-400 hover:text-white"
                                >
                                    <Plus className="w-5 h-5" />
                                </button>
                            </div>

                            {/* Add Button */}
                            <button
                                onClick={handleAddToCart}
                                className="flex-1 bg-accent text-white h-14 rounded-full font-bold text-lg hover:bg-accent/90 transition-colors flex items-center justify-center gap-2 shadow-lg shadow-accent/20"
                            >
                                <ShoppingBag className="w-5 h-5" />
                                <span>Adicionar</span>
                                <span className="bg-white/20 px-2 py-0.5 rounded text-sm">
                                    {formatCurrency(finalTotalPrice)}
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
