"use client";

import { ShoppingBag, Clock } from "lucide-react";
import Image from "next/image";

export default function OrdersPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Histórico de pedidos</h2>

            <div className="space-y-6">
                {/* Mock Order 1 */}
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:border-[#ff2ca2]/30 transition-colors cursor-pointer">
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                            🍣
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white">Pedido #8492</h3>
                                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Entregue
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm">3 itens • R$ 145,90</p>
                            <p className="text-gray-500 text-xs mt-1">Hoje, 19:30</p>
                        </div>
                    </div>

                    <button className="w-full md:w-auto px-6 py-2 border border-[#ff2ca2] text-[#ff2ca2] font-bold rounded-lg hover:bg-[#ff2ca2] hover:text-white transition-all text-sm uppercase tracking-wide">
                        Pedir novamente
                    </button>
                </div>

                {/* Mock Order 2 */}
                <div className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:border-[#ff2ca2]/30 transition-colors cursor-pointer opacity-70">
                    <div className="flex gap-4 items-center">
                        <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                            🍜
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-bold text-white">Pedido #8102</h3>
                                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                    Entregue
                                </span>
                            </div>
                            <p className="text-gray-400 text-sm">2 itens • R$ 89,00</p>
                            <p className="text-gray-500 text-xs mt-1">Ontem, 20:15</p>
                        </div>
                    </div>

                    <button className="w-full md:w-auto px-6 py-2 border border-white/20 text-white font-bold rounded-lg hover:bg-white/10 transition-all text-sm uppercase tracking-wide">
                        Pedir novamente
                    </button>
                </div>
            </div>
        </div>
    );
}
