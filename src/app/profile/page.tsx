"use client";

export default function ProfilePage() {
    return (
        <div className="space-y-12">

            {/* SECTION: Account Info */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold text-white">Informações da conta</h2>
                    <button className="text-sm font-bold text-gray-500 hover:text-[#ff2ca2] underline transition-colors">
                        Editar
                    </button>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl p-8 space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Primeiro nome</label>
                            <p className="text-white text-lg font-medium">Promosdotroll</p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Sobrenome</label>
                            <p className="text-white text-lg font-medium">-</p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Telefone</label>
                            <p className="text-white text-lg font-medium">-</p>
                        </div>
                        <div>
                            <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">E-mail</label>
                            <p className="text-white text-lg font-medium">promosdotroll@gmail.com</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* SECTION: Password */}
            <section>
                <div className="flex justify-between items-end mb-6">
                    <h2 className="text-2xl font-bold text-white">Senha</h2>
                    <button className="text-sm font-bold text-gray-500 hover:text-[#ff2ca2] underline transition-colors">
                        Editar
                    </button>
                </div>

                <div className="bg-[#111] border border-white/5 rounded-2xl p-8">
                    <div>
                        <label className="block text-xs uppercase tracking-wider text-gray-500 font-bold mb-2">Senha</label>
                        <p className="text-white text-lg font-medium tracking-widest">••••••••••••</p>
                    </div>
                </div>
            </section>
        </div>
    );
}
