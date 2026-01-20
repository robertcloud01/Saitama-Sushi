"use client";

import Link from "next/link";
import { ShoppingBag, User, Phone, Menu, X } from "lucide-react";
import { useState, useEffect } from "react";
import clsx from "clsx";
import { useCartStore } from "@/lib/store";
import { motion, AnimatePresence } from "framer-motion";

export function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const cartTotalItems = useCartStore((state) => state.totalItems());
    const toggleCart = useCartStore((state) => state.toggleCart);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <>
            {/* Top Announcement Bar */}
            <div className="bg-accent text-white text-[10px] md:text-xs font-bold py-2 text-center flex justify-center items-center gap-4 z-50 relative">
                <span className="hidden md:inline">Faça seu pedido para entrega ou retire no local entre 10h e 2h da manhã.</span>
                <span className="flex items-center gap-1"><Phone className="w-3 h-3" /> +55 95 99123-4567</span>
            </div>

            <header
                className={clsx(
                    "sticky top-0 left-0 right-0 z-40 transition-all duration-300 border-b border-transparent",
                    isScrolled
                        ? "bg-black/80 backdrop-blur-md py-3 border-white/10"
                        : "bg-transparent py-6"
                )}
            >
                <div className="container mx-auto px-4 md:px-8 flex items-center justify-between">
                    {/* Logo */}
                    <Link href="/" className="flex items-center gap-2 group">
                        <div className="text-2xl md:text-3xl font-black tracking-widest uppercase text-white flex items-center">
                            SAITAMA
                            <span className="w-2 h-2 md:w-3 md:h-3 bg-accent rounded-full ml-1 animate-pulse"></span>
                        </div>
                    </Link>

                    {/* Right Actions */}
                    <div className="flex items-center gap-4 md:gap-6">
                        <Link href="/menu" className="hidden md:flex items-center gap-2 text-white text-sm font-bold uppercase hover:text-accent transition-colors">
                            <span className="text-xl">🥡</span>
                            Compre online
                        </Link>

                        <div className="h-6 w-px bg-white/20 hidden md:block"></div>

                        <button className="text-white hover:text-accent transition-colors">
                            <span className="font-bold border border-white/30 rounded px-2 py-0.5 text-xs">PT</span>
                        </button>

                        <div className="h-6 w-px bg-white/20 hidden md:block"></div>

                        <Link href="/login" className="text-white hover:text-accent transition-colors">
                            <User className="w-5 h-5 md:w-6 md:h-6" />
                        </Link>

                        <button
                            onClick={toggleCart}
                            className="relative text-white hover:text-accent transition-colors"
                            aria-label="Open Cart"
                        >
                            <ShoppingBag className="w-5 h-5 md:w-6 md:h-6" />
                            {cartTotalItems > 0 && (
                                <span className="absolute -top-1 -right-2 bg-accent text-white text-[10px] font-bold w-4 h-4 flex items-center justify-center rounded-full">
                                    {cartTotalItems}
                                </span>
                            )}
                        </button>

                        {/* Mobile Toggle */}
                        <button
                            className="md:hidden text-white"
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                        >
                            {mobileMenuOpen ? <X /> : <Menu />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                <AnimatePresence>
                    {mobileMenuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: "auto" }}
                            exit={{ opacity: 0, height: 0 }}
                            className="md:hidden bg-black border-t border-white/10 overflow-hidden"
                        >
                            <nav className="flex flex-col p-4 gap-4 font-medium text-lg text-white">
                                <Link
                                    href="/menu"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-accent"
                                >
                                    Menu
                                </Link>
                                <Link
                                    href="/satimoney"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-accent"
                                >
                                    Satimoney
                                </Link>
                                <Link
                                    href="/about"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-accent"
                                >
                                    Sobre
                                </Link>
                                <Link
                                    href="/contact"
                                    onClick={() => setMobileMenuOpen(false)}
                                    className="hover:text-accent"
                                >
                                    Contato
                                </Link>
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </header>
        </>
    );
}
