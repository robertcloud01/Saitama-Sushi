"use client";

import { useCartStore } from "@/store/cart.store";
import { Minus, Plus } from "lucide-react";
import Image from "next/image";

export function StickyCart() {
    const { items, removeItem, updateQuantity } = useCartStore();

    // Calculate totals
    const subtotal = items.reduce((acc, item) => acc + item.price * item.quantity, 0);
    const shipping = 0; // Free shipping for now or logic
    const total = subtotal + shipping;

    if (items.length === 0) {
        return (
            <aside className="hidden lg:flex w-[320px] sticky top-24 h-[400px] flex-col bg-white rounded-3xl p-6 text-black shadow-xl">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="font-bold text-xl">Carrinho</h3>
                </div>
                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 text-center">
                    <p className="mb-2">Seu carrinho está vazio</p>
                    <p className="text-sm text-gray-300">Adicione itens deliciosos do menu</p>
                </div>
            </aside>
        );
    }

    return (
        <aside className="hidden lg:flex w-[320px] sticky top-24 max-h-[calc(100vh-40px)] flex-col bg-white rounded-3xl p-6 text-black shadow-xl overflow-hidden">
            <div className="flex justify-between items-center mb-6 shrink-0">
                <h3 className="font-bold text-xl">Carrinho</h3>
                <button
                    onClick={() => items.forEach(i => removeItem(i.id))}
                    className="text-xs text-gray-500 hover:text-red-500 underline"
                >
                    Limpar tudo
                </button>
            </div>

            {/* Scrollable Items List */}
            <div className="flex-1 overflow-y-auto -mx-2 px-2 space-y-4 mb-6 scrollbar-thin scrollbar-thumb-gray-200">
                {items.map((item) => (
                    <div key={item.id} className="flex gap-3 items-start group">
                        {/* Use item image if available, else placeholder */}
                        <div className="relative w-12 h-12 bg-gray-100 rounded-lg overflow-hidden shrink-0">
                            {item.image ? (
                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-200" />
                            )}
                        </div>

                        <div className="flex-1">
                            <div className="flex justify-between items-start mb-1">
                                <h4 className="font-medium text-sm line-clamp-2 leading-tight">{item.name}</h4>
                                <span className="font-bold text-sm whitespace-nowrap ml-2">
                                    {(item.price / 100).toLocaleString("pt-BR", { minimumFractionDigits: 2 })}
                                </span>
                            </div>

                            <div className="flex items-center justify-between mt-2">
                                <div className="flex items-center gap-3 bg-gray-100 rounded-full px-2 py-1">
                                    <button
                                        onClick={() => item.quantity > 1 ? updateQuantity(item.id, item.quantity - 1) : removeItem(item.id)}
                                        className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-black"
                                    >
                                        <Minus className="w-3 h-3" />
                                    </button>
                                    <span className="text-xs font-bold w-3 text-center">{item.quantity}</span>
                                    <button
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        className="w-5 h-5 flex items-center justify-center text-gray-600 hover:text-black"
                                    >
                                        <Plus className="w-3 h-3" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {/* Total Footer */}
            <div className="shrink-0 pt-4 border-t border-gray-100">
                <div className="flex justify-between items-center mb-4 text-sm">
                    <span className="text-gray-500">Subtotal</span>
                    <span className="font-bold">{(subtotal / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span>
                </div>

                <button className="w-full bg-[#ff2ca2] text-white font-bold py-4 rounded-xl hover:bg-[#d9007e] transition-colors shadow-lg shadow-[#ff2ca2]/20 flex justify-between px-6 items-center">
                    <span>Encomendar</span>
                    <span>{(total / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span>
                </button>
            </div>
        </aside>
    );
}
