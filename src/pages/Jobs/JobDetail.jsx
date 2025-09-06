// src/pages/JobDetail.jsx
import styled from "styled-components";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuthStore from "../../stores/authStore";
import JobCard from "../../components/JobCard";
import { Button } from "../../components/Button";
import Close from "../../assets/img/closebtn.svg";
import Poster from "../../assets/img/poster.svg";

export default function JobDetail() {
    const navigate = useNavigate();
    const { role } = useParams();
    const { state } = useLocation();
    const job = state?.job;

    const { user } = useAuthStore();
    const userName = user?.name || "사용자";

    const [showOverlay, setShowOverlay] = useState(false);

    const handleApply = () => {
        setShowOverlay(true);
    };

  return (
        <JobDetailWrappper>
            <JobCard
                companyName={job.companyName}
                title={job.title}
                summary={job.summary}
                logoUrl={job.logoUrl}
                variant="default"
            />

            <Description>
                <img src={Poster} />
            </Description>

            <FooterBar>
                <Button 
                    text="지원하기" 
                    type="button" 
                    reverse={true} 
                    onClick={handleApply} 
                />
            </FooterBar>

            {showOverlay && (
                <Overlay>
                    <OverlayBox role="dialog" aria-live="polite" aria-modal="true">
                        <CloseBtn onClick={() => navigate(`/${role}/joblist`)}>
                            <img src={Close} />
                        </CloseBtn>
                        <h1>지원이 완료되었습니다</h1>
                        <h4>{userName} 님의 합격을 기원합니다!</h4>
                    </OverlayBox>
                </Overlay>
            )}
        </JobDetailWrappper>
    );
}


const JobDetailWrappper = styled.div`
    width: clamp(344px, 100%, 420px);
    padding: 20px;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    gap: 20px;
    overflow-y: auto;
`;

const Description = styled.div`
    min-height: 398px;
    border: 1px solid #999999;
    border-radius: 12px;
    display: flex;
    justify-content: center;
    align-items: center;
    img {
        width: 100%;
        height: 100%;
        border-radius: 12px;
        object-fit: cover;
    }
`;

const FooterBar = styled.div`
    margin-top: 20px;
`;

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
`;

const OverlayBox = styled.div`
    position: relative;
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

    h1 {
        font-size: 20px;
        font-family: "Pretendard-SemiBold";
        color: #111;
        margin-bottom: 1px;
    }
    h4 {
        font-size: 14px;
        font-family: "Pretendard-Regular";
        color: #666;
    }
`;

const CloseBtn = styled.button`
    position: absolute;
    top: 14px;
    right: 20px;
    width: 15px;
    height: 15px;
    border: 0;
    background: transparent;
    
    img {
        width: 15px;
        height: 15px;
         cursor: pointer;
    }
`;