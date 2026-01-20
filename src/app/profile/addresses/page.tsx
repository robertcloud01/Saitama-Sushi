"use client";

import { MapPin, Plus, Home, Briefcase } from "lucide-react";

export default function AddressesPage() {
    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Endereços</h2>

            <div className="space-y-4">
                {/* Saved Address 1 */}
                <div className="bg-[#111] border border-white/5 rounded-xl p-6 flex items-center justify-between group hover:border-[#ff2ca2]/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#ff2ca2] transition-colors">
                            <Home className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Casa</h3>
                            <p className="text-gray-400">Av. Ville Roy, 1234 - Caçari</p>
                            <p className="text-gray-500 text-sm">Boa Vista, RR - CEP 69307-725</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-gray-500 hover:text-white underline">Editar</button>
                </div>

                {/* Saved Address 2 */}
                <div className="bg-[#111] border border-white/5 rounded-xl p-6 flex items-center justify-between group hover:border-[#ff2ca2]/30 transition-colors">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#ff2ca2] transition-colors">
                            <Briefcase className="w-5 h-5" />
                        </div>
                        <div>
                            <h3 className="font-bold text-white text-lg">Trabalho</h3>
                            <p className="text-gray-400">Av. Major Williams, 500 - São Pedro</p>
                            <p className="text-gray-500 text-sm">Boa Vista, RR - CEP 69306-710</p>
                        </div>
                    </div>
                    <button className="text-sm font-bold text-gray-500 hover:text-white underline">Editar</button>
                </div>

                {/* Add New */}
                <button className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-500 font-bold uppercase tracking-widest hover:border-[#ff2ca2] hover:text-[#ff2ca2] hover:bg-[#ff2ca2]/5 transition-all flex items-center justify-center gap-2">
                    <Plus className="w-5 h-5" /> Adicionar novo endereço
                </button>
            </div>
        </div>
    );
}
