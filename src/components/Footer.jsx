// 페이지 맨 아래 개인정보 처리방침 등 안내 컴포넌트
import styled from "styled-components";

export default function Footer() {
    return (
        <FooterWrapper>
            <FooterText>
                <span>커뮤니티</span>
                <span>이용약관</span>
                <span>문의</span>
                <span>개인정보 처리방침</span>
            </FooterText>
        </FooterWrapper>
    );
}

const FooterWrapper = styled.div`
    height: 79px;
    background-color: #F1F3F5;
    box-sizing: border-box;

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
`;
const FooterText = styled.div`
    gap: 24px;
    display: flex;
    flex-direction: row;
    justify-content: center;
    margin-top: 16px;

    span {
        font-size: 12px;
        font-family: "Pretendard-Medium";
        color: #111111;
        cursor: pointer;
    }
`
