<<<<<<< HEAD
import { useState } from 'react';
import axios from 'axios';

const useSignup = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const [data, setData] = useState(null);

    const signup = async (userData) => {
        setIsLoading(true);
        setError(null);
        setData(null);

        const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/signup`;

        try {
            const response = await axios.post(API_URL, userData, {
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const payload = response.data?.data ?? response.data?.result ?? response.data;
            setData(payload);
            return payload;
        } catch (err) {
            // 친절한 에러 메시지 추가
            const status = err.response?.status;
            const serverMsg = err.response?.data?.data || err.response?.data?.message;

            if (status === 409) {
                // 409 Conflict: Swagger 예시의 "ERROR", "User already exists"에 대응
                err.readableMessage = '이미 사용 중인 아이디 또는 이메일입니다.';
            } else if (status === 400) {
                // 400 Bad Request: 입력값 유효성 검사 실패
                err.readableMessage = serverMsg || '입력값이 올바르지 않습니다. 다시 확인해주세요.';
            } else {
                // 그 외 일반적인 에러
                err.readableMessage = serverMsg || '회원가입 중 오류가 발생했습니다.';
            }

            setError(err);
            console.error('회원가입 API 실패:', {
                status,
                serverMsg,
                err: err.message,
            });
            throw err;
        } finally {
            setIsLoading(false);
        }
    };
    
    return { signup, isLoading, error, data };
};

export default useSignup;
=======
import { useState } from "react";
import axios from "axios";

const useSignup = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [data, setData] = useState(null);

  const signup = async (userData) => {
    setIsLoading(true);
    setError(null);
    setData(null);

    const API_URL = `${import.meta.env.VITE_BACKEND_BASE_URL}/api/auth/signup`;

    try {
      const response = await axios.post(API_URL, userData, {
        headers: {
          "Content-Type": "application/json",
        },
      });

      const payload =
        response.data?.data ?? response.data?.result ?? response.data;
      setData(payload);
      return payload;
    } catch (err) {
      // 친절한 에러 메시지 추가
      const status = err.response?.status;
      const serverMsg = err.response?.data?.data || err.response?.data?.message;

      if (err.code === "ERR_NETWORK" || err.code === "ECONNREFUSED") {
        // 네트워크 연결 오류 (백엔드 서버가 실행되지 않음)
        err.readableMessage =
          "서버에 연결할 수 없습니다. 백엔드 서버가 실행 중인지 확인해주세요.";
      } else if (status === 404) {
        // 404 Not Found: API 엔드포인트를 찾을 수 없음
        err.readableMessage =
          "회원가입 API를 찾을 수 없습니다. 서버 설정을 확인해주세요.";
      } else if (status === 409) {
        // 409 Conflict: Swagger 예시의 "ERROR", "User already exists"에 대응
        err.readableMessage = "이미 사용 중인 아이디 또는 이메일입니다.";
      } else if (status === 400) {
        // 400 Bad Request: 입력값 유효성 검사 실패
        err.readableMessage =
          serverMsg || "입력값이 올바르지 않습니다. 다시 확인해주세요.";
      } else {
        // 그 외 일반적인 에러
        err.readableMessage = serverMsg || "회원가입 중 오류가 발생했습니다.";
      }

      setError(err);
      console.error("회원가입 API 실패:", {
        status,
        serverMsg,
        err: err.message,
        code: err.code,
      });
      throw err;
    } finally {
      setIsLoading(false);
    }
  };

  return { signup, isLoading, error, data };
};

export default useSignup;
>>>>>>> develop
