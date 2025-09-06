// 회워가입 개인, 기업, 채용컨설턴트 구분 페이지

import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import UserIcon from "../../assets/img/Icon_user.svg";
import CompanyIcon from "../../assets/img/Icon_company.svg";

const CategoryWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;

    div {
        width: 100%;
        text-align: center;
        margin-bottom: clamp(20px, 8vw, 36px);
    }

    h1 {
        font-family: "Pretendard-SemiBold";
        font-size: clamp(18px, 5.5vw, 24px);
        color: #111111;
    }

    h6 {
        font-family: "Pretendard-Medium";
        font-size: clamp(12px, 3.5vw, 15px);
        color: #999999;
    }

`

/** 버튼 묶음: 3열 */
const BtnWrapper = styled.div`  
    width: 100%;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: clamp(8px, 3vw, 16px);
`;

/** 원형 버튼 */
const CircleBtn = styled.button`
    width: clamp(100px, 40vw, 160px);
    height: clamp(100px, 40vw, 160px);
    border-radius: 50%;
    border: none;
    background: ${({ $role }) =>
        $role === "personal"
            ? "#142CA6" // 개인
            : "#5697E1"}; // 기업
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    img {
        width: ${({ $role }) =>
            $role === "personal"
                ? "clamp(30px, 15vw, 47px)"
                : "clamp(50px, 15vw, 78.22px)"};
        height: ${({ $role }) =>
            $role === "personal"
                ? "clamp(36px, 12vw, 56.05px)"
                : "clamp(40px, 12vw, 64px)"};
        margin-bottom: clamp(8px, 3vw, 12.3px);
  }

    p {
        color: #FFFFFF;
        font-family: "Pretendard-SemiBold";
        font-size: 20px;
        font-size: clamp(14px, 5vw, 20px);
    }

`;


const JoinCategory = () => {
    const navigate = useNavigate();

    const handleNext = (role) => navigate(`/join/${role}/info`);

    return (
        <CategoryWrapper>
            <div>
                <h1>가입방식선택</h1>
                <h6>회원님의 상태를 선택해주세요</h6>
            </div>
            {/* <BtnWrapper>
                {["user", "owner"].map((id) => (
                    <CircleBtn
                        key={id}
                        type="button"
                        onClick={() => handleNext(id)}
                    >
                        <p>{id == "user" ? "개인" : "기업"}</p>
                    </CircleBtn>
                ))}
            </BtnWrapper> */}

            <BtnWrapper>
                <CircleBtn $role="personal" onClick={() => handleNext("personal")}>
                    <img src={UserIcon} alt="개인" />
                    <p>개인</p>
                </CircleBtn>
                <CircleBtn $role="company" onClick={() => handleNext("company")}>
                    <img src={CompanyIcon} alt="기업" />
                    <p>기업</p>
                </CircleBtn>
            </BtnWrapper>
        </CategoryWrapper>
    );
};

export default JoinCategory;

