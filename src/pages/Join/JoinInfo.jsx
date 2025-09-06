// 회원가입 회원정보입력 페이지
import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import { Button } from "../../components/Button";
import JoinHeader from "../../components/JoinHeader";
import useSignup from "../../api/signup.js";
import { useNavigate } from "react-router-dom";

export default function JoinInfo() {
  const navigate = useNavigate();
  const { role } = useParams();
  const isOwner = role === "company"; // 기업이면 true
  const roleText = isOwner ? "기업" : "개인"; // UI 표기용
  const reverse = !isOwner;

  // 공통 상태
  const [ID, setUserID] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [name, setName] = useState("");

  // 개인용 상태
  const [email, setEmail] = useState(""); // 이메일
  const [phone, setPhone] = useState(""); // 휴대폰 번호
  const [jobInterest, setJobInterest] = useState(""); // 관심 직무
  const [skills, setSkills] = useState(""); // 보유 역량
  const [intro, setIntro] = useState(""); // 간단 자기소개
  const [resume, setResume] = useState(null); // 이력서 첨부

  // 기업용 상태
  const [organization, setOrganization] = useState(""); // 소속기관

  // 회원가입 api 커스텀 훅 사용
  const { signup, isLoading, error } = useSignup();

  const handleSignup = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      alert("비밀번호가 일치하지 않습니다.");
      return;
    }

    // 페이로드를 역할에 맞게 구성
    // const payload = isRole
    //   ? {
    //       role: "owner",
    //       ID,
    //       password,
    //       name,
    //       organization,
    //     }
    //   : {
    //       role: "user",
    //       ID,
    //       password,
    //       name,
    //       email,
    //       phone,
    //       jobInterest,
    //       skills,
    //       intro,
    //       resume,
    //     };

    // 기본 payload
    const payload = {
      username: ID,
      password,
      email: isOwner ? null : email,
      realName: name,
      phone: isOwner ? null : phone,
      role: isOwner ? "COMPANY" : "PERSONAL",
    };

    try {
      const response = await signup(payload);
      console.log("회원가입 성공:", response);

      if (response) {
        navigate("/login");
      } else {
        alert(response?.message ?? "알 수 없는 오류");
      }
    } catch (err) {
      console.error("signup error:", err?.response?.data || err);
      const errorMessage =
        err.readableMessage ||
        err.response?.data?.message ||
        err.response?.data?.data ||
        "네트워크 오류가 발생했습니다. 잠시 후 다시 시도해주세요.";
      alert(`회원가입 실패: ${errorMessage}`);
    }
  };

  return (
    <>
      {/* 헤더 텍스트도 역할에 맞게 */}
      <JoinHeader text={roleText} reverse={reverse} />

      <JoinWrapper>
        <Title>
          <h1>회원정보입력</h1>
          <h6>회원님의 정보를 입력해주세요</h6>
        </Title>

        <InputWrapper>
          <Form onSubmit={handleSignup}>
            {/* 공통: 아이디/비밀번호 */}
            <InputBlock>
              <InputTitle>
                <Req>*</Req>아이디
              </InputTitle>
              <input
                type="text"
                name="ID"
                value={ID}
                onChange={(e) => setUserID(e.target.value)}
                autoComplete="username"
                required
              />
            </InputBlock>

            <InputBlock>
              <InputTitle>
                <Req>*</Req>비밀번호
              </InputTitle>
              <input
                type="password"
                name="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="new-password"
                required
              />
            </InputBlock>

            <InputBlock>
              <InputTitle>
                <Req>*</Req>비밀번호 확인
              </InputTitle>
              <input
                type="password"
                name="passwordConfirm"
                value={passwordConfirm}
                onChange={(e) => setPasswordConfirm(e.target.value)}
                autoComplete="new-password"
                required
              />
            </InputBlock>

            <DivideLine />

            {/* 공통: 이름 */}
            <InputBlock>
              <InputTitle>
                <Req>*</Req>이름
              </InputTitle>
              <input
                type="text"
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </InputBlock>

            {/* 역할별 분기 */}
            {isOwner ? (
              // 기업(OWNER): 소속기관만 추가
              <InputBlock>
                <InputTitle>
                  <Req>*</Req>소속기관
                </InputTitle>
                <input
                  type="text"
                  name="organization"
                  value={organization}
                  onChange={(e) => setOrganization(e.target.value)}
                  required
                />
              </InputBlock>
            ) : (
              // 개인(USER): 상세 필드들
              <>
                <InputBlock>
                  <InputTitle>
                    <Req>*</Req>이메일
                  </InputTitle>
                  <input
                    type="email"
                    name="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    autoComplete="email"
                    required
                  />
                </InputBlock>

                <InputBlock>
                  <InputTitle>
                    <Req>*</Req>휴대폰 번호
                  </InputTitle>
                  <input
                    type="tel"
                    name="phone"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    autoComplete="tel"
                    required
                  />
                </InputBlock>

                <InputBlock>
                  <InputTitle>
                    <Req>*</Req>관심직무
                  </InputTitle>
                  <input
                    type="text"
                    name="jobInterest"
                    value={jobInterest}
                    onChange={(e) => setJobInterest(e.target.value)}
                    required
                  />
                </InputBlock>

                <InputBlock>
                  <InputTitle>
                    <Req>*</Req>보유 역량
                  </InputTitle>
                  <input
                    type="text"
                    name="skills"
                    value={skills}
                    onChange={(e) => setSkills(e.target.value)}
                    required
                  />
                </InputBlock>

                <InputBlock>
                  <InputTitle>간단한 자기소개</InputTitle>
                  <input
                    name="intro"
                    value={intro}
                    onChange={(e) => setIntro(e.target.value)}
                  />
                </InputBlock>

                <InputBlock>
                  <InputTitle>이력서 첨부</InputTitle>
                  <input
                    type="file"
                    name="resume"
                    accept=".pdf"
                    onChange={(e) => setResume(e.target.files[0])}
                  />
                </InputBlock>
              </>
            )}

            <ButtonRow>
              {/* 버튼 문구도 역할별 */}
              <Button
                text={`${roleText}으로 회원가입`}
                reverse={reverse}
                type="submit"
              />
            </ButtonRow>
          </Form>
        </InputWrapper>
      </JoinWrapper>
    </>
  );
}

const JoinWrapper = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
`;

const Title = styled.div`
  width: 100%;
  text-align: center;
  margin: clamp(16px, 5vw, 24px) 0 clamp(20px, 5vw, 28px) 0;

  h1 {
    font-family: "Pretendard-SemiBold";
    font-size: clamp(16px, 5vw, 20px);
    color: #111111;
  }

  h6 {
    font-family: "Pretendard-Medium";
    font-size: clamp(11px, 3.5vw, 13px);
    color: #999999;
  }
`;

const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: clamp(40px, 17vw, 80px);
`;

const InputBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0 1rem;

  input {
    width: 100%;
    padding: 10px;
    border: 1px solid #999999;
    border-radius: 8px;

    font-size: clamp(13px, 3.5vw, 14px);
    font-family: "Pretendard-Regular";
    box-sizing: border-box;
  }
`;

const Req = styled.span`
  color: #eb0000;
  font-family: "Pretendard-Regular";
`;

const InputTitle = styled.label`
  font-size: clamp(13px, 3.5vw, 14px);
  font-family: "Pretendard-Regular";
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;
  gap: 0.5rem;
`;

const DivideLine = styled.div`
  width: 100%;
  border-top: 1px solid #d9d9d9;
  margin: clamp(20px, 10vw, 40px) 0 clamp(10px, 5vw, 20px);
`;

const ButtonRow = styled.div`
  padding: 0 1rem;
  margin-top: clamp(20px, 10vw, 40px);
`;
