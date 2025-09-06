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

    const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/login`;

    try {
      const response = await axios.post(
        API_URL,
        { username, password }, // 로그인은 자격증명만 전송
        {
          headers: { "Content-Type": "application/json" },
          // withCredentials: true, // 쿠키 인증이면 주석 해제 + 서버 CORS도 credentials 허용 필요
          timeout: 15000,
        }
      );

      // 서버 스키마 다양한 경우 대비
      const payload = response.data?.result ?? response.data?.data ?? response.data ?? {};

      // 토큰/유저/역할 추출 (키 이름은 백엔드 스펙에 맞춰 필요시 수정)
      const accessToken = payload.accessToken ?? payload.token ?? null;
      const refreshToken = payload.refreshToken ?? null;

      const userFromServer =
        payload.user ??
        payload.profile ??
        { username: payload.username ?? username };

      const roleFromServer = payload.role ?? null;

      // 전역 상태 저장 (비밀번호는 저장 
      // X)
      useAuthStore.getState().login({
        token: accessToken,
        user: userFromServer,
        role: roleFromServer ?? useAuthStore.getState().role ?? null,
      });

      setData(payload);
      return payload;
    } catch (err) {
      const status = err?.response?.status;
      const serverMsg = err?.response?.data?.data || err?.response?.data?.message;

      if (!err.response) {
        err.readableMessage =
          "네트워크 또는 CORS 문제로 요청이 차단되었습니다. 서버 주소/HTTPS/CORS 설정을 확인하세요.";
      } else if (status === 404) {
        err.readableMessage = "아이디(Username) 또는 비밀번호를 확인해주세요.";
      } else if (status === 401) {
        err.readableMessage = "인증에 실패했습니다. 자격 증명을 확인해주세요.";
      } else if (status === 403) {
        err.readableMessage = "접근이 거부되었습니다. 권한 또는 CORS 설정을 확인하세요.";
      } else {
        err.readableMessage = serverMsg || "로그인 중 오류가 발생했습니다.";
      }

      setError(err);
      console.error("로그인 API 실패:", {
        status,
        serverMsg,
        message: err?.message,
        stack: err?.stack,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { login, isLoading, error, data };
};

export default useLogin;
    
//     const userData = {
//       username,
//       password,
//     }

//     try {
//       const response = await axios.post(API_URL, userData, { 
//         headers: { 
//           'Content-Type': 'application/json',
//         }, 
//       });

//       const payload = response.data?.data ?? response.data?.result ?? response.data;

//       // 전역 상태 저장
//       useAuthStore.getState().login({
//         token: accessToken,
//         user: {
//           username: unameFromServer ?? username,
//           password: password ?? null,
//         },
//         role: role,
//       });
//       setData(payload);
//       return payload;
//     } catch (err) {
//       // 친절한 에러 메시지
//       const status = err.response?.status;
//       const serverMsg = err.response?.data?.data || err.response?.data?.message;

//       if (status === 404) {
//         // 스웨거 예시: { message: "ERROR", data: "user not found" }
//         err.readableMessage = '아이디(Username) 또는 비밀번호를 확인해주세요.';
//       } else if (status === 401) {
//         err.readableMessage = '인증에 실패했습니다. 자격 증명을 확인해주세요.';
//       } else if (status === 403) {
//         err.readableMessage = '접근이 거부되었습니다. CORS/보안 설정을 확인해주세요.';
//       } else {
//         err.readableMessage = serverMsg || '로그인 중 오류가 발생했습니다.';
//       }

//       setError(err);
//       console.error('로그인 API 실패:', {
//         status,
//         serverMsg,
//         err: err.message,
//       });
//       throw err;
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return { login, isLoading, error, data };
// };

// export default useLogin;
