"use client";

import { motion } from "framer-motion";
import { Coins, Gift, TrendingUp, Zap, ChevronRight, Star, ShieldCheck } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function SatimoneyPage() {
    return (
        <div className="bg-black min-h-screen text-white overflow-hidden">
            {/* 
        HERO SECTION 
        Dark, mysterious, premium.
      */}
            <section className="relative h-[90vh] flex items-center justify-center overflow-hidden">
                {/* Background Effects */}
                <div className="absolute inset-0 z-0">
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#ff2ca2] opacity-20 blur-[120px] rounded-full animate-pulse" />
                    <Image
                        src="/images/hero-bg.jpg" // Fallback/Placeholder if specific image not available, but effect covers it
                        alt="Background"
                        fill
                        className="object-cover opacity-20 grayscale"
                        priority
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent" />
                </div>

                <div className="container relative z-10 px-4 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        className="mb-8 inline-block"
                    >
                        <div className="w-24 h-24 mx-auto bg-gradient-to-br from-[#ff2ca2] to-purple-600 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(255,44,162,0.5)] mb-6">
                            <Coins className="w-12 h-12 text-white" />
                        </div>
                        <h1 className="text-6xl md:text-8xl font-bold tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                            SATIMONEY
                        </h1>
                        <p className="text-[#ff2ca2] font-medium tracking-[0.2em] mt-2 uppercase">
                            A Moeda do Sabor
                        </p>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4, duration: 0.8 }}
                        className="text-xl md:text-2xl text-gray-300 max-w-2xl mx-auto leading-relaxed mb-12"
                    >
                        Ganhe recompensas exclusivas a cada pedido. Quanto mais você saboreia, mais benefícios conquista.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.8 }}
                    >
                        <Link
                            href="/menu"
                            className="inline-flex items-center gap-2 px-8 py-4 bg-white text-black font-bold uppercase tracking-widest rounded-full hover:bg-[#ff2ca2] hover:text-white transition-all duration-300 transform hover:scale-105"
                        >
                            Comece a Ganhar <ChevronRight className="w-5 h-5" />
                        </Link>
                    </motion.div>
                </div>
            </section>

            {/* 
        HOW IT WORKS 
        Clean, step-by-step conceptual flow.
      */}
            <section className="py-24 bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-20"
                    >
                        <h2 className="text-4xl md:text-5xl font-bold mb-6">Como Funciona</h2>
                        <div className="h-1 w-24 bg-[#ff2ca2] mx-auto rounded-full" />
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {[
                            {
                                icon: <Zap className="w-10 h-10" />,
                                title: "Peça",
                                desc: "Faça seu pedido dos pratos premium do nosso menu."
                            },
                            {
                                icon: <TrendingUp className="w-10 h-10" />,
                                title: "Acumule",
                                desc: "Ganhe 5% de volta em Satimoney em cada compra instantaneamente."
                            },
                            {
                                icon: <Gift className="w-10 h-10" />,
                                title: "Resgate",
                                desc: "Use seu Satimoney para pagar por pedidos futuros."
                            }
                        ].map((step, i) => (
                            <motion.div
                                key={i}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.2 }}
                                className="relative p-8 rounded-2xl bg-[#111] border border-white/5 hover:border-[#ff2ca2]/50 transition-colors group"
                            >
                                <div className="w-20 h-20 bg-black rounded-2xl flex items-center justify-center mb-6 border border-white/10 group-hover:border-[#ff2ca2] group-hover:shadow-[0_0_30px_rgba(255,44,162,0.3)] transition-all">
                                    <div className="text-[#ff2ca2]">
                                        {step.icon}
                                    </div>
                                </div>
                                <h3 className="text-2xl font-bold mb-4">{step.title}</h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {step.desc}
                                </p>
                                <div className="absolute top-8 right-8 text-6xl font-black text-white/5 select-none">
                                    {i + 1}
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* 
        BENEFITS / TIERS 
        Showcasing value.
      */}
            <section className="py-24 relative overflow-hidden">
                <div className="container mx-auto px-4 relative z-10">
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">

                        <motion.div
                            initial={{ opacity: 0, x: -50 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                        >
                            <h2 className="text-4xl md:text-5xl font-bold mb-8 leading-tight">
                                Desbloqueie <span className="text-[#ff2ca2]">Privilégios</span> <br />
                                Exclusivos
                            </h2>
                            <p className="text-xl text-gray-300 mb-8">
                                Satimoney não são apenas pontos. É a sua chave para uma experiência VIP.
                            </p>

                            <ul className="space-y-6">
                                {[
                                    "Entrega Prioritária",
                                    "Acesso ao Menu Secreto",
                                    "Surpresas de Aniversário",
                                    "Eventos com Pontos em Dobro"
                                ].map((item, i) => (
                                    <li key={i} className="flex items-center gap-4">
                                        <div className="w-8 h-8 rounded-full bg-[#ff2ca2]/20 flex items-center justify-center">
                                            <ShieldCheck className="w-4 h-4 text-[#ff2ca2]" />
                                        </div>
                                        <span className="text-lg font-medium">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            className="relative"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#ff2ca2] to-purple-600 blur-[80px] opacity-30 rounded-full" />
                            <div className="relative bg-gradient-to-b from-[#1a1a1a] to-black border border-white/10 p-8 rounded-3xl">
                                <div className="flex justify-between items-start mb-12">
                                    <div>
                                        <p className="text-sm text-gray-400 uppercase tracking-widest mb-2">Saldo Atual</p>
                                        <h3 className="text-5xl font-bold text-white">2,450.00</h3>
                                    </div>
                                    <Coins className="w-12 h-12 text-[#ff2ca2]" />
                                </div>

                                <div className="space-y-4">
                                    <div className="flex justify-between text-sm">
                                        <span className="text-gray-400">Progresso para VIP</span>
                                        <span className="text-[#ff2ca2] font-bold">85%</span>
                                    </div>
                                    <div className="h-2 w-full bg-white/10 rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: 0 }}
                                            whileInView={{ width: "85%" }}
                                            transition={{ duration: 1.5, delay: 0.5 }}
                                            className="h-full bg-[#ff2ca2]"
                                        />
                                    </div>
                                </div>

                                <div className="mt-12 pt-8 border-t border-white/10 flex justify-between items-center">
                                    <div>
                                        <p className="text-white font-bold">Roberto</p>
                                        <p className="text-sm text-gray-400">Membro Ouro</p>
                                    </div>
                                    <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
                                        <Star className="w-6 h-6 text-yellow-500 fill-yellow-500" />
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                    </div>
                </div>
            </section>

            {/* FAQ Section */}
            <section className="py-24 bg-[#111]">
                <div className="container mx-auto px-4 max-w-4xl">
                    <h2 className="text-3xl md:text-5xl font-bold mb-12 text-center">Perguntas Frequentes</h2>
                    <div className="space-y-6">
                        {[
                            {
                                q: "O que é Satimoney?",
                                a: "É o programa de fidelidade exclusivo do Saitama. Cada pedido que você faz gera cashback na forma de Satimoney, que pode ser usado para pagar parte ou o total de suas compras futuras."
                            },
                            {
                                q: "Como ganho pontos?",
                                a: "Automaticamente! Basta estar logado em sua conta ao realizar um pedido. Você ganha 5% do valor de cada pedido de volta em sua carteira Satimoney."
                            },
                            {
                                q: "Como subo de nível?",
                                a: "Seu nível é determinado pelo total de Satimoney acumulado nos últimos 12 meses. Quanto mais você pede, maior seu nível e mais exclusivos são os benefícios, como entrega grátis e acesso antecipado a novos pratos."
                            },
                            {
                                q: "Meus pontos expiram?",
                                a: "Seus pontos Satimoney têm validade de 12 meses a partir da data em que foram ganhos. Recomendamos usar seu saldo regularmente para aproveitar ao máximo."
                            }
                        ].map((item, i) => (
                            <div key={i} className="bg-black/50 border border-white/10 rounded-2xl p-8 hover:border-[#ff2ca2]/30 transition-colors">
                                <h3 className="text-xl font-bold mb-4 text-white flex items-center gap-3">
                                    <span className="text-[#ff2ca2]">0{i + 1}.</span> {item.q}
                                </h3>
                                <p className="text-gray-400 leading-relaxed">
                                    {item.a}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="py-24 text-center bg-[#0a0a0a]">
                <div className="container mx-auto px-4">
                    <h2 className="text-4xl md:text-6xl font-bold mb-8">Pronto para começar a ganhar?</h2>
                    <Link
                        href="/menu"
                        className="inline-block px-12 py-5 bg-[#ff2ca2] text-white font-bold text-xl rounded-full hover:bg-[#d9007e] transition-all transform hover:scale-105 shadow-[0_0_30px_rgba(255,44,162,0.4)]"
                    >
                        Peça Agora
                    </Link>
                </div>
            </section>
        </div>
    );
}
