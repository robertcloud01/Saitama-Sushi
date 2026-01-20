"use client";

import Link from "next/link";
import { Menu } from "lucide-react";

export function FloatingMenuButton() {
    return (
        <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <Link
                href="/menu"
                className="flex items-center gap-2 bg-accent text-white px-6 py-3 rounded-full shadow-lg font-bold uppercase tracking-widest hover:bg-white hover:text-black transition-all hover:scale-105"
            >
                <Menu className="w-5 h-5" />
                Menu
            </Link>
        </div>
    );
}
