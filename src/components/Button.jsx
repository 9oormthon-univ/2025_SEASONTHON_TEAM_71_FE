// 버튼 컴포넌트

import styled from 'styled-components';

const FooterBtn = styled.button`
  display: flex;
  width: 100%;
  height: clamp(48px, 6vw, 56px);
  text-align: center;
  align-items: center;
  justify-content: center;
  font-family: 'Pretendard-SemiBold';
  font-size: clamp(14px, 2vw, 18px);
  color: #FFFFFF;
  background-color: #111111;
  border: none;
  border-radius: 12px;
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
