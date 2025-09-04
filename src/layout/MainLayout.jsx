// 로그인 후 메인 레이아웃입니다.

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import HomeHeader from "../components/HomeHeader";
import Footer from "../components/Footer";
import { MainContainer } from "../styles/MainContainer.style";
import useAuthStore from "../stores/authStore";

export default function MainLayout() {

  const { isLoggedIn, logout } = useAuthStore();

  return (
    <OuterWrapper>
      <LayoutWrapper>
        <HomeHeader isLoggedIn={isLoggedIn} onLogout={logout} />
        <MainContainer>
          <Outlet />
        </MainContainer>
        <Footer />
      </LayoutWrapper>
    </OuterWrapper>
  );
}

// --- Styled Components ---

const OuterWrapper = styled.div`
  min-height: 100vh;
  background: #eee;

  display: flex;
  justify-content: center;
  align-items: stretch;
`;

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  background: #FFFFFF;

  width: min(390px, 100%);

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

    @media (min-width: 412px) {
        width: min(412px, 100%);
    }

    @media (min-width: 430px) {
        width: min(430px, 100%);
    }
`;
