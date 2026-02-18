import Link from "next/link";
import { Facebook, Instagram, Twitter, Phone, MapPin, Mail } from "lucide-react";

export function Footer() {
    return (
        <footer className="bg-black text-white pt-20 pb-10 border-t border-white/10">
            <div className="container mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
                    {/* Brand */}
                    <div className="space-y-6">
                        <h3 className="text-2xl font-black uppercase tracking-widest">
                            Saitama<span className="text-accent">.</span>
                        </h3>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            O melhor sushi da cidade, entregue com velocidade e precisão.
                            Experimente a arte da culinária japonesa moderna.
                        </p>
                        <div className="flex gap-4">
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <Instagram className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <Facebook className="w-5 h-5" />
                            </Link>
                            <Link href="#" className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-accent hover:text-white transition-all">
                                <Twitter className="w-5 h-5" />
                            </Link>
                        </div>
                    </div>

                    {/* Links */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Navegação</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/menu" className="hover:text-accent transition-colors">Menu Completo</Link></li>
                            <li><Link href="/satimoney" className="hover:text-accent transition-colors">Satimoney</Link></li>
                            <li><Link href="/about" className="hover:text-accent transition-colors">Nossa História</Link></li>
                            <li><Link href="/locations" className="hover:text-accent transition-colors">Localização</Link></li>
                            <li><Link href="/careers" className="hover:text-accent transition-colors">Trabalhe Conosco</Link></li>
                        </ul>
                    </div>

                    {/* Support */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Suporte</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li><Link href="/faq" className="hover:text-accent transition-colors">FAQ</Link></li>
                            <li><Link href="/terms" className="hover:text-accent transition-colors">Termos de Uso</Link></li>
                            <li><Link href="/privacy" className="hover:text-accent transition-colors">Política de Privacidade</Link></li>
                            <li><Link href="/contact" className="hover:text-accent transition-colors">Fale Conosco</Link></li>
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h4 className="font-bold uppercase tracking-widest mb-6 text-sm">Contato</h4>
                        <ul className="space-y-4 text-gray-400 text-sm">
                            <li className="flex items-start gap-3">
                                <Phone className="w-5 h-5 text-accent shrink-0" />
                                <span>+55 95 99123-4567</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <Mail className="w-5 h-5 text-accent shrink-0" />
                                <span>contato@saitamadelivery.com</span>
                            </li>
                            <li className="flex items-start gap-3">
                                <MapPin className="w-5 h-5 text-accent shrink-0" />
                                <span>Av. Ville Roy, 1234 - Caçari, Boa Vista - RR</span>
                            </li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-white/5 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-xs text-gray-500">
                    <p>&copy; 2025 Saitama Delivery. Todos os direitos reservados.</p>
                    <div className="flex gap-6">
                        <Link
                            href="https://my-portif-lio-three.vercel.app/"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hover:text-accent transition-colors"
                        >
                            Desenvolvido por VALHALLAS.DEV
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
