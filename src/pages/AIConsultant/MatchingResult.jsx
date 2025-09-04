import styled from "styled-components"
import { useEffect, useLayoutEffect, useRef, useState, useMemo } from "react";
import { Button } from "../../components/Button"
import { useNavigate } from "react-router-dom"
import consultant1 from "../../assets/img/consultant1.svg";

const MOCK = [
       {
            id: "kim",
            nameKo: "김현아",
            nameEn: "Hyeonah Kim",
            org: "커리어브릿지 컨설팅 그룹",
            avatar: consultant1,
            tags: ["취업전략 수립", "면접 코칭", "대학생/취준생 대상"],
            desc: [
                "한국대학교 경영학과 졸업",
                "네오전자 인사팀 근무 (HRD·채용 8년)",
                "Mercer Korea 컨설팅 (5년)",
                "커리어브릿지 시니어 컨설턴트 (2020~)"
            ]
        },
        {
            id: "You",
            nameKo: "김현아",
            nameEn: "Hyeonah Kim",
            org: "커리어브릿지 컨설팅 그룹",
            avatar: consultant1,
            tags: ["취업전략 수립", "면접 코칭", "대학생/취준생 대상"],
            desc: [
                "한국대학교 경영학과 졸업",
                "네오전자 인사팀 근무 (HRD·채용 8년)",
                "Mercer Korea 컨설팅 (5년)",
                "커리어브릿지 시니어 컨설턴트 (2020~)"
            ]
        },
        {
            id: "hye",
            nameKo: "김현아",
            nameEn: "Hyeonah Kim",
            org: "커리어브릿지 컨설팅 그룹",
            avatar: consultant1,
            tags: ["취업전략 수립", "면접 코칭", "대학생/취준생 대상"],
            desc: [
                "한국대학교 경영학과 졸업",
                "네오전자 인사팀 근무 (HRD·채용 8년)",
                "Mercer Korea 컨설팅 (5년)",
                "커리어브릿지 시니어 컨설턴트 (2020~)"
            ]
        },
    // 필요한 만큼 추가...
    ];

export default function MatchingResult () {

    const navigate = useNavigate();

    const [selected, setSelected] = useState(MOCK[0]?.id);

    const goChatting = () => {
        navigate(`/chatting`);
    }

    return (
        <MatchingResultWrapper>
            <Title>
                <p>매칭 결과</p>
            </Title>
            <Body>
                <Scroller role="list">
                    <Track>
                        {MOCK.map((c) => (
                            <Card
                                role="listitem"
                                key={c.id}
                                $active={selected === c.id}
                                onClick={() =>
                                    setSelected((prev) => (prev === c.id ? null : c.id))
                                }
                                tabIndex={0}
                                onKeyDown={(e) => 
                                    (e.key === "Enter" || e.key === " ") && 
                                    setSelected((prev) => (prev === c.id ? null : c.id))
                                }
                            >
                                <AvatarWrap>
                                    <img src={c.avatar} alt={`${c.nameKo} 사진`} />
                                </AvatarWrap>

                                <Name>
                                    {c.nameKo} <span>({c.nameEn})</span>
                                    <Org>{c.org}</Org>
                                </Name>

                                <TagRow>
                                    {c.tags.map((t) => (
                                        <Tag key={t}>{t}</Tag>
                                    ))}
                                </TagRow>

                                <DividedLine />

                                <Desc>
                                    {c.desc.map((line, i) => (
                                        <li key={i}>{line}</li>
                                    ))}
                                </Desc>
                            </Card>
                        ))}
                    </Track>
                </Scroller>
                <ButtonBar>
                    <Button 
                    text="1:1 문의하기"
                    onClick={goChatting}
                    reverse={true}
                    />
                </ButtonBar>
            </Body>
        </MatchingResultWrapper>
    )
}

const MatchingResultWrapper = styled.div`
    display: flex;
    flex-direction: column;
    /* justify-content: space-between; */
    align-items: center;
    flex: 1;
    width: 100%;
    overflow-x: hidden; /* 페이지 전체 가로 스크롤 방지 */
    background-color: #F5F5F6;
`;

const Title = styled.div`
    width: 100%;
    text-align: center;
    margin: clamp(16px, 7vw, 32px) 0 clamp(4px, 1.2vw, 8px);

    p {
        font-size: 16px;
        font-family: "Pretendard-SemiBold";
        color: #111111;
    }
`

const Scroller = styled.div`
    width: 100%;
    overflow-x: auto;    /* 가로 스크롤은 여기서만 생기도록 */
    overflow-y: hidden;
    -webkit-overflow-scrolling: touch;
    overscroll-behavior-x: contain;

    /* 스크롤바 숨김*/
    -ms-overflow-style: none; 
    scrollbar-width: none;
    &::-webkit-scrollbar { 
        display: none; 
    }
`;

const Body = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: clamp(80px, 19vw, 132px);
`

/* 내용만큼 가로로 넓어지도록 */
const Track = styled.div`
    display: inline-flex;
    gap: 24px;
    padding: 13px 24px 32px 24px;
    /* padding-block: clamp(10px, 3vw, 13px) clamp(16px, 7vw, 32px);
    padding-inline: clamp(13px, 6vw, 48px); */
    min-width: max-content; /* 카드 총합만큼 너비 확보 */
`;

const Card = styled.article`
    flex: 0 0 auto;   /* 줄바꿈 없이 가로로 나열 */
    width: 271px;
    height: 360px;
    background: #FFFFFF;
    border: 4px solid #D9D9D9; /* 기본 보더 */
    border-radius: 24px;
    padding: 31px 0 0 0;
    margin: 0;
    box-shadow: 0 2px 12px rgba(0,0,0,0.08);
    cursor: pointer;
    position: relative;

    ${({ $active }) =>
        $active &&
        `
        border: 4px solid transparent;
        background:
        linear-gradient(#fff, #fff) padding-box,
        linear-gradient(0deg, #1428C0, #5697E1, #DCFFC0) border-box;
        box-shadow: 0 10px 24px rgba(20, 40, 192, 0.18);
    `}

    &:focus-visible {
        box-shadow: 0 0 0 3px rgba(86, 151, 225, 0.35);
    }
`;

const AvatarWrap = styled.div`
    display: grid; 
    place-items: center;

    img {
        width: clamp(88px, 30vw, 130px);
        height: clamp(88px, 30vw, 130px);
        border-radius: 50%;
        object-fit: cover;
    }
`;

const Name = styled.h3`
  margin-top: 8px;
  text-align: center;
  font-size: clamp(14px, 3.8vw, 18px);
  font-family: "Pretendard-SemiBold"; 
  color: #111111;

  span { 
    font-size: clamp(14px, 3.8vw, 18px);
    font-family: "Pretendard-SemiBold"; 
    color: #111111;

    }
`;

const Org = styled.div`
    font-size: clamp(11px, 3.2vw, 13px);
    font-family: "Pretendard-Medium"; 
    color: #111111; 
`;

const TagRow = styled.div`
    display: flex; 
    flex-wrap: wrap;
    justify-content: center;
    gap: 4px;
    margin: clamp(10px, 3vw, 12px) 0;
`;

const Tag = styled.span`
    font-size: clamp(10px, 2.7vw, 12px);
    font-family: "Pretenard-Medium";
    padding: clamp(6px, 1.6vw, 8px) clamp(8px, 2.6vw, 12px);
    border-radius: 100px;
    border: 1px solid #142CA6;
    background-color: #142CA61A;
    color: #111111;
`;

const DividedLine = styled.div`
    width: 99.5%;
    border: 1px solid #D9D9D9;
    margin: 12px 0;
`

const Desc = styled.ul`
    padding-left: clamp(14px, 4vw, 18px);
    color: #444444;
    font-size: clamp(11px, 3vw, 13px);
    font-family: "Pretendard-Regular";
    line-height: 1.4;
    letter-spacing: -2.5%;
    li + li { 
        margin-top: 4px; 
        }
`;

const ButtonBar = styled.div`
    width: 100%;
    padding-inline: clamp(13px, 10vw, 48px);
    box-sizing: border-box; 
`;