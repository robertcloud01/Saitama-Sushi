"use client";

import { CATEGORIES, PRODUCTS } from "@/lib/mock-data";
import { useState } from "react";
import { MenuSidebar } from "@/components/menu/MenuSidebar";
import { MenuGrid } from "@/components/menu/MenuGrid";
import { StickyCart } from "@/components/menu/StickyCart";

export default function MenuPage() {
    const [activeCategory, setActiveCategory] = useState(CATEGORIES[0].id);

    const filteredProducts = PRODUCTS.filter(
        (p) => p.categoryId === activeCategory
    );

    return (
        <div className="bg-black min-h-screen text-white pt-24 pb-20">
            <div className="container mx-auto px-4">

                {/* 3-Column Layout: Sidebar (250px) | Grid (1fr) | Cart (320px) */}
                <div className="flex flex-col lg:flex-row gap-8 items-start relative">

                    {/* Left Sidebar - Sticky */}
                    <MenuSidebar
                        activeCategory={activeCategory}
                        onSelectCategory={setActiveCategory}
                    />

                    {/* Main Content - Categories (Mobile) & Products Grid */}
                    <main className="flex-1 w-full min-w-0">
                        {/* Mobile Category Header */}
                        <div className="lg:hidden mb-8 overflow-x-auto pb-2 flex gap-2">
                            {CATEGORIES.map(cat => (
                                <button
                                    key={cat.id}
                                    onClick={() => setActiveCategory(cat.id)}
                                    className={`px-4 py-2 rounded-full whitespace-nowrap text-sm font-bold ${activeCategory === cat.id ? 'bg-[#ff2ca2] text-white' : 'bg-white/10 text-gray-300'}`}
                                >
                                    {cat.name}
                                </button>
                            ))}
                        </div>

                        <div className="mb-6">
                            <h2 className="text-3xl font-bold mb-2">
                                {CATEGORIES.find(c => c.id === activeCategory)?.name || "Menu"}
                            </h2>
                            <p className="text-gray-400">
                                {filteredProducts.length} itens disponíveis
                            </p>
                        </div>

                        <MenuGrid products={filteredProducts} />

                        {filteredProducts.length === 0 && (
                            <div className="py-20 text-center text-gray-500 border border-dashed border-gray-800 rounded-2xl">
                                Nenhum produto nesta categoria.
                            </div>
                        )}
                    </main>

                    {/* Right Sidebar - Sticky Cart (Desktop Only) */}
                    <StickyCart />
                </div>
            </div>
        </div>
    );
}
