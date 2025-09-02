// 홈 화면 입니다.
import styled from "styled-components";

export default function Home() {
  return ( 
    <HomeWrapper>
      <div>갓잡을 통해 </div>
      <div>채용 기회를 잡아보세요! </div>
    </HomeWrapper>
  );
}

const HomeWrapper = styled.div`
  display: flex;
  flex-direction: column;
  text-align: center;
  justify-content: center;
  align-items: center;
  flex: 1;

  div {
    color: #111111;
    font-size: 24px;
    font-family: "Pretendard-SemiBold";
  }
`