"use client";

import Link from "next/link";
import { Check, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";

export default function OrderConfirmationPage() {
    const [orderId] = useState(() => Math.floor(100000 + Math.random() * 900000).toString());

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4">
            <div className="max-w-md w-full text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15 }}
                    className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-[0_0_50px_rgba(34,197,94,0.4)]"
                >
                    <Check className="w-12 h-12 text-white" strokeWidth={4} />
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-3xl md:text-4xl font-black text-white uppercase tracking-widest mb-4"
                >
                    Pedido Confirmado!
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-gray-400 text-lg mb-8"
                >
                    Sua comida está sendo preparada com a velocidade de um soco.
                </motion.p>

                {orderId && (
                    <div className="bg-[#111] border border-white/10 rounded-xl p-6 mb-8">
                        <p className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-2">Número do Pedido</p>
                        <p className="text-3xl font-mono text-[#ff2ca2] tracking-wider">#{orderId}</p>
                    </div>
                )}

                <div className="space-y-4">
                    <Link
                        href="/profile/orders"
                        className="block w-full bg-[#111] hover:bg-[#222] text-white font-bold py-4 rounded-xl border border-white/10 transition-colors uppercase tracking-widest"
                    >
                        Acompanhar Pedido
                    </Link>

                    <Link
                        href="/"
                        className="block w-full bg-[#ff2ca2] hover:bg-[#d9007e] text-white font-bold py-4 rounded-xl transition-colors uppercase tracking-widest flex items-center justify-center gap-2"
                    >
                        Voltar ao Início <ArrowRight className="w-5 h-5" />
                    </Link>
                </div>
            </div>
        </div>
    );
}
