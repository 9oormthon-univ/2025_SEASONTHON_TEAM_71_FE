// 로그인 api

import { useState } from 'react';
import axios from 'axios';
import useAuthStore from '../stores/authStore';

const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const login = async ({ username, password }) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    // const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/login`;
    const API_URL = `/api/auth/login`;

    try {
      const res = await axios.post(
        API_URL,
        { username, password }, 
        { headers: { 'Content-Type': 'application/json' } }
      );

      // 응답 스키마 가드: { message, data: { accessToken, tokenType, expiresIn, ... } }
      const payload = res.data?.data ?? res.data?.result ?? res.data;
      const {
        accessToken,
        tokenType,
        expiresIn,
        role,
        email,
        username: unameFromServer,
        realName,
        name,
      } = payload || {};

      // 전역 상태 저장 (기존 스토어 API에 맞춤)
      useAuthStore.getState().login({
        token: accessToken,
        user: {
          username: unameFromServer ?? username,
          email: email ?? null,
          name: realName ?? name ?? null,
        },
        role: role, // 서버가 안 주면 스토어에서 기존 role 유지
      });

      setData(res.data);
      return res.data;
    } catch (err) {
      // 친절한 에러 메시지
      const status = err.response?.status;
      const serverMsg = err.response?.data?.data || err.response?.data?.message;

      if (status === 404) {
        // 스웨거 예시: { message: "ERROR", data: "user not found" }
        err.readableMessage = '아이디(Username) 또는 비밀번호를 확인해주세요.';
      } else if (status === 401) {
        err.readableMessage = '인증에 실패했습니다. 자격 증명을 확인해주세요.';
      } else if (status === 403) {
        err.readableMessage = '접근이 거부되었습니다. CORS/보안 설정을 확인해주세요.';
      } else {
        err.readableMessage = serverMsg || '로그인 중 오류가 발생했습니다.';
      }

      setError(err);
      console.error('로그인 API 실패:', {
        status,
        serverMsg,
        err: err.message,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, data };
};

export default useLogin;