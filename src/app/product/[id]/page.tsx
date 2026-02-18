import { ProductService } from "@/services/product.service";
import { ProductClient } from "./ProductClient";
import { Metadata } from "next";

interface PageProps {
    params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
    // In Next.js 15, params is a Promise
    const { id } = await params;
    const product = await ProductService.getProductById(id);

    if (!product) {
        return {
            title: "Produto Não Encontrado | Saitama Delivery",
        };
    }

    return {
        title: `${product.name} | Saitama Delivery`,
        description: product.description,
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.image],
        },
    };
}

export default async function ProductPage({ params }: PageProps) {
    // In Next.js 15, params is a Promise
    const { id } = await params;
    const product = await ProductService.getProductById(id);

    if (!product) {
        return (
            <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center">
                <h1 className="text-2xl font-bold mb-4">Produto Não Encontrado</h1>
            </div>
        );
    }

    return <ProductClient product={product} />;
}
