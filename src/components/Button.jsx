// 버튼 컴포넌트

import styled from "styled-components";

const FooterBtn = styled.button`
  width: 100%;
  height: clamp(48px, 13vw, 56px);
  padding: 0;

  display: flex;
  text-align: center;
  align-items: center;
  justify-content: center;

  background-color: ${(props) => {
    if (props.cancel === "true") return "#d6d6d6";
    return props.reverse == "true" ? "#142CA6" : "#5697E1";
  }};
  border: none;
  border-radius: 12px;

  font-family: "Pretendard-SemiBold";
  font-size: clamp(14px, 4vw, 16px);
  color: ${(props) => (props.cancel === "true" ? "#666666" : "#FFFFFF")};

  cursor: pointer;
`;

export const Button = ({
  text,
  onClick,
  reverse,
  cancel,
  type = "button",
  ...props
}) => {
  return (
    <FooterBtn
      type={type}
      onClick={onClick}
      reverse={reverse ? "true" : "false"}
      cancel={cancel ? "true" : "false"}
    >
      {text}
    </FooterBtn>
  );
};
