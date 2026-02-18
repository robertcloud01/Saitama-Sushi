"use client";

import { CATEGORIES } from "@/lib/mock-data";
import { cn } from "@/lib/utils";

interface MenuSidebarProps {
    activeCategory: string;
    onSelectCategory: (id: string) => void;
}

export function MenuSidebar({ activeCategory, onSelectCategory }: MenuSidebarProps) {
    // Helper to group categories
    const groupedCategories = CATEGORIES.reduce((acc, cat) => {
        const group = cat.group || 'main'; // Default to 'main' if no group
        if (!acc[group]) acc[group] = [];
        acc[group].push(cat);
        return acc;
    }, {} as Record<string, typeof CATEGORIES>);

    const groups = ['main', 'Sushi, Sashimi, Gunkan', 'Pratos', 'Bebida', 'Molhos']; // Order

    return (
        <aside className="hidden lg:block w-[250px] sticky top-24 h-[calc(100vh-120px)] overflow-y-auto pr-4 custom-scrollbar">
            {groups.map((groupName) => {
                const groupItems = groupedCategories[groupName];
                if (!groupItems) return null;

                // For "Molhos", the image shows it as a header/section, likely similar to "Bebida" if it has items.
                // Or if it's just a category itself. The user image shows "Molhos" at bottom with a divider.

                // Specific styling for 'Bebida' (pink text) and Headers
                const isMain = groupName === 'main';
                const isHighlight = groupName === 'Bebida';

                return (
                    <div key={groupName} className="mb-6">
                        {/* Header handling: 'main' has no header. Others do. */}
                        {!isMain && (
                            <>
                                <div className="h-[1px] bg-white/10 mb-4" /> {/* Divider */}
                                <h3 className={cn(
                                    "font-bold text-[15px] mb-3 px-4",
                                    isHighlight ? "text-[#ff2ca2]" : "text-white"
                                )}>
                                    {groupName}
                                </h3>
                            </>
                        )}

                        <div className="flex flex-col gap-1">
                            {groupItems.map((cat) => {
                                // If the category itself is the header (like Bebida often acts as both header and clickable if single item),
                                // check logic. Here we list items under the header.
                                // If category name == group name (like Bebida), don't repeat unless needed.
                                // But looking at image: "Bebida" is RED/PINK text.
                                // "Molhos" is White text.
                                // Under "Sushi...", items are indented or plain.

                                // Actually, looking at the image:
                                // "Bebida" is pink. It seems to be a CATEGORY LINK itself or a SECTION HEADER.
                                // The user request says "crie todos esse items".
                                // Let's iterate normally.
                                if (cat.isHeaderOnly) return null; // Logic if needed

                                return (
                                    <button
                                        key={cat.id}
                                        onClick={() => onSelectCategory(cat.id)}
                                        className={cn(
                                            "text-left px-4 py-2 rounded-lg text-sm font-medium transition-colors",
                                            activeCategory === cat.id
                                                ? "text-[#ff2ca2]"
                                                : "text-gray-400 hover:text-white"
                                        )}
                                    >
                                        {cat.name}
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                );
            })}
        </aside>
    );
}
