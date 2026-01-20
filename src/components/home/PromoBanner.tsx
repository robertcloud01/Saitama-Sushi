"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

export function PromoBanner() {
    return (
        <section className="bg-[#0E0E0E] py-24 px-4">
            <div className="container mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 40 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, ease: "easeOut" }}
                    viewport={{ once: true, margin: "-100px" }}
                    className="relative w-full rounded-[32px] overflow-hidden min-h-[400px] md:min-h-[500px]"
                >
                    {/* Background Image - Absolute */}
                    <Image
                        src="/images/promo-banner-bg.png"
                        alt="Promo Background"
                        fill
                        className="object-cover object-left md:object-center"
                        priority
                    />

                    {/* Dark Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent md:from-transparent md:via-black/60 md:to-black/80" />

                    {/* Content Container */}
                    <div className="relative z-10 h-full flex flex-col md:flex-row items-center justify-end h-full min-h-[400px] md:min-h-[500px] p-8 md:p-16">

                        {/* Right Content Block (45%) */}
                        <div className="w-full md:w-[50%] flex flex-col items-center md:items-start text-center md:text-left text-white">
                            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold uppercase leading-tight mb-8 tracking-wide">
                                FAÇA COMPRAS, AUMENTE SEU STATUS E GANHE <span className="text-[#ff2ca2]">SATIMONEY</span>
                            </h2>

                            <p className="text-lg text-gray-200 mb-10 max-w-md font-light">
                                Acumule pontos em cada pedido e troque por pratos exclusivos e experiências únicas.
                            </p>

                            <Link
                                href="/satimoney"
                                className="inline-flex items-center justify-center px-10 py-4 bg-[#ff2ca2] text-white rounded-full font-bold text-lg hover:bg-[#d9007e] transition-all transform hover:-translate-y-1 hover:shadow-lg hover:shadow-[#ff2ca2]/30 focus:outline-none focus:ring-4 focus:ring-[#ff2ca2]/30"
                            >
                                Informações adicionais
                            </Link>

                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
