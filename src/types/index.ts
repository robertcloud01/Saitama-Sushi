export interface Category {
    id: string;
    name: string;
    slug: string;
    image?: string;
    group?: string;
}

export interface Product {
    id: string;
    name: string;
    slug: string;
    description: string;
    price: number;
    image: string;
    categoryId: string;
    category?: Category;
    isPopular?: boolean;
    isNew?: boolean;
    ingredients?: string;
    relatedProductIds?: string[];
}

export interface CartItem {
    id: string;
    name: string;
    price: number;
    image?: string;
    quantity: number;
    slug?: string;
    description?: string;
    options?: Record<string, unknown>;
}
