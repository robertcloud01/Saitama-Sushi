"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { MapPin, Plus, Trash2, Edit2, Loader2, Save } from "lucide-react";

type Address = {
    id: string;
    street: string;
    number: string;
    neighborhood: string;
    city: string;
    zip: string;
    complement?: string;
    isDefault: boolean;
};

export default function AddressesPage() {
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [loading, setLoading] = useState(true);
    const [editingId, setEditingId] = useState<string | null>(null);
    const [isAdding, setIsAdding] = useState(false);

    // Form State
    const [formData, setFormData] = useState<Partial<Address>>({});

    useEffect(() => {
        fetchAddresses();
    }, []);

    const fetchAddresses = async () => {
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('Address')
                .select('*')
                .eq('userId', session.user.id)
                .order('createdAt', { ascending: true });

            if (error) throw error;
            setAddresses(data || []);
        } catch (error) {
            console.error("Error fetching addresses:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const addressData = {
                ...formData,
                userId: session.user.id,
                updatedAt: new Date().toISOString() // Assuming you might add this column later or ignore
            };

            let error;
            if (editingId) {
                const { error: updateError } = await supabase
                    .from('Address')
                    .update(addressData)
                    .eq('id', editingId);
                error = updateError;
            } else {
                const { error: insertError } = await supabase
                    .from('Address')
                    .insert([addressData]);
                error = insertError;
            }

            if (error) throw error;

            setEditingId(null);
            setIsAdding(false);
            setFormData({});
            fetchAddresses();
        } catch (error) {
            console.error("Error saving address:", error);
            alert("Erro ao salvar endereço.");
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Tem certeza que deseja excluir este endereço?")) return;
        try {
            const { error } = await supabase
                .from('Address')
                .delete()
                .eq('id', id);

            if (error) throw error;
            fetchAddresses();
        } catch (error) {
            console.error("Error deleting address:", error);
        }
    };

    const startEdit = (addr: Address) => {
        setEditingId(addr.id);
        setIsAdding(false);
        setFormData(addr);
    };

    const startAdd = () => {
        setEditingId(null);
        setIsAdding(true);
        setFormData({});
    };

    const cancelForm = () => {
        setEditingId(null);
        setIsAdding(false);
        setFormData({});
    };

    if (loading) return <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#ff2ca2]" /></div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Endereços</h2>

            {(isAdding || editingId) && (
                <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8 animate-in fade-in slide-in-from-top-4">
                    <h3 className="text-lg font-bold text-white mb-4">{editingId ? "Editar Endereço" : "Novo Endereço"}</h3>
                    <form onSubmit={handleSave} className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <input
                                placeholder="Rua / Avenida"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.street || ""}
                                onChange={e => setFormData({ ...formData, street: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Número"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.number || ""}
                                onChange={e => setFormData({ ...formData, number: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Bairro"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.neighborhood || ""}
                                onChange={e => setFormData({ ...formData, neighborhood: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Cidade"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.city || ""}
                                onChange={e => setFormData({ ...formData, city: e.target.value })}
                                required
                            />
                            <input
                                placeholder="CEP"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.zip || ""}
                                onChange={e => setFormData({ ...formData, zip: e.target.value })}
                                required
                            />
                            <input
                                placeholder="Complemento (Opcional)"
                                className="bg-black/50 border border-white/10 rounded-lg p-3 text-white w-full focus:border-[#ff2ca2] outline-none"
                                value={formData.complement || ""}
                                onChange={e => setFormData({ ...formData, complement: e.target.value })}
                            />
                        </div>
                        <div className="flex justify-end gap-3 pt-4">
                            <button type="button" onClick={cancelForm} className="px-4 py-2 text-gray-400 hover:text-white font-bold text-sm">Cancelar</button>
                            <button type="submit" className="bg-[#ff2ca2] hover:bg-[#d9007e] text-white px-6 py-2 rounded-lg font-bold flex items-center gap-2">
                                <Save className="w-4 h-4" /> Salvar
                            </button>
                        </div>
                    </form>
                </div>
            )}

            <div className="space-y-4">
                {addresses.map((addr) => (
                    <div key={addr.id} className="bg-[#111] border border-white/5 rounded-xl p-6 flex flex-col md:flex-row md:items-center justify-between group hover:border-[#ff2ca2]/30 transition-colors gap-4">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center text-gray-400 group-hover:text-[#ff2ca2] transition-colors shrink-0">
                                <MapPin className="w-5 h-5" />
                            </div>
                            <div>
                                <h3 className="font-bold text-white text-lg">{addr.street}, {addr.number}</h3>
                                <p className="text-gray-400">{addr.neighborhood}, {addr.city}</p>
                                <p className="text-gray-500 text-sm">CEP: {addr.zip} {addr.complement && `- ${addr.complement}`}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-3 self-end md:self-auto">
                            <button onClick={() => startEdit(addr)} className="p-2 text-gray-400 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                                <Edit2 className="w-4 h-4" />
                            </button>
                            <button onClick={() => handleDelete(addr.id)} className="p-2 text-red-500/50 hover:text-red-500 hover:bg-red-500/10 rounded-lg transition-colors">
                                <Trash2 className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                ))}

                {!isAdding && !editingId && (
                    <button onClick={startAdd} className="w-full py-4 border-2 border-dashed border-white/10 rounded-xl text-gray-500 font-bold uppercase tracking-widest hover:border-[#ff2ca2] hover:text-[#ff2ca2] hover:bg-[#ff2ca2]/5 transition-all flex items-center justify-center gap-2">
                        <Plus className="w-5 h-5" /> Adicionar novo endereço
                    </button>
                )}
            </div>
        </div>
    );
}
