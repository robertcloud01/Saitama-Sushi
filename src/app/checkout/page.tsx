"use client";

import { useCartStore } from "@/store/cart.store";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";
import { Trash2, ChevronRight, CreditCard, Banknote, MapPin } from "lucide-react";
import Link from "next/link";

export default function CheckoutPage() {
    const { items, removeItem, totalPrice, clearCart } = useCartStore();
    const router = useRouter();
    const [isProcessing, setIsProcessing] = useState(false);

    // Redirect if empty (client-side check)
    useEffect(() => {
        if (items.length === 0) {
            // Optional: router.push("/menu");
        }
    }, [items, router]);

    const handlePlaceOrder = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsProcessing(true);

        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 2000));

        clearCart();
        router.push("/order-confirmation");
    };

    if (items.length === 0) {
        return (
            <div className="min-h-screen bg-black pt-32 pb-20 flex flex-col items-center justify-center text-center px-4">
                <div className="w-24 h-24 bg-gray-900 rounded-full flex items-center justify-center mb-6">
                    <span className="text-4xl">🛒</span>
                </div>
                <h1 className="text-3xl font-bold text-white mb-4">Seu carrinho está vazio</h1>
                <p className="text-gray-400 mb-8 max-w-md">Parece que você ainda não escolheu seus pratos favoritos.</p>
                <Link href="/menu" className="px-8 py-3 bg-[#ff2ca2] text-white font-bold rounded-full hover:bg-[#d9007e] transition-colors">
                    Ver Menu
                </Link>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black pt-32 pb-20">
            <div className="container mx-auto px-4 md:px-8">
                <h1 className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-10">
                    Finalizar Pedido
                </h1>

                <div className="grid grid-cols-1 lg:grid-cols-[1.5fr_1fr] gap-12">

                    {/* LEFT COLUMN: FORMS */}
                    <form id="checkout-form" onSubmit={handlePlaceOrder} className="space-y-10">

                        {/* 1. Delivery Details */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#ff2ca2]/20 flex items-center justify-center text-[#ff2ca2]">
                                    <MapPin className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Endereço de Entrega</h2>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="md:col-span-2">
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Endereço Completo</label>
                                    <input required type="text" placeholder="Rua, Número, Bairro" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ff2ca2] outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Complemento</label>
                                    <input type="text" placeholder="Apto, Bloco (Opcional)" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ff2ca2] outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">CEP</label>
                                    <input required type="text" placeholder="00000-000" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ff2ca2] outline-none transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* 2. Personal Info */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
                            <h2 className="text-xl font-bold text-white mb-6">Dados Pessoais</h2>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Nome Completo</label>
                                    <input required type="text" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ff2ca2] outline-none transition-colors" />
                                </div>
                                <div>
                                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Telefone / WhatsApp</label>
                                    <input required type="tel" className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white focus:border-[#ff2ca2] outline-none transition-colors" />
                                </div>
                            </div>
                        </div>

                        {/* 3. Payment */}
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5">
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-full bg-[#ff2ca2]/20 flex items-center justify-center text-[#ff2ca2]">
                                    <CreditCard className="w-5 h-5" />
                                </div>
                                <h2 className="text-xl font-bold text-white">Pagamento</h2>
                            </div>

                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <label className="relative cursor-pointer">
                                    <input type="radio" name="payment" className="peer sr-only" defaultChecked />
                                    <div className="h-full p-4 rounded-xl border border-white/10 bg-black/50 peer-checked:border-[#ff2ca2] peer-checked:bg-[#ff2ca2]/10 transition-all flex flex-col items-center justify-center gap-2 text-center hover:bg-white/5">
                                        <CreditCard className="w-6 h-6 text-white" />
                                        <span className="text-sm font-bold text-white">Cartão de Crédito</span>
                                    </div>
                                </label>

                                <label className="relative cursor-pointer">
                                    <input type="radio" name="payment" className="peer sr-only" />
                                    <div className="h-full p-4 rounded-xl border border-white/10 bg-black/50 peer-checked:border-[#ff2ca2] peer-checked:bg-[#ff2ca2]/10 transition-all flex flex-col items-center justify-center gap-2 text-center hover:bg-white/5">
                                        <span className="text-2xl">💠</span>
                                        <span className="text-sm font-bold text-white">Pix</span>
                                    </div>
                                </label>

                                <label className="relative cursor-pointer">
                                    <input type="radio" name="payment" className="peer sr-only" />
                                    <div className="h-full p-4 rounded-xl border border-white/10 bg-black/50 peer-checked:border-[#ff2ca2] peer-checked:bg-[#ff2ca2]/10 transition-all flex flex-col items-center justify-center gap-2 text-center hover:bg-white/5">
                                        <Banknote className="w-6 h-6 text-white" />
                                        <span className="text-sm font-bold text-white">Dinheiro</span>
                                    </div>
                                </label>
                            </div>
                        </div>
                    </form>

                    {/* RIGHT COLUMN: SUMMARY */}
                    <div className="relative">
                        <div className="bg-[#111] p-8 rounded-3xl border border-white/5 sticky top-28">
                            <h2 className="text-xl font-bold text-white mb-6">Resumo do Pedido</h2>

                            <div className="space-y-6 mb-8 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {items.map((item) => (
                                    <div key={item.id} className="flex gap-4">
                                        <div className="relative w-16 h-16 bg-gray-900 rounded-lg overflow-hidden shrink-0">
                                            {item.image && (
                                                <Image src={item.image} alt={item.name} fill className="object-cover" />
                                            )}
                                        </div>
                                        <div className="flex-1">
                                            <div className="flex justify-between items-start mb-1">
                                                <h3 className="text-white font-medium text-sm line-clamp-2">{item.name}</h3>
                                                <p className="text-white font-bold text-sm">
                                                    {(item.price * item.quantity / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}
                                                </p>
                                            </div>
                                            <div className="flex justify-between items-center">
                                                <p className="text-gray-500 text-xs">Qtd: {item.quantity}</p>
                                                <button onClick={() => removeItem(item.id)} className="text-gray-600 hover:text-red-500 transition-colors">
                                                    <Trash2 className="w-4 h-4" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 pt-6 border-t border-white/10 text-sm">
                                <div className="flex justify-between text-gray-400">
                                    <span>Subtotal</span>
                                    <span>{(totalPrice() / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                                <div className="flex justify-between text-gray-400">
                                    <span>Taxa de Entrega</span>
                                    <span>R$ 15,00</span>
                                </div>
                                <div className="flex justify-between text-[#ff2ca2] font-medium">
                                    <span>Ganho em Satimoney</span>
                                    <span>+ 145 STM</span>
                                </div>
                                <div className="flex justify-between text-white font-bold text-xl pt-4 border-t border-white/10">
                                    <span>Total</span>
                                    <span>{((totalPrice() + 1500) / 100).toLocaleString("pt-BR", { style: 'currency', currency: 'BRL' })}</span>
                                </div>
                            </div>

                            <button
                                form="checkout-form"
                                disabled={isProcessing}
                                className="w-full mt-8 bg-[#ff2ca2] text-white font-bold py-4 rounded-xl uppercase tracking-widest hover:bg-[#d9007e] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                            >
                                {isProcessing ? (
                                    <span className="animate-pulse">Processando...</span>
                                ) : (
                                    <>Confirmar Pedido <ChevronRight className="w-5 h-5" /></>
                                )}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}
