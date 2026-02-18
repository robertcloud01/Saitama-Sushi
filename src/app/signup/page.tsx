
"use client";

import Link from "next/link";
import { ArrowLeft, User, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function SignupPage() {
    const router = useRouter();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMsg, setSuccessMsg] = useState<string | null>(null);

    const handleSignup = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccessMsg(null);

        try {
            const data = await AuthService.signUp(
                { email, password },
                { name }
            );

            if (data.session) {
                router.push("/");
            } else {
                setSuccessMsg("Conta criada com sucesso! Por favor, verifique seu e-mail para confirmar a conta antes de entrar.");
            }
        } catch (err: unknown) {
            console.error("Signup error:", err);
            const error = err as Error;
            let msg = error.message || "Ocorreu um erro ao criar a conta.";

            if (msg.includes("rate limit")) {
                msg = "Muitas tentativas recentes. Por favor, aguarde alguns minutos ou contate o suporte.";
            } else if (msg.includes("already registered")) {
                msg = "Este e-mail já está cadastrado.";
            }

            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <Image
                    src="/images/login-bg.jpg" // Reusing login bg
                    alt="Background"
                    fill
                    className="object-cover opacity-20"
                    priority
                />
                <div className="absolute inset-0 bg-gradient-to-br from-black via-black/90 to-[#ff2ca2]/10" />
            </div>

            <div className="relative z-10 w-full max-w-md p-6">
                <Link
                    href="/"
                    className="inline-flex items-center gap-2 text-gray-400 hover:text-white mb-8 transition-colors"
                >
                    <ArrowLeft className="w-5 h-5" /> Voltar para Início
                </Link>

                <div className="bg-[#111] border border-white/10 p-8 rounded-3xl shadow-2xl backdrop-blur-md">
                    <div className="text-center mb-8">
                        <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
                            Criar Conta
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Junte-se ao Saitama e ganhe Satimoney.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    {successMsg && (
                        <div className="bg-green-500/10 border border-green-500/50 text-green-500 p-3 rounded-xl mb-4 text-sm text-center">
                            {successMsg}
                        </div>
                    )}

                    <form onSubmit={handleSignup} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Nome</label>
                            <div className="relative group">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#ff2ca2] transition-colors" />
                                <input
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors placeholder:text-gray-700"
                                    placeholder="Seu Nome"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">E-mail</label>
                            <div className="relative group">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#ff2ca2] transition-colors" />
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors placeholder:text-gray-700"
                                    placeholder="nome@exemplo.com"
                                    required
                                />
                            </div>
                        </div>

                        <div className="space-y-2">
                            <label className="text-xs font-bold uppercase tracking-wider text-gray-500 ml-1">Senha</label>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#ff2ca2] transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors placeholder:text-gray-700"
                                    placeholder="••••••••"
                                    required
                                    minLength={6}
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading || !!successMsg}
                            className="w-full bg-[#ff2ca2] hover:bg-[#d9007e] text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,44,162,0.3)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Criando..." : "Cadastrar"}
                        </button>
                    </form>

                    <p className="text-center mt-8 text-gray-500 text-sm">
                        Já tem uma conta?{" "}
                        <Link href="/login" className="text-white font-bold hover:text-[#ff2ca2] transition-colors">
                            Entrar
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
