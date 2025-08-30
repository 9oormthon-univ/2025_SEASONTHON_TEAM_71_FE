// 회원가입 페이지 헤더

import styled from "styled-components";

export default function JoinHeader({text}) {
    return (
        <JoinHeaderWrapper>
            <JoinHeaderText>
                <p>{text}으로 가입하기</p>
            </JoinHeaderText>
        </JoinHeaderWrapper>
    );
}

const JoinHeaderWrapper = styled.div`
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
    background-color: #D6D6D6;
    border: none;
`
const JoinHeaderText = styled.a`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;

    p {
        font-size: 20px;
        font-family: "Pretendard-SemiBold";
        color: #111111;
    }
`