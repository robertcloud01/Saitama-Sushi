"use client";

import Link from "next/link";
import { Star } from "lucide-react";

const REVIEWS = [
    {
        id: 1,
        name: "Gabriel Santos",
        text: "Mano, esse sushi tá de rocha! O melhor de Boa Vista, sem dúvida. O delivery chegou rapidão aqui no Paraviana. 🔥🥢",
        rating: 5,
    },
    {
        id: 2,
        name: "Ana Beatriz",
        text: "Já provei vários sushis na Ville Roy, mas o Saitama é diferenciado. O hot philadelphia é o bicho! Recomendo demais. 🙌🏻🍣",
        rating: 5,
    },
    {
        id: 3,
        name: "Marcos Oliveira",
        text: "Melhor yakisoba da cidade! Me senti lá no Japão, mas com aquele calorzinho de Roraima. Atendimento nota 10! 🤗",
        rating: 5,
    }
];

export function ReviewsSection() {
    return (
        <section className="bg-[#0E0E0E] text-white py-24 border-t border-white/5">
            <div className="container mx-auto px-4">

                {/* Header */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
                    <div>
                        <h2 className="text-4xl md:text-6xl font-bold tracking-tight uppercase leading-none mb-4">
                            SUA OPINIÃO É <span className="text-white">IMPORTANTE.</span>
                        </h2>

                        <div className="flex items-center gap-3 mt-4">
                            <div className="flex gap-1 text-[#ff2ca2]">
                                {[1, 2, 3, 4, 5].map(i => <Star key={i} fill="currentColor" className="w-5 h-5" />)}
                            </div>
                            <span className="text-white font-bold text-xl">4,5</span>
                            <span className="text-gray-400 text-sm font-medium">94 Avaliações Do Google</span>
                        </div>
                    </div>

                    <Link href="/reviews" className="bg-white text-black font-bold py-3 px-8 rounded-full hover:bg-gray-200 transition-all text-sm uppercase tracking-wide">
                        Deixe um comentário
                    </Link>
                </div>

                {/* Reviews Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {REVIEWS.map((review) => (
                        <div key={review.id} className="bg-transparent border border-white/10 rounded-[32px] p-8 flex flex-col justify-between min-h-[280px] hover:border-white/20 transition-colors">
                            <p className="text-gray-200 text-lg leading-relaxed mb-6">
                                {review.text}
                            </p>

                            <div className="mt-auto">
                                <div className="flex gap-1 text-[#ff2ca2] mb-3">
                                    {[...Array(review.rating)].map((_, i) => (
                                        <Star key={i} fill="currentColor" className="w-4 h-4" />
                                    ))}
                                </div>
                                <h4 className="font-bold text-white text-sm uppercase tracking-wide">
                                    {review.name}
                                </h4>
                            </div>
                        </div>
                    ))}
                </div>

            </div>
        </section>
    );
}
