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
