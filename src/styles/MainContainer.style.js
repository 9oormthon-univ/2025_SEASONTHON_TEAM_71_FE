import styled from 'styled-components';

export const MainContainer = styled.div`
    width: 100%;
    max-width: 375px;
    flex-grow: 1; // 남은 공간 모두 차지
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center; 
    padding: 1rem;
    box-sizing: border-box;
`;
