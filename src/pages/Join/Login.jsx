// 로그인 페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../components/Button";
import useAuthStore from "../../stores/authStore";
import MainLogo from "../../assets/img/main_logo.svg";
import useLogin from "../../api/login";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex-grow: 1;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.img`
  width: 204px;
  height: 76.64x;
  margin-bottom: 62.36px;
`;

const InputSection = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Label = styled.label`
  color: #999;
  font-size: 14px;
  font-weight: 500;
`;

const Input = styled.input`
  color: #111;
  font-size: 14px;
  font-weight: 500;
  height: 48px;
  border: none;
  outline: none;
`;

const IDWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #999;
  margin-bottom: 28px;
`;

const PasswordWrapper = styled.div`
  position: relative;
  border-bottom: 1px solid #999;
  margin-bottom: 28px;
`;

const ToggleBtn = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  background: none;
  border: none;
  cursor: pointer;
  padding: 0;
  margin-right: 8px;
  height: 48px;
`;

const LoginBtn = styled.div`
  width: 100%;
  margin: 12px 0;
`;

const SignupText = styled.div`
  width: 100%;
  text-align: right;
  color: #666;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
`;

// export default function Login() {
//   const navigate = useNavigate();

//   const [ID, setUserID] = useState("");
//   const [password, setPassword] = useState("");
//   const [showPassword, setShowPassword] = useState(false);

//   const { login, isLoading, error } = useLogin();
//   const role  = useAuthStore((s) => s.role);

//   const handleLogin = async (e) => {
//     e.preventDefault();

//     // if (!id.trim()) {
//     //   alert("아이디를 입력해주세요.");
//     //   return;
//     // }

//     // if (password.length < 8) {
//     //   alert("비밀번호는 8자 이상이어야 합니다.");
//     //   return;
//     // }

//     const payload = {
//           username: ID,
//           password,
//       };

//     try {
//       const response = await login(payload);
//       console.log("로그인 성공:", response);

//       if (response) {
//         // localStorage.setItem("accessToken", response.result.accessToken);
//         // localStorage.setItem("refreshToken", response.result.refreshToken);
//         alert("로그인에 성공했습니다.");
//         navigate("/");
//       } else {
//           alert(response.message);
//       }
//     } catch (err) {
//       const errorMessage = err.response?.data?.message || "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
//       alert(`로그인 실패: ${errorMessage}`);
//     }
//   };
export default function Login() {
  const navigate = useNavigate();

  const [ID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const { login, isLoading } = useLogin();
  const role = useAuthStore((s) => s.role); // 필요하면 사용

  const handleLogin = async (e) => {
    e.preventDefault();

    // if (!ID.trim()) {
    //   alert("아이디를 입력해주세요.");
    //   return;
    // }
    // if (password.length < 8) {
    //   alert("비밀번호는 8자 이상이어야 합니다.");
    //   return;
    // }

    try {
      // 요청 로그
      console.group("[LOGIN] request");
      console.log("username:", ID);
      console.log("password.length:", password.length);
      console.groupEnd();

      // 서버 호출
      const res = await login({ username: ID, password });

      // 응답 로그(여러 형태 대비)
      console.groupCollapsed("[LOGIN] response");
      console.log("raw:", res);
      console.log(
        "res?.data:",
        res?.data || "서버 응답에 data 속성 없음 (정상)"
      );
      console.log(
        "token:",
        res?.token ??
          res?.data?.token ??
          res?.accessToken ??
          res?.data?.accessToken
      );
      console.log("user:", res?.user ?? res?.data?.user);
      console.log(
        "role:",
        res?.role ?? res?.data?.role ?? res?.user?.role ?? res?.data?.user?.role
      );
      console.groupEnd();

      // 스토어 현재값도 확인
      console.groupCollapsed("[STORE] after login()");
      console.log("store.role:", useAuthStore.getState().role);
      console.log("store.user:", useAuthStore.getState().user);
      console.groupEnd();

      alert("로그인에 성공했습니다.");
      navigate("/");
    } catch (err) {
      // 에러 상세 로그
      console.groupCollapsed("[LOGIN] error");
      console.error(err);
      console.log("err.response?.data:", err?.response?.data);
      console.groupEnd();

      const msg =
        err?.readableMessage ??
        err?.response?.data?.message ??
        "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      alert(`로그인 실패: ${msg}`);
    }
  };

  return (
    <LoginWrapper>
      {/* 로고 */}
      <Logo src={MainLogo} />

      {/* 아이디+비번 */}
      <InputSection>
        <Label>아이디</Label>
        <IDWrapper>
          <Input
            type="text"
            placeholder="아이디를 입력하세요."
            value={ID}
            onChange={(e) => setUserID(e.target.value)}
          />
        </IDWrapper>

        <Label>비밀번호</Label>
        <PasswordWrapper>
          <Input
            type={showPassword ? "text" : "password"}
            placeholder="비밀번호를 입력하세요"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <ToggleBtn onClick={() => setShowPassword(!showPassword)}>
            {showPassword ? (
              <FaEye size={16} color="#142CA6" />
            ) : (
              <FaEyeSlash size={16} color="#999" />
            )}
          </ToggleBtn>
        </PasswordWrapper>
      </InputSection>

      {/* 로그인 버튼 */}
      <LoginBtn>
        <Button text="로그인" reverse onClick={handleLogin} />
      </LoginBtn>
      <SignupText onClick={() => navigate("/join/category")}>
        회원가입
      </SignupText>
    </LoginWrapper>
  );
}
