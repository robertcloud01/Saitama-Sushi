import { supabase } from '@/lib/supabase';
import { SignInWithPasswordCredentials } from '@supabase/supabase-js';

export const AuthService = {
    async signIn(credentials: SignInWithPasswordCredentials) {
        const { data, error } = await supabase.auth.signInWithPassword(credentials);
        if (error) throw error;
        return data;
    },

    async signUp(credentials: { email: string; password: string; options?: Record<string, unknown> }, userData?: { name: string }) {
        const { email, password, options } = credentials;

        const { data, error } = await supabase.auth.signUp({
            email,
            password,
            options: {
                ...options,
                data: {
                    ...(options?.data as object || {}),
                    name: userData?.name,
                }
            }
        });

        if (error) throw error;

        // If user creation successful, explicitly create profile if needed
        // Note: Triggers usually handle this, but manual insertion is robust
        if (data.user && userData) {
            const { error: profileError } = await supabase
                .from('User')
                .insert([
                    {
                        id: data.user.id,
                        name: userData.name,
                        email: email,
                        loyalty: 0
                    }
                ]);

            if (profileError) {
                console.error("Error creating user profile:", profileError);
                // We don't throw here to avoid blocking auth if profile fails (can be fixed later)
            }
        }

        return data;
    },

    async signOut() {
        const { error } = await supabase.auth.signOut();
        if (error) throw error;
    },

    async getSession() {
        const { data, error } = await supabase.auth.getSession();
        if (error) throw error;
        return data.session;
    },

    async getCurrentUser() {
        const { data: { user }, error } = await supabase.auth.getUser();
        if (error) return null;
        return user;
    },

    async resetPassword(email: string) {
        const { error } = await supabase.auth.resetPasswordForEmail(email, {
            redirectTo: typeof window !== 'undefined' ? `${window.location.origin}/profile` : undefined,
        });
        if (error) throw error;
    },

    async updatePassword(password: string) {
        const { error } = await supabase.auth.updateUser({ password });
        if (error) throw error;
    }
};
