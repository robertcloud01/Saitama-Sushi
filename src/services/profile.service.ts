import { supabase } from '@/lib/supabase';

export interface UserProfile {
    id: string;
    email: string;
    full_name?: string;
    avatar_url?: string;
    phone?: string;
    address?: string;
}

export const ProfileService = {
    async getProfile(): Promise<UserProfile | null> {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) return null;

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('id', user.id)
            .single();

        if (error) {
            console.error('Error fetching profile:', error);
            return null;
        }

        return {
            id: user.id,
            email: user.email!,
            ...data
        };
    },

    async updateProfile(updates: Partial<UserProfile>) {
        const { data: { user } } = await supabase.auth.getUser();

        if (!user) throw new Error('No user logged in');

        const { error } = await supabase
            .from('profiles')
            .upsert({
                id: user.id,
                ...updates,
                updated_at: new Date().toISOString(),
            });

        if (error) {
            throw error;
        }
    }
};
