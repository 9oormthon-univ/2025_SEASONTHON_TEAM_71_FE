// 회원가입 회원정보입력 레이아웃

import { Outlet } from 'react-router-dom';
import styled from 'styled-components';
import JoinHeader from '../components/JoinHeader';
import Footer from "../components/Footer"
import { MainContainer } from '../styles/MainContainer.style';

export default function JoinLayout() {
  return (
    <>
      <LayoutWrapper>
        <MainContainer>
          <Outlet />
        </MainContainer>
        <Footer />
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