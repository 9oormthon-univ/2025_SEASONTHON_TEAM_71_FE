import styled from "styled-components";
import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../../stores/authStore";

import { Button } from "../../components/Button";
import JobCard from "../../components/JobCard";
import { myJobs, jobs } from "../../data/jobsData";

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

  const [scope, setScope] = useState("all"); // 통합검색 종류
  const [keyword, setKeyword] = useState("");
  const [skill, setSkill] = useState("");
  const [region, setRegion] = useState("");
  const [detail, setDetail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = { scope, keyword, skill, region, detail };
    onSearch?.(payload);
  };

  const goDetail = (job) => {
    navigate(`/${role}/jobdetail/${job.id}`, { state: { job } });
  };

  return (
    <JobListWrapper>
      {isOwner ? (
        // ====== 기업(OWNER) 전용 섹션 ======
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
        // ====== owner가 아닐 때: Header + AI 추천 섹션 ======
        <UserJobListHeader>
          <UserHeaderTitleWrapper>
            <UserHeaderTitle>
              <h4>AI가 분석한</h4>
              <h1>{userName} 님에게 맞는 채용 공고</h1>
            </UserHeaderTitle>
          </UserHeaderTitleWrapper>

          <UserAIRecom>
            {myJobs.slice(0, 2).map((job) => (
              <JobCard
                key={job.id}
                companyName={job.companyName}
                title={job.title}
                summary={job.summary}
                logoUrl={job.logoUrl}
                onClick={() => goDetail(job)}
              />
            ))}
          </UserAIRecom>
        </UserJobListHeader>
      )}

      <DivideLine />

      <BodyWrapper>
        {/* ====== 공통: 검색 섹션 ====== */}
        <Title>
          <p>채용공고 검색</p>
        </Title>
        <ToolBar>
          {/* 상단: 통합검색 + 키워드 */}
          <SearchBar onSubmit={handleSubmit}>
            <ScopeSelect
              value={scope}
              onChange={(e) => setScope(e.target.value)}
            >
              <option value="all">통합검색</option>
              {/* <option value="company">기업명</option>
                            <option value="title">직무/공고명</option>
                            <option value="tag">태그/스킬</option> */}
            </ScopeSelect>
            <Divider />
            <KeywordInput
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              placeholder="키워드를 자유롭게 입력해보세요"
            />
            <SearchBtn type="submit" aria-label="검색">
              {/* 돋보기 svg */}
              <img src={readingglasses} />
            </SearchBtn>
          </SearchBar>

          {/* 하단: 3가지 드롭다운 필터 */}
          <FilterRow>
            <FilterSelect
              value={skill}
              onChange={(e) => setSkill(e.target.value)}
            >
              <option value="">직무/스킬</option>
              <option value="frontend">프론트엔드</option>
              <option value="backend">백엔드</option>
              <option value="data">데이터</option>
              <option value="design">디자인</option>
              <option value="react">React</option>
              <option value="spring">Spring</option>
              <option value="python">Python</option>
            </FilterSelect>

            <FilterSelect
              value={region}
              onChange={(e) => setRegion(e.target.value)}
            >
              <option value="">지역</option>
              <option value="seoul">서울</option>
              <option value="gyeonggi">경기</option>
              <option value="incheon">인천</option>
              <option value="busan">부산</option>
              <option value="remote">원격(재택)</option>
            </FilterSelect>

            <FilterSelect
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
            >
              <option value="">상세검색</option>
              <option value="intern">인턴/체험형</option>
              <option value="fulltime">정규직</option>
              <option value="contract">계약직</option>
              <option value="new">신입</option>
              <option value="junior">주니어(1~3년)</option>
            </FilterSelect>
          </FilterRow>
        </ToolBar>

        {/* 공통: 결과 리스트 (데모) */}
        <Lists>
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
      </BodyWrapper>
    </JobListWrapper>
  );
}

const JobListWrapper = styled.div`
  width: 100%;
  height: calc(100vh + 290px);
  display: flex;
  flex-direction: column;
  align-items: center;
  overflow-y: auto;
`;

const OwnerJobListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
  gap: 8px;
`;

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
`;
const BtnWrapper = styled.div`
  width: 100%;
  margin-bottom: 4px;
`;

const UserJobListHeader = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  box-sizing: border-box;
`;
const UserHeaderTitleWrapper = styled.div`
  width: 100%;
  height: 104px;
  background: linear-gradient(90deg, #1428c0 0%, #5697e1 50%, #dcffc0 100%);
`;
const UserHeaderTitle = styled.div`
  display: flex;
  flex-direction: column;
  text-align: left;
  padding: 24px 0 24px 20px;

  h4 {
    font-size: 16px;
    font-family: "Pretendard-Regular";
    color: #ffffff;
    line-height: 140%;
  }

  h1 {
    font-size: 20px;
    font-family: "Pretendard-SemiBold";
    color: #ffffff;
    line-height: 140%;
  }
`;
const UserAIRecom = styled.div`
  width: 100%;
  height: 186px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: flex-start;
  border: none;
  background-color: #f5f5f6;
  gap: 12px;
  padding: 20px;
  box-sizing: border-box;
`;
const DivideLine = styled.div`
  width: 100%;
  border-top: 1px solid #d9d9d9;
`;

const BodyWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
`;
const Title = styled.div`
  width: 100%;

  p {
    font-size: 20px;
    font-family: "Pretendard-Medium";
    color: #111111;
  }
`;
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
  flex: 0 0 85px; /* ✅ 핵심 */
  min-width: 85px; /* 여유 */
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
  margin-bottom: 12px;

  @media (max-width: 560px) {
    grid-template-columns: 1fr 1fr; /* 좁으면 2열 */
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
  height: calc(100vh - 290px);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  overflow-y: auto;
`;
