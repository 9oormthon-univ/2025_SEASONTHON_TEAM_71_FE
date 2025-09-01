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

    /* 기본: Galaxy Z Fold 5 (344px) */
    width: min(344px, 100%);

    /* Android 대표값 (360px) 이상 */
    @media (min-width: 360px) {
       width: min(360px, 100%);
    }

    /* iPhone SE/6/7/8, X/11 Pro 등 (375px) 이상 */
    @media (min-width: 375px) {
        width: min(375px, 100%);
    }

    /* iPhone 12/13/14 (390px) 이상 */
    @media (min-width: 390px) {
        width: min(390px, 100%);
    }
    
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