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
  background: #fff;

  width: min(390px, 100%);
`;
