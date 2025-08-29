// 로그인 후 메인 레이아웃입니다.

import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import HomeHeader from '../components/HomeHeader';
import Bottom from "../components/Bottom"
import { MainContainer } from '../styles/MainContainer.style';

export default function MainLayout() {
  return (
    <>
      <LayoutWrapper>
        <HomeHeader />
        <MainContainer>
          <Outlet />
        </MainContainer>
        <Bottom />
      </LayoutWrapper>
    </>
  );
}

// --- Styled Components ---

const LayoutWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: 100vh;
`;