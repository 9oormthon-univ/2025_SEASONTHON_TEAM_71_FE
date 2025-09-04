import styled from "styled-components";

export const MainContainer = styled.div`
  height: 100%;
  flex-grow: 1; // 남은 공간 모두 차지
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: center;
  box-sizing: border-box;
  overflow-y: hidden;
`;
