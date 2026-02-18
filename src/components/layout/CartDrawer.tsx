"use client";

import { useCartStore } from "@/store/cart.store";
import { motion, AnimatePresence } from "framer-motion";
import { X, Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import clsx from "clsx";

export function CartDrawer() {
    const { isOpen, toggleCart, items, updateQuantity, removeItem, totalPrice } = useCartStore();

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 0.5 }}
                        exit={{ opacity: 0 }}
                        onClick={toggleCart}
                        className="fixed inset-0 bg-black z-50 backdrop-blur-sm"
                    />

                    {/* Drawer */}
                    <motion.div
                        initial={{ x: "100%" }}
                        animate={{ x: 0 }}
                        exit={{ x: "100%" }}
                        transition={{ type: "spring", damping: 25, stiffness: 200 }}
                        className="fixed inset-y-0 right-0 z-50 w-full md:w-[450px] bg-white shadow-2xl flex flex-col"
                    >
                        {/* Header */}
                        <div className="p-5 border-b flex items-center justify-between bg-black text-white">
                            <h2 className="text-xl font-bold uppercase tracking-wide">Seu Pedido</h2>
                            <button onClick={toggleCart} className="p-2 hover:bg-gray-800 rounded-full transition-colors">
                                <X className="w-6 h-6" />
                            </button>
                        </div>

                        {/* Items */}
                        <div className="flex-1 overflow-y-auto p-5 space-y-6">
                            {items.length === 0 ? (
                                <div className="h-full flex flex-col items-center justify-center text-center space-y-4 text-muted-foreground">
                                    <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-2">
                                        <span className="text-3xl">🛒</span>
                                    </div>
                                    <p>Seu carrinho está vazio.</p>
                                    <button onClick={toggleCart} className="text-accent font-bold hover:underline">
                                        Ver Menu
                                    </button>
                                </div>
                            ) : (
                                items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-24 h-24 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                                            {item.image && (
                                                <Image
                                                    src={item.image}
                                                    alt={item.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            )}
                                        </div>
                                        <div className="flex-1 flex flex-col justify-between">
                                            <div className="flex justify-between items-start">
                                                <h3 className="font-bold">{item.name}</h3>
                                                <button
                                                    onClick={() => removeItem(item.id)}
                                                    className="text-gray-400 hover:text-red-500 transition-colors"
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                            <p className="text-sm text-muted-foreground">
                                                {(item.price / 100).toLocaleString("pt-BR", {
                                                    style: "currency",
                                                    currency: "BRL",
                                                })}
                                            </p>
                                            <div className="flex items-center gap-3 bg-gray-50 dark:bg-gray-200 self-start rounded-full px-3 py-1">
                                                <button
                                                    onClick={() => updateQuantity(item.id, -1)}
                                                    className={clsx("p-1 rounded-full hover:bg-white transition-colors", item.quantity <= 1 && "opacity-50")}
                                                    disabled={item.quantity <= 1}
                                                >
                                                    <Minus className="w-3 h-3 text-black" />
                                                </button>
                                                <span className="font-bold text-sm text-black w-4 text-center">{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 1)}
                                                    className="p-1 rounded-full hover:bg-white transition-colors"
                                                >
                                                    <Plus className="w-3 h-3 text-black" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            )}
                        </div>

                        {/* Footer */}
                        {items.length > 0 && (
                            <div className="p-5 border-t bg-gray-50">
                                <div className="flex justify-between items-center mb-4 text-lg font-bold">
                                    <span>Subtotal</span>
                                    <span>
                                        {(totalPrice() / 100).toLocaleString("pt-BR", {
                                            style: "currency",
                                            currency: "BRL",
                                        })}
                                    </span>
                                </div>
                                <p className="text-xs text-muted-foreground text-center mb-4">
                                    Frete e taxas calculados no checkout.
                                </p>
                                <Link
                                    href="/checkout"
                                    onClick={toggleCart}
                                    className="block w-full py-4 bg-accent text-white text-center font-bold uppercase tracking-widest rounded-full hover:bg-black transition-all hover:scale-[1.02]"
                                >
                                    Finalizar Pedido
                                </Link>
                            </div>
                        )}
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
