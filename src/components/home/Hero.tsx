"use client";

import { motion, AnimatePresence } from "framer-motion";
import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

export function Hero() {
    return (
        <section className="relative w-full h-[450px] md:h-[550px] flex items-center bg-black text-white overflow-hidden">
            {/* Background Slideshow */}
            <div className="absolute inset-0 z-0">
                <HeroImageSlideshow />
                {/* Gradient Overlay for better text separation */}
                <div className="absolute inset-0 bg-gradient-to-r from-black via-black/40 to-transparent" />
            </div>

            {/* Content Container */}
            <div className="container mx-auto px-4 md:px-12 relative z-10">
                <motion.div
                    initial={{ opacity: 0, x: -30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.8 }}
                    className="max-w-2xl"
                >
                    <h1 className="text-3xl md:text-5xl lg:text-6xl font-medium tracking-tight mb-8 leading-[1.1] uppercase">
                        O MELHOR SERVIÇO DE ENTREGA <br className="hidden md:block" />
                        DE <span className="text-white">SUSHI</span> DA CIDADE.
                    </h1>

                    <Link
                        href="/menu"
                        className="inline-block px-10 py-3 bg-white text-accent rounded-full font-bold text-base hover:bg-accent hover:text-white transition-all transform hover:scale-105 shadow-xl"
                    >
                        Faça seu pedido agora
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}

function HeroImageSlideshow() {
    const images = [
        "/images/hero1.jpeg",
        "/images/hero2.jpeg"
    ];
    const [index, setIndex] = React.useState(0);

    const nextSlide = () => setIndex((prev) => (prev + 1) % images.length);
    const prevSlide = () => setIndex((prev) => (prev - 1 + images.length) % images.length);

    React.useEffect(() => {
        const timer = setInterval(() => {
            setIndex((prev) => (prev + 1) % images.length);
        }, 6000);
        return () => clearInterval(timer);
    }, [images.length]);

    return (
        <div className="relative w-full h-full group">
            <AnimatePresence mode="wait">
                <motion.div
                    key={index}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 1.2 }}
                    className="absolute inset-0"
                >
                    <Image
                        src={images[index]}
                        alt="Hero Background"
                        fill
                        className="object-cover object-right md:object-center"
                        priority
                    />
                </motion.div>
            </AnimatePresence>

            {/* Navigation Arrows - Yerevan Style (Bottom Right) */}
            <div className="absolute bottom-10 right-10 md:right-20 flex items-center gap-4 z-20">
                <button
                    onClick={prevSlide}
                    className="p-2 text-white/50 hover:text-white transition-colors flex items-center justify-center transform hover:scale-125"
                    aria-label="Previous slide"
                >
                    <ChevronLeft className="w-8 h-8 md:w-10 md:h-10" />
                </button>
                <button
                    onClick={nextSlide}
                    className="p-2 text-white/50 hover:text-white transition-colors flex items-center justify-center transform hover:scale-125"
                    aria-label="Next slide"
                >
                    <ChevronRight className="w-8 h-8 md:w-10 md:h-10" />
                </button>
            </div>

            {/* Simple Line Indicator (optional, Yerevan uses dots or nothing) */}
            <div className="absolute bottom-10 left-10 md:left-12 flex gap-1 z-20">
                {images.map((_, i) => (
                    <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${i === index ? 'bg-accent w-8' : 'bg-white/20 w-4'}`}
                    />
                ))}
            </div>
        </div>
    );
}
