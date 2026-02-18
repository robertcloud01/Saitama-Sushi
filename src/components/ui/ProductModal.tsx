"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus } from "lucide-react";
import Image from "next/image";
import { useCartStore } from "@/store/cart.store";
import { useState, useEffect } from "react";
import { Product, PRODUCTS, SAUCES } from "@/lib/mock-data";


interface ProductModalProps {
    product: Product | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ProductModal({ product, isOpen, onClose }: ProductModalProps) {
    const [quantity, setQuantity] = useState(1);
    const [selectedSauces, setSelectedSauces] = useState<string[]>([]);
    const [isIngredientsOpen, setIsIngredientsOpen] = useState(false);
    const addItem = useCartStore((state) => state.addItem);

    // Reset state when product changes
    useEffect(() => {
        if (isOpen) {
            // Use setTimeout to avoid synchronous state updates in effect (lint fix)
            const timer = setTimeout(() => {
                setQuantity(1);
                setSelectedSauces([]);
                setIsIngredientsOpen(false);
            }, 0);
            return () => clearTimeout(timer);
        }
    }, [isOpen]);

    if (!isOpen || !product) return null;

    const relatedProducts = product.relatedProductIds
        ? PRODUCTS.filter((p) => product.relatedProductIds?.includes(p.id)).slice(0, 4)
        : [];



    const currentSaucesPrice = selectedSauces.reduce((total, sauceId) => {
        const sauce = SAUCES.find((s) => s.id === sauceId);
        return total + (sauce?.price || 0);
    }, 0);

    const unitPrice = product.price + currentSaucesPrice;
    const finalTotalPrice = unitPrice * quantity;

    const handleAddToCart = () => {
        const sauceNames = selectedSauces
            .map(id => SAUCES.find(s => s.id === id)?.name)
            .filter(Boolean)
            .join(", ");

        const displayName = sauceNames
            ? `${product.name} (+ ${sauceNames})`
            : product.name;

        const compositeId = `${product.id}-${selectedSauces.sort().join('-')}`;

        addItem({
            id: compositeId,
            name: displayName,
            price: unitPrice,
            quantity: quantity,
            image: product.image,
        });
        setQuantity(1);
        setSelectedSauces([]);
        onClose();
    };

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/60 z-50 backdrop-blur-sm"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
                    >
                        <div className="bg-white dark:bg-[#111] w-full max-w-[1000px] h-fit max-h-[90vh] rounded-[24px] overflow-hidden shadow-2xl pointer-events-auto flex flex-col md:flex-row relative">

                            {/* Close Button Mobile/Desktop Floating */}
                            <button
                                onClick={onClose}
                                className="absolute top-6 right-6 z-50 bg-white/10 backdrop-blur-md p-2 rounded-full text-black dark:text-white hover:bg-black/10 transition-colors pointer-events-auto"
                            >
                                <X className="w-5 h-5" />
                            </button>

                            {/* Left: Image Section */}
                            <div className="w-full md:w-[55%] relative min-h-[300px] md:h-auto bg-zinc-100 dark:bg-zinc-900 overflow-hidden">
                                <Image
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* Right: Details Section */}
                            <div className="w-full md:w-[45%] flex flex-col max-h-[90vh] md:max-h-none overflow-hidden bg-white dark:bg-[#111]">

                                <div className="flex-1 overflow-y-auto custom-scrollbar">
                                    <div className="p-6 md:p-8 space-y-6">
                                        {/* Category & Title */}
                                        <div>
                                            <span className="text-gray-400 text-xs font-semibold uppercase tracking-wider block mb-1">
                                                Produto
                                            </span>
                                            <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
                                                {product.name}
                                            </h2>
                                            <div className="mt-3 flex items-center gap-2">
                                                <span className="text-xl font-bold text-zinc-900 dark:text-white">
                                                    {(product.price / 100).toLocaleString("pt-BR", {
                                                        style: "currency",
                                                        currency: "BRL",
                                                    })}
                                                </span>
                                            </div>
                                        </div>

                                        {/* Description */}
                                        <p className="text-gray-500 dark:text-gray-400 text-[13px] leading-relaxed">
                                            {product.description}
                                        </p>

                                        {/* Accordion Ingredients */}
                                        <div className="border border-zinc-100 dark:border-white/5 rounded-2xl overflow-hidden">
                                            <button
                                                onClick={() => setIsIngredientsOpen(!isIngredientsOpen)}
                                                className="w-full px-4 py-3 flex items-center justify-between text-xs font-bold text-zinc-900 dark:text-white uppercase tracking-wider transition-colors hover:bg-zinc-50 dark:hover:bg-white/5"
                                            >
                                                Ingredientes e sabores
                                                <motion.div animate={{ rotate: isIngredientsOpen ? 180 : 0 }}>
                                                    <Plus className="w-4 h-4 opacity-50" />
                                                </motion.div>
                                            </button>
                                            <AnimatePresence>
                                                {isIngredientsOpen && (
                                                    <motion.div
                                                        initial={{ height: 0, opacity: 0 }}
                                                        animate={{ height: "auto", opacity: 1 }}
                                                        exit={{ height: 0, opacity: 0 }}
                                                        className="px-4 pb-4 text-sm text-gray-500"
                                                    >
                                                        {product.ingredients || "Salmão delicado, arroz fresco e sabores autênticos."}
                                                    </motion.div>
                                                )}
                                            </AnimatePresence>
                                        </div>

                                        {/* Recommendations */}
                                        {relatedProducts.length > 0 && (
                                            <div className="space-y-4">
                                                <h4 className="text-[11px] font-bold text-zinc-400 uppercase tracking-widest">Também recomendamos</h4>
                                                <div className="space-y-2">
                                                    {relatedProducts.map((related) => (
                                                        <div
                                                            key={related.id}
                                                            className="flex items-center justify-between group p-2 rounded-xl border border-transparent hover:border-zinc-100 dark:hover:border-white/5 bg-zinc-50/50 dark:bg-white/5 transition-all cursor-pointer"
                                                        >
                                                            <div className="flex items-center gap-3">
                                                                <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-zinc-200 shrink-0">
                                                                    <Image src={related.image} alt={related.name} fill className="object-cover" />
                                                                </div>
                                                                <span className="text-[13px] font-medium text-zinc-800 dark:text-zinc-200">{related.name}</span>
                                                            </div>
                                                            <div className="flex items-center gap-2">
                                                                <span className="text-[13px] font-bold text-zinc-900 dark:text-white">
                                                                    {(related.price / 100).toLocaleString("pt-BR", {
                                                                        style: "currency",
                                                                        currency: "BRL",
                                                                    })}
                                                                </span>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </div>
                                            </div>
                                        )}
                                    </div>
                                </div>

                                {/* Bottom Sticky Footer */}
                                <div className="p-6 md:p-8 bg-white dark:bg-[#111] border-t border-zinc-100 dark:border-white/5">
                                    <div className="flex flex-col gap-4">
                                        <div className="flex items-center justify-between bg-zinc-50 dark:bg-white/5 rounded-full px-2 py-1 h-14 border border-zinc-100 dark:border-white/5">
                                            <button
                                                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                                disabled={quantity <= 1}
                                                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-accent disabled:opacity-20 transition-colors"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                            <span className="font-bold text-lg text-zinc-900 dark:text-white tabular-nums">{quantity}</span>
                                            <button
                                                onClick={() => setQuantity(quantity + 1)}
                                                className="w-10 h-10 flex items-center justify-center text-zinc-400 hover:text-accent transition-colors"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        </div>

                                        <button
                                            onClick={handleAddToCart}
                                            className="w-full bg-black dark:bg-accent text-white h-14 rounded-full font-bold text-base hover:opacity-90 transition-all shadow-lg active:scale-[0.98]"
                                        >
                                            Adicionar {quantity} ao pedido {(finalTotalPrice / 100).toLocaleString("pt-BR", {
                                                style: "currency",
                                                currency: "BRL",
                                            })}
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
