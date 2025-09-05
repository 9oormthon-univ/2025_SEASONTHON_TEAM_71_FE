import styled from "styled-components";
import { Button } from "../../components/Button";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";

export default function MatchingMain () {
    const navigate = useNavigate();
    const { role: roleParam } = useParams();

    const [loading, setLoading] = useState(false);
    const { role: storeRole, setRole } = useAuthStore();

    const role =
        roleParam === "company" || roleParam === "personal"
            ? roleParam
            : storeRole || "personal";

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

            <Button
                text="AI매칭하러 가기"
                onClick={goMatching}
                reverse={true}
            />

            {loading && (
                <Overlay>
                    <OverlayBox>
                        <p>취업 컨설턴트를</p>
                        <p>매칭 중입니다 ...</p>
                    </OverlayBox>
                </Overlay>
            )}
        </MatchingMainWrapper>
    )
}

const MatchingMainWrapper = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const Body = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin-bottom: 340px;

    div {
        font-size: 24px;
        font-family: "Pretendard-SemiBold";
        color: #111111;
    }
`

// 오버레이 전체 영역
const Overlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background: #8D8D8D80;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
`

// 중앙 박스
const OverlayBox = styled.div`
    width: 247px;
    height: 121px;
    background: #FFFFFF;
    padding: 20px 30px;
    border-radius: 12px;
    box-shadow: 0px 4px 10px rgba(0,0,0,0.8);
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
`