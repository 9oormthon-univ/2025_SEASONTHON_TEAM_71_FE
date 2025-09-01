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
        margin-bottom: 36px;
    }

    h1 {
        font-family: "Pretendard-SemiBold";
        font-size: 24px;
        color: #111111;
    }

    h6 {
        font-family: "Pretendard-Medium";
        font-size: 15px;
        color: #999999;
    }

`

/** 버튼 묶음: 3열 */
const BtnWrapper = styled.div`  
    width: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 11px;
`;

/** 원형 버튼 */
const CircleBtn = styled.button`
    width: 160px;
    height: 160px;
    border-radius: 9999px;
    border: none;
    background: ${({ $id }) =>
        $id === "user"
            ? "#142CA6" // 개인
            : "#5697E1"}; // 기업
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.08);

    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

    cursor: pointer;

    img {
        width: ${({ $id }) => ($id === "user" ? "47px" : "78.22px")};
        height: ${({ $id }) => ($id === "user" ? "56.05px" : "64px")};
        margin-bottom: 12.3px;
    }

    p {
        color: #FFFFFF;
        font-family: "Pretendard-SemiBold";
        font-size: 20px;
    }

`;


const JoinCategory = () => {
    const navigate = useNavigate();

    const handleNext = (id) => navigate(`/join/${id}/info`);

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
                <CircleBtn $id="user" onClick={() => handleNext("user")}>
                    <img src={UserIcon} alt="개인" />
                    <p>개인</p>
                </CircleBtn>
                <CircleBtn $id="owner" onClick={() => handleNext("owner")}>
                    <img src={CompanyIcon} alt="기업" />
                    <p>기업</p>
                </CircleBtn>
            </BtnWrapper>
        </CategoryWrapper>
    );
};

export default JoinCategory;

