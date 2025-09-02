// 회원가입 회원정보입력 레이아웃

import { Outlet } from "react-router-dom";
import styled from "styled-components";
import Footer from "../components/Footer";
import { MainContainer } from "../styles/MainContainer.style";

export default function JoinLayout() {
  return (
    <OuterWrapper>
      <LayoutWrapper>
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
