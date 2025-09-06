import styled from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import matchpending from "../../assets/img/matchpending.png";
import pendingbg from "../../assets/img/pendingbg.png";
import pendingshadow from "../../assets/img/pendingshadow.png";

export default function MatchingMain() {
  const navigate = useNavigate();
  const { role: roleParam } = useParams(); // e.g. /:role/...

  const [loading, setLoading] = useState(false);
  const { role: storeRole, setRole } = useAuthStore();

  const role =
    roleParam === "owner" || roleParam === "user"
      ? roleParam
      : storeRole || "user";

  // 스토어와 URL 파라미터 동기화 (렌더 중 setRole 호출 금지 → effect에서)
  useEffect(() => {
    if (role !== storeRole) setRole(role);
  }, [role, storeRole, setRole]);

  // 로딩 시작되면 1.5초 후 이동, 언마운트/취소 시 타이머 정리
  useEffect(() => {
    if (!loading) return;
    const t = setTimeout(() => {
      navigate(`/${role}/ai-matching-result`);
    }, 1500);
    return () => clearTimeout(t);
  }, [loading, navigate, role]);

  const goMatching = () => setLoading(true);

  return (
    <MatchingMainWrapper>
      <Body>
        <div>AI 분석을 통해</div>
        <div>상이 님 역량에 적합한</div>
        <div>취업 컨설턴트를 매칭할 수 있습니다</div>
      </Body>

      <ImageContainer>
        <BackgroundImg src={pendingbg} alt="배경" />
        <PendingImg src={matchpending} alt="매칭 대기 중" />
        <PendingShadowImg src={pendingshadow} alt="그림자" />
      </ImageContainer>

      <Button text="AI매칭하러 가기" onClick={goMatching} reverse={true} />

      {loading && (
        <Overlay>
          <OverlayBox>
            <p>취업 컨설턴트를</p>
            <p>매칭 중입니다 ...</p>
          </OverlayBox>
        </Overlay>
      )}
    </MatchingMainWrapper>
  );
}

const MatchingMainWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Body = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-bottom: 60px;

  div {
    font-size: 24px;
    font-family: "Pretendard-SemiBold";
    color: #111111;
  }
`;

const ImageContainer = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 60px;
`;

const BackgroundImg = styled.img`
  position: absolute;
  width: 277px;
  height: 312px;
  z-index: 1;
`;

const PendingImg = styled.img`
  width: 154px;
  height: 154px;
  position: relative;
  z-index: 3;
  margin-bottom: 40px;
  animation: bounce 2s ease-in-out infinite;

  @keyframes bounce {
    0%,
    100% {
      transform: translateY(0);
    }
    50% {
      transform: translateY(-30px);
    }
  }
`;

const PendingShadowImg = styled.img`
  width: 154px;
  height: 38px;
  position: absolute;
  z-index: 2;
  bottom: 0;
  animation: shadowBounce 2s ease-in-out infinite;

  @keyframes shadowBounce {
    0%,
    100% {
      transform: scale(0.7);
    }
    50% {
      transform: scale(1);
      opacity: 0.7;
    }
  }
`;

// 오버레이 전체 영역
const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background: #8d8d8d80;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
`;

// 중앙 박스
const OverlayBox = styled.div`
  width: 247px;
  height: 121px;
  background: #ffffff;
  padding: 20px 30px;
  border-radius: 12px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.8);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  p {
    text-align: center;
    font-size: 20px;
    font-family: "Pretendard-SemiBold";
    color: #111111;
  }
`;
