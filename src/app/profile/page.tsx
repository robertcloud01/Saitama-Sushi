"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

import { ProfileService } from "@/services/profile.service";
import { Loader2, Save, Lock } from "lucide-react";

export default function ProfilePage() {
    // const [user, setUser] = useState<SupabaseUser | null>(null); // Unused

    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    // Profile State
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [email, setEmail] = useState("");

    // Password State
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    const [message, setMessage] = useState<{ text: string, type: 'success' | 'error' } | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const profile = await ProfileService.getProfile();
                if (profile) {
                    // setUser(session.user); // We might need to handle user state differently if we want to keep it
                    setName(profile.full_name || ""); // mapped from database column
                    setPhone(profile.phone || "");
                    setEmail(profile.email || "");
                }
            } catch (error) {
                console.error("Error fetching profile:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleUpdateProfile = async (e: React.FormEvent) => {
        e.preventDefault();
        setUpdating(true);
        setMessage(null);

        try {
            await ProfileService.updateProfile({
                full_name: name,
                phone,
            });

            setMessage({ text: "Perfil atualizado com sucesso!", type: 'success' });
        } catch (error: unknown) {
            console.error("Error updating profile:", error);
            setMessage({ text: "Erro ao atualizar perfil.", type: 'error' });
        } finally {
            setUpdating(false);
        }
    };

    const handleUpdatePassword = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage(null);

        if (newPassword !== confirmPassword) {
            setMessage({ text: "As senhas não coincidem.", type: 'error' });
            return;
        }

        if (newPassword.length < 6) {
            setMessage({ text: "A senha deve ter pelo menos 6 caracteres.", type: 'error' });
            return;
        }

        setUpdating(true);

        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword
            });

            if (error) throw error;

            setMessage({ text: "Senha alterada com sucesso!", type: 'success' });
            setNewPassword("");
            setConfirmPassword("");
        } catch (error: unknown) {
            console.error("Error updating password:", error);
            setMessage({ text: "Erro ao alterar senha.", type: 'error' });
        } finally {
            setUpdating(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-[#ff2ca2]" />
            </div>
        );
    }

    return (
        <div className="space-y-12 max-w-2xl">
            {message && (
                <div className={`p-4 rounded-xl text-center font-bold ${message.type === 'success' ? 'bg-green-500/10 text-green-500' : 'bg-red-500/10 text-red-500'}`}>
                    {message.text}
                </div>
            )}

            {/* SECTION: Account Info */}
            <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Informações da conta</h2>
                    <p className="text-gray-400 text-sm">Atualize seus dados pessoais.</p>
                </div>

                <form onSubmit={handleUpdateProfile} className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Nome Completo</label>
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors"
                            />
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Telefone</label>
                            <input
                                type="tel"
                                value={phone}
                                onChange={(e) => setPhone(e.target.value)}
                                placeholder="(00) 00000-0000"
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 px-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">E-mail</label>
                            <input
                                type="email"
                                value={email}
                                disabled
                                className="w-full bg-white/5 border border-white/5 rounded-lg py-3 px-4 text-gray-400 cursor-not-allowed"
                            />
                            <p className="text-xs text-gray-600 mt-1">O e-mail não pode ser alterado diretamente.</p>
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={updating}
                            className="flex items-center gap-2 bg-[#ff2ca2] hover:bg-[#d9007e] text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Salvar Alterações
                        </button>
                    </div>
                </form>
            </section>

            {/* SECTION: Password */}
            <section>
                <div className="mb-6">
                    <h2 className="text-2xl font-bold text-white">Segurança</h2>
                    <p className="text-gray-400 text-sm">Altere sua senha de acesso.</p>
                </div>

                <form onSubmit={handleUpdatePassword} className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Nova Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors"
                                placeholder="Min. 6 caracteres"
                            />
                        </div>
                    </div>
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Confirmar Senha</label>
                        <div className="relative">
                            <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                            <input
                                type="password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors"
                                placeholder="Repita a senha"
                            />
                        </div>
                    </div>

                    <div className="flex justify-end pt-4">
                        <button
                            type="submit"
                            disabled={updating || !newPassword}
                            className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white font-bold py-3 px-6 rounded-lg transition-colors disabled:opacity-50"
                        >
                            {updating ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                            Atualizar Senha
                        </button>
                    </div>
                </form>
            </section>
        </div>
    );
}
