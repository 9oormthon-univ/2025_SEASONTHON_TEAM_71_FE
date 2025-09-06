// 홈 화면 입니다.
import styled from "styled-components";
import background from "../assets/img/background.png";
import { useNavigate } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export default function Home() {
  const navigate = useNavigate();
  const { role, isLoggedIn } = useAuthStore();

  return (
    <HomeWrapper>
      <div>
        <h1>갓잡을 통해 </h1>
        <h1>채용 기회를 잡아보세요! </h1>
      </div>
      <div>
        <h2>갓잡은 컨설턴트와 매칭해</h2>
        <h2>취업을 도와주는 서비스입니다.</h2>
      </div>
      <button
        onClick={() => navigate(isLoggedIn ? `/${role}/joblist` : "/join")}
      >
        <p>{isLoggedIn ? "채용공고 바로 구경하기" : "바로 가입하기"}</p>
      </button>
      <h3>갓잡을 통해 285명의 구직자가 회사를 만났어요!</h3>
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
  width: 100%;

  background-image: url(${background});
  background-size: cover; /* 화면에 꽉 차게 */
  background-position: center; /* 중앙 정렬 */
  background-repeat: no-repeat;

  div {
    margin-bottom: 16px;
  }

  h1 {
    color: #ffffff;
    font-size: 32px;
    font-family: "Pretendard-SemiBold";
    text-shadow: 0px 4px 8px #00000040;
  }

  h2 {
    color: #ffffff;
    font-size: 16px;
    font-family: "Pretendard-Regular";
    text-shadow: 0px 4px 8px #00000040;
  }

  button {
    width: 335px;
    height: 56px;
    border: 2px solid #dcffc0;
    border-radius: 50px;
    background-color: #142ca680;
    margin-top: 60px;
    box-shadow: inset 0px 3px 10px #dcffc099;
    filter: drop-shadow(0px 0px 40px rgba(0, 0, 0, 0.25));

    p {
      font-size: 16px;
      font-family: "Pretendard-SemiBold";
      color: #dcffc0;
    }
  }

  h3 {
    color: #dcffc0;
    font-size: 12px;
    font-family: "Pretendard-SemiBold";
    text-shadow: 0px 4px 8px #00000040;
    margin-top: 16px;
  }
`;
