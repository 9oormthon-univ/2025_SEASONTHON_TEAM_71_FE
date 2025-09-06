import styled from "styled-components";
import { useState, useMemo } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import useAuthStore from "../../stores/authStore";

import { Button } from "../../components/Button";
import JobCard from "../../components/JobCard";
import { listJobs, parseJobsPayload } from "../../api/jobs"; // ✅ 추가

import ex1 from "../../assets/img/ex1.svg";
import ex2 from "../../assets/img/ex2.svg";
import readingglasses from "../../assets/img/readingglasses.svg";

export default function JobList({ onSearch }) {
  const navigate = useNavigate();
  const { role: roleFromUrl } = useParams();

  const storeRole = useAuthStore((s) => s.role);
  const role = roleFromUrl || storeRole;
  const isOwner = role === "owner";

  const { user } = useAuthStore();
  const userName = user?.name || "사용자";

  const [scope, setScope] = useState("all");
  const [keyword, setKeyword] = useState("");
  const [skill, setSkill] = useState("");
  const [region, setRegion] = useState("");
  const [detail, setDetail] = useState("");

  // 검색 파라미터 & 페이지 상태
  const [page, setPage] = useState(0);
  const size = 10;
  const [filters, setFilters] = useState({
    q: undefined,
    location: undefined,
    employmentType: undefined,
    status: undefined,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const mergedKeyword = [keyword, skill].filter(Boolean).join(" ").trim();

    setPage(0);
    setFilters({
      q: mergedKeyword || undefined,
      location: region || undefined,
      employmentType: detail || undefined,
      status: undefined,
    });

    onSearch?.({ scope, keyword: mergedKeyword, skill, region, detail });
  };

  // 데이터 패칭 (React Query)
  const { data, isLoading, isError } = useQuery({
    queryKey: ["jobs", { ...filters, page, size }],
    queryFn: async () => {
      const res = await listJobs({ ...filters, page, size });
      console.log("[/api/jobs] raw response:", res); // 디버깅
      return parseJobsPayload(res); // ✅ 통일된 형태로 파싱
    },
    staleTime: 60_000,
    keepPreviousData: true,
  });

  // ✅ 파싱된 데이터 사용
  const serverContent = data?.content || [];
  const totalPages = data?.totalPages ?? 1;

  // (기업 전용) 데모 – 그대로 유지
  const myJobs = useMemo(
    () => [
      {
        id: "mj1",
        companyName: "goormthon",
        title: "프론트엔드 인턴",
        summary: "체험형 | ~ 09.30 | React, TS",
        logoUrl: ex1,
      },
      {
        id: "mj2",
        companyName: "Figma",
        title: "UI Engineer",
        summary: "정규직 | 상시 | React, Design System",
        logoUrl: ex2,
      },
    ],
    []
  );

  // 서버 응답 → JobCard용 맵핑 (필드 방어적으로 처리)
  const jobs = serverContent.map((it) => {
    const summaryParts = [
      it.employmentType || it.type,
      it.deadline ? `~ ${it.deadline}` : "",
      it.location,
    ].filter(Boolean);

    return {
      id: String(it.id ?? it.jobId ?? crypto.randomUUID()),
      companyName: it.companyName || it.company?.name || "기업",
      title: it.title || it.jobTitle || "채용공고",
      summary: summaryParts.join(" | ") || (it.description ? String(it.description).slice(0, 60) : ""),
      logoUrl: ex1,
      _raw: it,
    };
  });

  const goDetail = (job) => {
    navigate(`/${role}/jobdetail/${job.id}`, { state: { job } });
  };

  return (
    <JobListWrapper>
      {isOwner ? (
        <OwnerJobListHeader>
          <Title>
            <p>나의 채용공고</p>
          </Title>

          <MyLists>
            {myJobs.map((j) => (
              <JobCard
                key={j.id}
                companyName={j.companyName}
                title={j.title}
                summary={j.summary}
                logoUrl={j.logoUrl}
                onClick={() => goDetail(j)}
              />
            ))}
          </MyLists>

          <BtnWrapper>
            <Button
              type="button"
              text="공고 등록하기"
              reverse={false}
              onClick={() => console.log("공고 등록하기 클릭")}
            />
          </BtnWrapper>
        </OwnerJobListHeader>
      ) : (
        <UserJobListHeader>
          <UserHeaderTitleWrapper>
            <UserHeaderTitle>
              <h4>AI가 분석한</h4>
              <h1>{userName} 님에게 맞는 채용 공고</h1>
            </UserHeaderTitle>
          </UserHeaderTitleWrapper>

          <UserAIRecom>
            <JobCard
              companyName="기업이름"
              title="직무명직무명"
              summary="체험형 | 채용기간 | 요구역량및스킬키워드요약요구역량"
              logoUrl={ex1}
              onClick={goDetail}
            />
            <JobCard
              companyName="기업이름"
              title="직무명직무명"
              summary="체험형 | 채용기간 | 요구역량및스킬키워드요약요구역량"
              logoUrl={ex2}
              onClick={goDetail}
            />
          </UserAIRecom>
        </UserJobListHeader>
      )}

      <DivideLine />

      <BodyWrapper>
        <Title>
          <p>채용공고 검색</p>
        </Title>

        <ToolBar>
          <SearchBar onSubmit={handleSubmit}>
            <ScopeSelect value={scope} onChange={(e) => setScope(e.target.value)}>
              <option value="all">통합검색</option>
            </ScopeSelect>
            <Divider />
            <KeywordInput
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="키워드를 자유롭게 입력해보세요"
            />
            <SearchBtn type="submit" aria-label="검색">
              <img src={readingglasses} />
            </SearchBtn>
          </SearchBar>

          <FilterRow>
            <FilterSelect value={skill} onChange={(e) => setSkill(e.target.value)}>
              <option value="">직무/스킬</option>
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="data">데이터</option>
              <option value="design">디자인</option>
              <option value="react">React</option>
              <option value="spring">Spring</option>
              <option value="python">Python</option>
            </FilterSelect>

            <FilterSelect value={region} onChange={(e) => setRegion(e.target.value)}>
              <option value="">지역</option>
              <option value="seoul">서울</option>
              <option value="gyeonggi">경기</option>
              <option value="incheon">인천</option>
              <option value="busan">부산</option>
              <option value="remote">원격(재택)</option>
            </FilterSelect>

            <FilterSelect value={detail} onChange={(e) => setDetail(e.target.value)}>
              <option value="">상세검색</option>
              <option value="intern">인턴/체험형</option>
              <option value="fulltime">정규직</option>
              <option value="contract">계약직</option>
              <option value="new">신입</option>
              <option value="junior">주니어(1~3년)</option>
            </FilterSelect>
          </FilterRow>
        </ToolBar>

        {/* 결과 리스트 */}
        {isLoading && <p style={{ padding: 16 }}>불러오는 중...</p>}
        {isError && (
          <p style={{ padding: 16, color: "crimson" }}>
            목록을 불러오는 중 오류가 발생했어요.
            <br />
            검색어/필터를 비우고 다시 시도해 보세요.
          </p>
        )}

        <Lists>
          {!isLoading && !isError && jobs.length === 0 && (
            <p style={{ padding: 16 }}>검색 결과가 없어요.</p>
          )}
          {jobs.map((job) => (
            <JobCard
              key={job.id}
              companyName={job.companyName}
              title={job.title}
              summary={job.summary}
              logoUrl={job.logoUrl}
              onClick={() => goDetail(job)}
              variant="default"
            />
          ))}
        </Lists>

        {/* 페이지네이션 */}
        <div
          style={{
            display: "flex",
            gap: 8,
            justifyContent: "center",
            padding: "12px 0 24px",
          }}
        >
        </div>
      </BodyWrapper>
    </JobListWrapper>
  );
}


const JobListWrapper = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: center; 
    overflow-y: auto;
`

const OwnerJobListHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
    gap: 8px;
`

const MyLists = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 0;
    gap: 12px;
    margin-bottom: 20px;
    overflow-y: auto;
`
const BtnWrapper = styled.div`
    width: 100%;
    margin-bottom: 4px;
`

const UserJobListHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    box-sizing: border-box;
`
const UserHeaderTitleWrapper = styled.div`
    width: 100%;
    height: 104px;
    background: linear-gradient(90deg, #1428C0 0%, #5697E1 50%, #DCFFC0 100%);
`
const UserHeaderTitle = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    padding: 24px 0 24px 20px;

    h4 {
        font-size: 16px;
        font-family: "Pretendard-Regular";
        color: #FFFFFF;
        line-height: 140%;
    }

    h1 {
        font-size: 20px;
        font-family: "Pretendard-SemiBold";
        color: #FFFFFF;
        line-height: 140%;
    }
`
const UserAIRecom = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    border: none;
    background-color: #F5F5F6;
    gap: 12px;
    padding: 20px;
    box-sizing: border-box;
`
const DivideLine = styled.div`
    width: 100%;
    border-top: 1px solid #D9D9D9;
`

const BodyWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    box-sizing: border-box;
`
const Title = styled.div`
    width: 100%;

    p {
        font-size: 20px;
        font-family: "Pretendard-Medium";
        color: #111111;
    }
`
const ToolBar = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 4px;
    margin-top: 8px;
`;
/* 상단 검색바 */
const SearchBar = styled.form`
    background: transparent;
    width: 100%;
    height: 40px;
    display: flex;
    flex-direction: row;
    align-items: center;
    line-height: 140%;
    gap: 8px;

    border: 1px solid #999999;
    border-radius: 8px;

    padding: 0; 
    box-sizing: border-box;

    overflow: hidden;
`;
const arrowSvg = encodeURIComponent(
    `<svg xmlns='http://www.w3.org/2000/svg' 
        viewBox='0 0 24 24' fill='none' stroke='#111111' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'>
        <path d='M6 9l6 6 6-6'/>
    </svg>`
);
const arrowBg = `url("data:image/svg+xml;utf8,${arrowSvg}")`;

const ScopeSelect = styled.select`
    height: 40px;
    flex: 0 0 85px;        /* ✅ 핵심 */
    min-width: 85px;       /* 여유 */
    padding: 0 12px 0 12px; /* 아이콘 공간 */
    /* display: flex;
    padding: 0 12px; */
    border: 0;
    outline: none;
    font-size: 10px;
    color: #111111;

    /* appearance: none; */
    /* background-image:
        linear-gradient(45deg, transparent 50%, #444 50%),
        linear-gradient(135deg, #444 50%, transparent 50%);
    background-position: calc(100% - 16px) 50%, calc(100% - 11px) 50%;
    background-size: 6px 6px, 6px 6px;
    background-repeat: no-repeat; */

    /* 기본 화살표 제거 후 커스텀 삽입 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-image: ${arrowBg};
    background-repeat: no-repeat;
    background-size: 12px;
    background-position: right 0px center;
`;
const Divider = styled.div`
    width: 1px;
    height: 40px;
    background: #999999;
    align-self: stretch;  
`;
const KeywordInput = styled.input` 
    flex: 1 1 auto; 
    min-width: 0;    
    border: 0;
    outline: none;
    padding: 0 0 0 4px;

    &::placeholder { 
        font-size: 10px;
        font-family: "Pretendard-Regular";
        color: #666666; 
        text-align: left;
        }
`;
const SearchBtn = styled.button`
    flex: 0 0 40px; 
    /* display: flex;
    justify-content: center;
    align-items: center; */
    display: grid;
    place-items: center;
    height: 40px;
    width: 40px;
    border: none;
    cursor: pointer;
    background: transparent;
    margin-left: 32px;
    
    img {
        height: 13px;
        width: 12.91px;
    }
`;


/* 하단 필터 3개 */
const FilterRow = styled.div`
  /* display: grid;
  grid-template-columns: 1fr 1fr 1fr;   3등분 */
  display: flex;
  flex-direction: row;
  gap: 6px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr 1fr;     /* 좁으면 2열 */
  }
`;
const FilterSelect = styled.select`
    width: 108px;
    height: 40px;
    padding: 0 13px;
    box-sizing: border-box;
    border: 1px solid #999999;
    outline: none;
    border-radius: 8px;
    background: transparent;
    font-size: 10px;
    color: #111111;

    /* appearance: none;
    background-image:
        linear-gradient(45deg, transparent 50%, #444 50%),
        linear-gradient(135deg, #444 50%, transparent 50%);
    background-position: calc(100% - 16px) 50%, calc(100% - 11px) 50%;
    background-size: 6px 6px, 6px 6px;
    background-repeat: no-repeat; */

    /* 기본 화살표 제거 + 커스텀 삽입 */
    appearance: none;
    -webkit-appearance: none;
    -moz-appearance: none;

    background-image: ${arrowBg};
    background-repeat: no-repeat;
    background-size: 12px;
    background-position: right 8px center;    
`;

const Lists = styled.div`
    width: 100%;
    height: auto;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    padding: 12px 0;
    gap: 12px;
`