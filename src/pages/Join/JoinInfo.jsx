// 회원가입 회원정보입력 페이지

import styled from "styled-components";
import { useState } from "react";
import { useParams } from "react-router-dom";
import {Button} from "../../components/Button";
import JoinHeader from "../../components/JoinHeader";

export default function JoinInfo () {
    const { id } = useParams(); // 'user' or 'owner'

    const [username, setUsername] = useState("");   // 아이디
    const [password, setPassword] = useState("");   // 비밀번호
    const [passwordConfirm, setPasswordConfirm] = useState(""); // 비밀번호 확인
    const [name, setName] = useState("");           // 이름
    const [email, setEmail] = useState("");         // 이메일
    const [phone, setPhone] = useState("");         // 휴대폰 번호
    const [jobInterest, setJobInterest] = useState(""); // 관심 직무
    const [skills, setSkills] = useState("");       // 보유 역량
    const [intro, setIntro] = useState("");         // 자기소개
    const [resume, setResume] = useState(null);     // 이력서 파일

    return (
        <>
        <JoinHeader text="개인" reverse={true}/>

        <JoinWrapper>
            <Title>
               <h1>회원정보입력</h1>
               <h6>회원님의 정보를 입력해주세요</h6>
            </Title>

            <InputWrapper>
                <Form onSubmit={(e) => {
                    e.preventDefault();
                    // TODO: 회원가입 처리 로직 (API 호출 등)
                }}>
                    <InputBlock>
                        <InputTitle>
                            <Req>*</Req>
                            아이디
                        </InputTitle>
                        <input 
                            type="text"
                            name="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            autoComplete="username"
                            required
                        />
                    </InputBlock>

                    <InputBlock>
                        <InputTitle>
                            <Req>*</Req>
                            비밀번호
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
                            <Req>*</Req>
                            비밀번호 확인
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

                    <DivideLine/>

                    <InputBlock>
                        <InputTitle>
                            <Req>*</Req>
                            이름
                        </InputTitle>
                        <input 
                            type="text"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </InputBlock>

                    <InputBlock>
                        <InputTitle>
                            <Req>*</Req>
                            이메일
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
                            <Req>*</Req>
                            휴대폰 번호
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
                            <Req>*</Req>
                            관심직무
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
                            <Req>*</Req>
                            보유 역량
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
                        <InputTitle>
                            <Req></Req> 
                            간단한 자기소개
                        </InputTitle>
                        <input 
                            name="intro"
                            value={intro}
                            onChange={(e) => setIntro(e.target.value)}
                        />
                    </InputBlock>

                    <InputBlock>
                        <InputTitle>
                            <Req></Req>
                            이력서 첨부
                        </InputTitle>
                        <input 
                            type="file"
                            name="resume"
                            accept=".pdf"
                            onChange={(e) => setResume(e.target.files[0])}
                        />
                    </InputBlock>
                    <ButtonRow>
                        <Button text="개인으로 회원가입" reverse={true} type="submit"/>
                    </ButtonRow>
                </Form>
            </InputWrapper>
        </JoinWrapper>
        </>
    )
}

const JoinWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
`
const Title = styled.div`
    width: 100%;
    text-align: center;
    margin-bottom: 28px;
    margin-top: 24px;

    h1 {
        font-family: "Pretendard-SemiBold";
        font-size: 20px;
        color: #111111;
    }

    h6 {
        font-family: "Pretendard-Medium";
        font-size: 13px;
        color: #999999;
    }
`

const InputWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-bottom: 80px;
    /* padding: 0 1rem; */
`;

const InputBlock = styled.div`
    display: flex;
    flex-direction: column;
    gap: 4px;
    padding: 0 1rem;

    input {
        width: 100%;
        padding: 10px;
        border: 1px solid #999999;
        border-radius: 8px;

        font-size: 14px;
        font-family: "Pretendard-Regular";
        box-sizing: border-box;
    }
`;

const Req = styled.span`
  color: #EB0000;
  font-family: "Pretendard-Regular";
`;

const InputTitle = styled.label`
    font-size: 14px;
    font-family: "Pretendard-Regular";
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: flex-start;
    gap: 4px;
`;

const DivideLine = styled.div`
    width: 100%;
    border: 1px solid #D9D9D9;
    margin: 40px 0 20px 0;
`

const ButtonRow = styled.div`
    padding: 0 1rem;
    margin-top: 40px;
`;