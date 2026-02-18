"use client";

import Link from "next/link";
import { ArrowLeft, Lock, Mail } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { AuthService } from "@/services/auth.service";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await AuthService.signIn({
                email,
                password,
            });

            router.push("/");
        } catch (err: unknown) {
            console.error("Login error:", err);
            const error = err as Error;
            let msg = "E-mail ou senha incorretos.";
            if (error.message.includes("Invalid login credentials")) {
                msg = "Credenciais inválidas. Verifique seu e-mail e senha.";
            } else if (error.message.includes("Email not confirmed")) {
                msg = "E-mail não confirmado. Por favor, verifique sua caixa de entrada.";
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
                    src="/images/login-bg.jpg" // Fallback needed or ensure this exists, using a placeholder logic for now
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
                    <div className="text-center mb-10">
                        <h1 className="text-3xl font-black uppercase tracking-widest text-white mb-2">
                            Bem-vindo de Volta
                        </h1>
                        <p className="text-gray-400 text-sm">
                            Insira suas credenciais para acessar sua conta.
                        </p>
                    </div>

                    {error && (
                        <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-xl mb-4 text-sm text-center">
                            {error}
                        </div>
                    )}

                    <form onSubmit={handleLogin} className="space-y-6">
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
                            <div className="flex justify-between items-center ml-1">
                                <label className="text-xs font-bold uppercase tracking-wider text-gray-500">Senha</label>
                                <Link href="/forgot-password" className="text-xs text-[#ff2ca2] hover:underline">
                                    Esqueceu a senha?
                                </Link>
                            </div>
                            <div className="relative group">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500 group-focus-within:text-[#ff2ca2] transition-colors" />
                                <input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="w-full bg-black/50 border border-white/10 rounded-xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-[#ff2ca2] transition-colors placeholder:text-gray-700"
                                    placeholder="••••••••"
                                    required
                                />
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-[#ff2ca2] hover:bg-[#d9007e] text-white font-bold py-4 rounded-xl uppercase tracking-widest transition-all transform hover:scale-[1.02] shadow-[0_0_20px_rgba(255,44,162,0.3)] mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {loading ? "Entrando..." : "Entrar"}
                        </button>
                    </form>

                    <div className="mt-8 pt-8 border-t border-white/5">
                        <p className="text-center text-gray-500 text-sm mb-6">Ou continue com</p>
                        <div className="grid grid-cols-2 gap-4">
                            <button type="button" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors border border-white/5">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4" /><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853" /><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.26.81-.58z" fill="#FBBC05" /><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335" /></svg>
                                Google
                            </button>
                            <button type="button" className="flex items-center justify-center gap-2 bg-white/5 hover:bg-white/10 text-white py-3 rounded-lg transition-colors border border-white/5">
                                <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor"><path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.78 1.18-.19 2.31-.89 3.51-.84 1.54.06 2.74.74 3.69 1.74-3.21 2.05-2.65 6.2 1.72 8.07zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z" /></svg>
                                Apple
                            </button>
                        </div>
                    </div>

                    <p className="text-center mt-8 text-gray-500 text-sm">
                        Não tem uma conta?{" "}
                        <Link href="/signup" className="text-white font-bold hover:text-[#ff2ca2] transition-colors">
                            Cadastre-se
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
