// 회원가입 페이지 헤더

import styled from "styled-components";
import { useParams } from "react-router-dom";

export default function JoinHeader({text, reverse}) {
    // const { id } = useParams(); // "user" | "owner"

    // const HeaderProps = {
    //     user: { label: "개인", color: "#142CA6" },
    //     owner: { label: "기업", color: "#5697E1" },
    // };

    // const { label, bgcolor } = HeaderProps[id] || { label: "", bgcolor: "#D6D6D6" };

    return (
        <JoinHeaderWrapper reverse={reverse ? 'true' : 'false'}>
            <JoinHeaderText >
                <p>{text}으로 가입하기</p>
            </JoinHeaderText>
        </JoinHeaderWrapper>
    );
}

const JoinHeaderWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 100%;
    
    height: 120px;
    background-color: ${(props) => (props.reverse == 'true' ? '#142CA6' : '#5697E1')};
    border: none;
`
const JoinHeaderText = styled.a`
    margin-left: 40px;

    p {
        font-size: 20px;
        font-family: "Pretendard-SemiBold";
        color: #FFFFFF;
    }
`