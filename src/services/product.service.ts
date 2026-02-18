import { supabase } from '@/lib/supabase';
import { Product } from '@/types';

export const ProductService = {
    async getPopularProducts(limit = 12): Promise<Product[]> {
        const { data, error } = await supabase
            .from('Product')
            .select('*, category:Category(*)')
            .eq('isPopular', true)
            .limit(limit);

        if (error) {
            console.error('Error fetching popular products:', error);
            return [];
        }

        return (data || []).map((p: Product) => ({
            ...p,
            image: p.image ?? '/images/placeholder.png',
        }));
    },

    async getAllProducts(): Promise<Product[]> {
        const { data, error } = await supabase
            .from('Product')
            .select('*, category:Category(*)')
            .order('name');

        if (error) {
            console.error('Error fetching all products:', error);
            return [];
        }

        return (data || []).map((p: Product) => ({
            ...p,
            image: p.image ?? '/images/placeholder.png',
        }));
    },

    async getProductBySlug(slug: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('Product')
            .select('*, category:Category(*)')
            .eq('slug', slug)
            .single();

        if (error) {
            console.error(`Error fetching product with slug ${slug}:`, error);
            return null;
        }

        return {
            ...data,
            image: data.image ?? '/images/placeholder.png',
        };
    },

    async getProductById(id: string): Promise<Product | null> {
        const { data, error } = await supabase
            .from('Product')
            .select('*, category:Category(*)')
            .eq('id', id)
            .single();

        if (error) {
            console.error(`Error fetching product with id ${id}:`, error);
            return null;
        }

        return {
            ...data,
            image: data.image ?? '/images/placeholder.png',
        };
    }
};
