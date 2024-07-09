import { create } from 'zustand';
import { persist, PersistOptions } from 'zustand/middleware';
import { supabase } from '@/lib/supabaseClient';

interface AuthState {
  user: any | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  checkAuth: () => boolean;
}

type AuthStore = AuthState & {
  set: (partial: Partial<AuthState>) => void;
};

const useAuth = create(
  persist<AuthStore>(
    (set, get) => ({
      user: null,
      loading: false,
      error: null,
      login: async (email: string, password: string) => {
        set({ loading: true, error: null });
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) {
          set({ error: error.message, loading: false });
        } else {
          set({ user: data.user, loading: false });
        }
      },
      logout: async () => {
        await supabase.auth.signOut();
        set({ user: null });
      },
      checkAuth: () => {
        const { user } = get();
        return user ? true : false;
      },
      set: (partial) => set((state) => ({ ...state, ...partial })),
    }),
    {
      name: 'auth-storage',
    }
  )
);

export default useAuth;
