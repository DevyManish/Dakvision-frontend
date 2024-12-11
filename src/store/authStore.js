import api from "@/lib/api";
import { create } from "zustand";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    isAuthenticated: localStorage.getItem("token") ? true : false,
    error: null,

    setUser: (user) => set({ user }),

    fetchUser: async () => {
        try {
            const token = localStorage.getItem("token");

            if (token) {
                const response = await api.get("/users/current-user", {
                    headers: { Authorization: `Bearer ${token}` },
                });

                set({
                    user: response.data.data,
                    loading: false,
                    isAuthenticated: true,
                });
            }
        } catch (error) {
            set({ user: null, loading: false, error: error.response?.data?.message || "Failed to fetch user" });
        }
    },
    login: async (data) => {

        try {
            const response = await api.post("/users/login", data, { withCredentials: true });
            console.log(response.data.data.user)
            set({ user: response.data.data.user, loading: false, isAuthenticated: true });
            localStorage.setItem("token", response.data.data.accessToken);

        } catch (error) {
            set({ user: null, loading: false, error: error.response?.data?.message || "Login failed" });
            throw error;

        }
    },
    logout: () => {
        localStorage.removeItem("token");
        set({ user: null, isAuthenticated: false });
    },
    hasRole: (role) => {
        if (!useAuthStore.getState().user) return false;
        return useAuthStore.getState().user?.role === role;
    },
}))