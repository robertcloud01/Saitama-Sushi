"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { CreditCard, Plus, Trash2, Loader2, Save } from "lucide-react";

type Card = {
    id: string;
    holderName: string;
    last4: string;
    brand: string;
    expiry: string;
};

export default function CardsPage() {
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState({
        holderName: "",
        number: "", // We only store last 4
        expiry: "",
        brand: "Mastercard" // Default or detected
    });

    useEffect(() => {
        fetchCards();
    }, []);

    const fetchCards = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('Card')
                .select('*')
                .eq('userId', session.user.id)
                .order('createdAt', { ascending: true });

            if (error) throw error;
            setCards(data || []);
        } catch (error) {
            console.error("Error fetching cards:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const last4 = formData.number.slice(-4);
            // Simple logic to guess brand or just let user pick
            // For now, hardcoded logic or just manual input

            const { error } = await supabase
                .from('Card')
                .insert([{
                    userId: session.user.id,
                    holderName: formData.holderName,
                    last4: last4.length === 4 ? last4 : "0000",
                    brand: formData.brand,
                    expiry: formData.expiry
                }]);

            if (error) throw error;

            setIsAdding(false);
            setFormData({ holderName: "", number: "", expiry: "", brand: "Mastercard" });
            fetchCards();
        } catch (error) {
            console.error("Error saving card:", error);
            alert("Erro ao salvar cartão.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja remover este cartão?")) return;
        try {
            const { error } = await supabase
                .from('Card')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchCards();
        } catch (error) {
            console.error("Error deleting card:", error);
        }
    };

    if (loading) return <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#ff2ca2]" /></div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Meus Cartões</h2>

            {isAdding && (
                <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold text-white mb-4">Novo Cartão</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Nome no Cartão"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.holderName}
                                onChange={e => setFormData({ ...formData, holderName: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Número do Cartão"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.number}
                                onChange={e => setFormData({ ...formData, number: e.target.value })}
                                maxLength={16}
                                required
                            />
                            <input
                                placeholder="Validade (MM/AA)"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.expiry}
                                onChange={e => setFormData({ ...formData, expiry: e.target.value })}
                                required
                            />
                            <select
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.brand}
                                onChange={e => setFormData({ ...formData, brand: e.target.value })}
                            >
                                <option value="Mastercard">Mastercard</option>
                                <option value="Visa">Visa</option>
                                <option value="Elo">Elo</option>
                                <option value="Amex">Amex</option>
                            </select>
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={() => setIsAdding(false)} className="px-4 py-2 text-gray-400 hover:text-white font-bold text-sm">Cancelar</button>
                            <button type="submit" className="bg-[#ff2ca2] hover:bg-[#d9007e] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                                <Save className="w-4 h-4" /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {cards.map((card) => (
                    <div key={card.id} className="bg-gradient-to-br from-[#1a1a1a] to-[#000] border border-white/10 rounded-xl p-6 relative group overflow-hidden">
                        <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                            <button onClick={() => handleDelete(card.id)} className="text-red-500 hover:bg-red-500/10 p-2 rounded-lg">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>

                        <div className="mb-8">
                            <CreditCard className="w-8 h-8 text-[#ff2ca2]" />
                        </div>

                        <div className="space-y-1">
                            <p className="text-gray-400 text-sm font-bold uppercase tracking-wider">{card.brand}</p>
                            <p className="text-white text-xl font-mono tracking-widest">•••• •••• •••• {card.last4}</p>
                        </div>

                        <div className="flex justify-between items-end mt-6">
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold">Titular</p>
                                <p className="text-white font-medium">{card.holderName}</p>
                            </div>
                            <div>
                                <p className="text-[10px] text-gray-500 uppercase font-bold text-right">Validade</p>
                                <p className="text-white font-medium">{card.expiry}</p>
                            </div>
                        </div>
                    </div>
                ))}

                {!isAdding && (
                    <button onClick={() => setIsAdding(true)} className="min-h-[220px] border-2 border-dashed border-white/10 rounded-xl text-gray-500 font-bold uppercase tracking-widest hover:border-[#ff2ca2] hover:text-[#ff2ca2] hover:bg-[#ff2ca2]/5 transition-all flex flex-col items-center justify-center gap-4">
                        <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center">
                            <Plus className="w-6 h-6" />
                        </div>
                        Adicionar novo cartão
                    </button>
                )}
            </div>
        </div>
    );
}
