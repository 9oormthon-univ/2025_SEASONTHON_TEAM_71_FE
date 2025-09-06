// src/stores/authStore.js
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const normalizeRole = (r) => (r === "company" || r === "personal" ? r : null);

const useAuthStore = create(
  persist(
    (set, get) => ({
      isLoggedIn: true, // 테스트용으로 로그인 상태로 설정
      token: "test-token-123", // 테스트용 토큰
      user: {
        username: "testuser",
        userId: "1",
        realName: "테스트 사용자",
        email: "test@example.com",
      }, // 테스트용 사용자 정보
      role: "personal", // personal 역할로 설정
      hydrated: false,

      setHydrated: (v) => set({ hydrated: !!v }),

      login: ({ token, user, role }) => {
        // set({
        //   isLoggedIn: !!token, // 토큰이 있으면 로그인 true.
        //   token: token ?? null,
        //   user: user ?? null,
        //   role: role ?? get().role, // 전달받은 role이 없으면 기존 역할(null)을 유지
        // }),
        const nextRole = normalizeRole(role) ?? get().role ?? null;
        set({
          // 토큰 기반 인증이 아닌 쿠키 기반일 수도 있으니 user만 있어도 true 처리
          isLoggedIn: Boolean(token) || Boolean(user),
          token: token ?? null,
          user: user ?? null,
          role: nextRole,
        });
      },

      logout: () =>
        set({
          isLoggedIn: false,
          token: null,
          user: null,
          role: null,
        }),

      setRole: (role) => {
        const r = normalizeRole(role);
        if (r) set({ role: r });
      },
    }),
    {
      name: "auth-store",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useAuthStore;
