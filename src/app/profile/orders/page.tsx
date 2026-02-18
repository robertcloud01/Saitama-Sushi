"use client";

import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { ShoppingBag, Loader2 } from "lucide-react";

interface Order {
    id: string;
    total: number;
    status: string;
    createdAt: string;
}

export default function OrdersPage() {
    const [orders, setOrders] = useState<Order[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchOrders = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            if (!session) return;

            const { data, error } = await supabase
                .from('Order')
                .select('*')
                .eq('userId', session.user.id)
                .order('createdAt', { ascending: false });

            if (error) {
                console.error("Error fetching orders:", error);
            } else {
                setOrders(data || []);
            }
            setLoading(false);
        };
        fetchOrders();
    }, []);

    if (loading) return <div className="text-center py-8"><Loader2 className="w-8 h-8 animate-spin mx-auto text-[#ff2ca2]" /></div>;

    return (
        <div>
            <h2 className="text-2xl font-bold text-white mb-8">Histórico de pedidos</h2>

            {orders.length === 0 ? (
                <div className="text-center py-10 opacity-50">
                    <ShoppingBag className="w-12 h-12 mx-auto mb-4 text-gray-500" />
                    <p className="text-gray-400">Nenhum pedido encontrado.</p>
                </div>
            ) : (
                <div className="space-y-6">
                    {orders.map((order) => (
                        <div key={order.id} className="bg-[#111] border border-white/5 rounded-2xl p-6 flex flex-col md:flex-row gap-6 items-start md:items-center justify-between group hover:border-[#ff2ca2]/30 transition-colors cursor-pointer">
                            <div className="flex gap-4 items-center">
                                <div className="w-16 h-16 bg-white/5 rounded-xl flex items-center justify-center text-2xl">
                                    🍣
                                </div>
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="font-bold text-white">Pedido #{order.id.slice(0, 8)}</h3>
                                        <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                            {order.status || "Entregue"}
                                        </span>
                                    </div>
                                    <p className="text-gray-400 text-sm">R$ {order.total}</p>
                                    <p className="text-gray-500 text-xs mt-1">{new Date(order.createdAt).toLocaleDateString()}</p>
                                </div>
                            </div>
                            <button className="w-full md:w-auto px-6 py-2 border border-[#ff2ca2] text-[#ff2ca2] font-bold rounded-lg hover:bg-[#ff2ca2] hover:text-white transition-all text-sm uppercase tracking-wide">
                                Pedir novamente
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
