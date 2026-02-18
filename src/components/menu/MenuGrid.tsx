"use client";

import { useCartStore } from "@/store/cart.store";
import { formatCurrency } from "@/lib/utils";
import Image from "next/image";
import { Plus } from "lucide-react";



interface Product {
    id: string;
    name: string;
    price: number;
    image: string;
}

interface MenuGridProps {
    products: Product[];
}

export function MenuGrid({ products }: MenuGridProps) {
    const addItem = useCartStore((state) => state.addItem);

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 auto-rows-[320px]">
            {products.map((product) => (
                <div
                    key={product.id}
                    className="group relative bg-[#0E0E0E] rounded-[24px] overflow-hidden flex flex-col border border-white/5"
                >
                    {/* Image Area */}
                    <div className="relative h-[70%] w-full overflow-hidden p-3 pb-0">
                        <div className="relative w-full h-full rounded-[20px] overflow-hidden">
                            <Image
                                src={product.image}
                                alt={product.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-110"
                            />
                        </div>
                    </div>

                    {/* Content Area */}
                    <div className="flex-1 px-4 pb-4 pt-3 flex flex-col justify-between">
                        <h3 className="text-white font-medium text-[15px] leading-tight line-clamp-2 pr-2">
                            {product.name}
                        </h3>

                        <div className="flex items-center justify-between mt-2">
                            <span className="text-white font-semibold text-lg">
                                {formatCurrency(product.price)}
                            </span>

                            <button
                                onClick={(e) => {
                                    e.stopPropagation();
                                    addItem({
                                        id: product.id,
                                        name: product.name,
                                        price: product.price,
                                        quantity: 1,
                                        image: product.image
                                    });
                                }}
                                className="w-9 h-9 rounded-full bg-white flex items-center justify-center text-black hover:bg-gray-200 transition-colors shadow-lg active:scale-95"
                            >
                                <Plus className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
