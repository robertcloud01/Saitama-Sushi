"use client";

import { Coins, TrendingUp, TrendingDown } from "lucide-react";

export default function SatimoneyProfilePage() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Satimoney</h2>

            {/* Balance Card */}
            <div className="bg-gradient-to-r from-[#ff2ca2] to-purple-600 rounded-2xl p-8 mb-10 shadow-[0_10px_40px_-10px_rgba(255,44,162,0.5)]">
                <div className="flex justify-between items-start mb-6">
                    <div>
                        <p className="text-white/80 font-bold uppercase tracking-widest text-sm mb-1">Saldo Atual</p>
                        <h3 className="text-5xl font-black text-white flex items-center gap-2">
                            2,450
                            <span className="text-2xl opacity-80 font-medium">STM</span>
                        </h3>
                    </div>
                    <div className="bg-white/20 p-3 rounded-full backdrop-blur-sm">
                        <Coins className="w-8 h-8 text-white" />
                    </div>
                </div>

                <div className="bg-black/20 rounded-xl p-4 backdrop-blur-md">
                    <div className="flex justify-between text-sm text-white mb-2 font-medium">
                        <span>Próximo nível: Platinum</span>
                        <span>550 STM restantes</span>
                    </div>
                    <div className="h-2 w-full bg-black/20 rounded-full overflow-hidden">
                        <div className="h-full bg-white w-[85%]" />
                    </div>
                </div>
            </div>

            {/* History */}
            <h3 className="text-xl font-bold text-white mb-6">Histórico de transações</h3>
            <div className="space-y-4">
                {[
                    { type: 'earn', desc: 'Cashback - Pedido #8492', date: 'Hoje, 19:30', amount: '+ 145', icon: TrendingUp },
                    { type: 'redeem', desc: 'Resgate - Cupom R$ 20', date: 'Ontem, 14:20', amount: '- 500', icon: TrendingDown },
                    { type: 'earn', desc: 'Cashback - Pedido #8102', date: 'Ontem, 20:15', amount: '+ 89', icon: TrendingUp },
                ].map((item, i) => (
                    <div key={i} className="bg-[#111] border border-white/5 rounded-xl p-4 flex items-center justify-between">
                        <div className="flex items-center gap-4">
                            <div className={`w-10 h-10 rounded-full flex items-center justify-center ${item.type === 'earn' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                                <item.icon className="w-5 h-5" />
                            </div>
                            <div>
                                <p className="font-bold text-white">{item.desc}</p>
                                <p className="text-xs text-gray-500">{item.date}</p>
                            </div>
                        </div>
                        <span className={`font-mono font-bold ${item.type === 'earn' ? 'text-green-500' : 'text-white'}`}>
                            {item.amount}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
}
