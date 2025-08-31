// 버튼 컴포넌트

import styled from 'styled-components';

const FooterBtn = styled.button`
  width: clamp(280px, 89vw, 335px);
  height: clamp(48px, 13vw, 56px);
  padding: 0;

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  background-color: #142CA6;
  border: none;
  border-radius: 12px;
  
  font-family: 'Pretendard-SemiBold';
  font-size: clamp(14px, 4vw, 16px);
  color: #FFFFFF;
  
  cursor: pointer;
`;

export const Button = ({ text, onClick }) => {
  return (
    <FooterBtn
      onClick={onClick}
    >
      {text}
    </FooterBtn>
  );
};
