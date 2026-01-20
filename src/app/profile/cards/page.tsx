"use client";

import { CreditCard, Plus, Trash2 } from "lucide-react";

export default function CardsPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Meus cartões</h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Add New Card */}
                <button className="h-48 rounded-2xl border-2 border-dashed border-white/10 flex flex-col items-center justify-center gap-4 text-gray-500 hover:text-[#ff2ca2] hover:border-[#ff2ca2] hover:bg-[#ff2ca2]/5 transition-all group">
                    <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-[#ff2ca2]/20 transition-colors">
                        <Plus className="w-6 h-6" />
                    </div>
                    <span className="font-bold uppercase tracking-widest text-sm">Adicionar Cartão</span>
                </button>

                {/* Saved Card */}
                <div className="h-48 rounded-2xl bg-gradient-to-br from-[#1a1a1a] to-black border border-white/5 p-6 flex flex-col justify-between relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="text-red-500 hover:bg-red-500/10 p-2 rounded-full">
                            <Trash2 className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="flex justify-between items-start">
                        <CreditCard className="w-8 h-8 text-white" />
                        <span className="text-gray-500 font-mono">Mastercard</span>
                    </div>

                    <div>
                        <p className="text-gray-400 text-sm mb-1">Número do cartão</p>
                        <p className="text-white text-xl font-mono tracking-widest">•••• •••• •••• 8842</p>
                    </div>

                    <div className="flex justify-between items-end">
                        <div>
                            <p className="text-gray-400 text-xs text-transform uppercase">Titular</p>
                            <p className="text-white text-sm font-medium">ROBERTO S.</p>
                        </div>
                        <div>
                            <p className="text-gray-400 text-xs text-transform uppercase">Validade</p>
                            <p className="text-white text-sm font-medium">09/28</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
