"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { User, ShoppingBag, CreditCard, MapPin, Coins, LogOut } from "lucide-react";
import clsx from "clsx";

const MENU_ITEMS = [
    { label: "Configurações de Conta", href: "/profile", icon: User },
    { label: "Histórico de pedidos", href: "/profile/orders", icon: ShoppingBag },
    { label: "Meus cartões", href: "/profile/cards", icon: CreditCard },
    { label: "Endereços", href: "/profile/addresses", icon: MapPin },
    { label: "Satimoney", href: "/profile/satimoney", icon: Coins },
];

export function ProfileSidebar() {
    const pathname = usePathname();

    return (
        <aside className="w-full lg:w-[300px] shrink-0">
            <div className="bg-[#111] rounded-2xl p-6 border border-white/5 sticky top-24">
                <div className="mb-8">
                    <h2 className="text-xl font-bold text-white mb-1">Minha conta</h2>
                    <div className="h-1 w-8 bg-[#ff2ca2] rounded-full" />
                </div>

                <nav className="space-y-2">
                    {MENU_ITEMS.map((item) => {
                        const isActive = pathname === item.href;
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={clsx(
                                    "flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200",
                                    isActive
                                        ? "bg-white/10 text-white font-bold"
                                        : "text-gray-400 hover:text-white hover:bg-white/5"
                                )}
                            >
                                <Icon className={clsx("w-5 h-5", isActive ? "text-[#ff2ca2]" : "text-gray-500")} />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}
                </nav>

                <div className="mt-8 pt-8 border-t border-white/10">
                    <button className="flex items-center gap-3 px-4 py-3 text-[#ff2ca2] font-bold hover:bg-[#ff2ca2]/10 rounded-lg w-full transition-colors">
                        <LogOut className="w-5 h-5" />
                        <span>Sair</span>
                    </button>
                </div>
            </div>
        </aside>
    );
}
