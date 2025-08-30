// 회워가입 개인, 기업, 채용컨설턴트 구분 페이지

import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const CategoryWrapper = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
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

// const BtnWrapper = styled.div`
//   display: grid;
//   /* 버튼 크기에 맞춰 3열·2행(삼각형) */
//   grid-template-columns: repeat(3, 100px);
//   grid-template-rows: repeat(2, 100px);
//   gap: 12px 28px;               /* 간격만 조절, margin/padding 불필요 */
//   justify-content: center;      /* 그리드를 가로 중앙 */
//   align-content: center;        /* 그리드를 세로 중앙 */

//   /* 1: 개인(좌상), 2: 기업(우상), 3: 컨설턴트(하단 중앙) */
//   & > button:nth-child(1) { grid-column: 1; grid-row: 1; }
//   & > button:nth-child(2) { grid-column: 3; grid-row: 1; }
//   & > button:nth-child(3) { grid-column: 2; grid-row: 2; }

//   /* 좁은 화면에서는 2열로 자동 재배치 */
//   @media (max-width: 420px) {
//     grid-template-columns: repeat(2, 100px);
//     grid-template-rows: repeat(2, 100px);
//     gap: 12px 16px;

//     & > button:nth-child(1) { grid-column: 1; grid-row: 1; }
//     & > button:nth-child(2) { grid-column: 2; grid-row: 1; }
//     & > button:nth-child(3) { grid-column: 1 / span 2; grid-row: 2; justify-self: center; }
//   }
// `;

/** 원형 버튼 */
const CircleBtn = styled.button`
    width: 100px;
    height: 100px;
    border-radius: 9999px;
    border: none;
    background: linear-gradient(180deg, #dbdbdb 0%, #bfbfbf 100%);

    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 0 0 16px 0;

    color: #111;
    font-family: "Pretendard-SemiBold";
    font-size: 15px;

    cursor: pointer;
`;


const JoinCategory = () => {
    const navigate = useNavigate();

    const role = [
        { role: "user", label: "개인" },
        { role: "owner", label: "기업" },
        { role: "consultant", label: "컨설턴트" },
    ];

    const handleNext = (role) => navigate(`/join/${role}/info`);

    return (
        <CategoryWrapper>
            <BtnWrapper>
                {role.map(({ role, label }) => (
                    <CircleBtn
                        key={role}
                        type="button"
                        onClick={() => handleNext(role)}
                    >
                        {label}
                    </CircleBtn>
                ))}
            </BtnWrapper>
        </CategoryWrapper>
    );
};

export default JoinCategory;

