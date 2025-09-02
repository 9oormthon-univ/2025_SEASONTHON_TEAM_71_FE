// src/stores/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      user: null, // 로그인한 사용자 정보 객체
      role: "user", // "user" or "owner"

      login: ({ token, user, role }) =>
        set({
          isLoggedIn: true,
          token: token ?? null,
          user: user ?? null,
          role: role ?? get().role,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          token: null,
          user: null,
          role: "user",
        }),

      setRole: (role) => {
        if (role === "user" || role === "owner") set({ role });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
