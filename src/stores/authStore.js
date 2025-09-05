// src/stores/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: false,
      token: null,
      user: null, // 로그인한 사용자 정보 객체
      role: "personal",

      login: ({ token, user, role }) =>
        set({
          isLoggedIn: !!token,
          token: token ?? null,
          user: user ?? null,
          role: role ?? get().role,
        }),

      logout: () =>
        set({
          isLoggedIn: false,
          token: null,
          user: null,
          role: "personal",
        }),

      setRole: (role) => {
        if (role === "personal" || role === "company") set({ role });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
