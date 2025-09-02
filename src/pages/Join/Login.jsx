// 로그인 페이지
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Button } from "../../components/Button";
import useAuthStore from "../../stores/authStore";

const LoginWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-grow: 1;
  padding: 24px;
  width: 100%;
  box-sizing: border-box;
`;

const Logo = styled.div`
  width: 100px;
  height: 100px;
  background: #ddd;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #fff;
  font-size: 14px;
  margin: 60px 0;
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

export default function Login() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const [id, setId] = useState("");
  const [password, setPassword] = useState("");

  const login = useAuthStore((s) => s.login);
  const role  = useAuthStore((s) => s.role);

  const handleLogin = () => {
    if (!id.trim()) {
      alert("아이디를 입력해주세요.");
      return;
    }

    if (password.length < 8) {
      alert("비밀번호는 8자 이상이어야 합니다.");
      return;
    }

    login({
      token: "mock-token",                // 임시 토큰
      user:  { id, name: id || "Guest" }, // 임시 유저
      role:  role,                        // 현재 전역 role 사용 ('user' | 'owner')
    });

    //TODO : 로그인 API 연결

    navigate("/");
  };

  return (
    <LoginWrapper>
      {/* 로고 */}
      <Logo>로고</Logo>

      {/* 아이디+비번 */}
      <InputSection>
        <Label>아이디</Label>
        <IDWrapper>
          <Input
            type="text"
            placeholder="아이디를 입력하세요."
            value={id}
            onChange={(e) => setId(e.target.value)}
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
      <SignupText onClick={() => navigate("/join/category")}>회원가입</SignupText>
    </LoginWrapper>
  );
}
