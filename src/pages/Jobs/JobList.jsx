// import styled from "styled-components";

// export default function JobList () {
//     <JobListWrapper>

//     </JobListWrapper>
// }

// JobList.jsx — API-ready UI with search filters + infinite scroll
// deps: react, @tanstack/react-query (v5), styled-components, react-icons (optional)
// note: wire the getJobs() fetcher to your backend later; shapes documented below.

import { useEffect, useMemo, useRef, useState } from "react";
import styled from "styled-components";
import { useInfiniteQuery } from "@tanstack/react-query";
import { FiSearch } from "react-icons/fi";
import useAuthStore from "../../stores/authStore"; // adjust path if different

// ------------------------------
// API fetcher (replace the URL with your real endpoint)
// Expected response shape:
// {
//   items: Array<Job>,              // current page of jobs
//   nextCursor: string | null,      // pass to pageParam for next page
//   totalCount?: number             // optional, for analytics
// }
// Where Job minimally contains: {
//   id, title, companyName, companyLogoUrl, postedAt, location,
//   experience, education, employmentType, salary, tags?: string[]
// }
// ------------------------------
async function getJobs({ pageParam, keyword, filters }) {
  const params = new URLSearchParams();
  if (keyword) params.set("q", keyword);
  if (filters?.employmentType) params.set("type", filters.employmentType);
  if (filters?.location) params.set("loc", filters.location);
  if (filters?.career) params.set("career", filters.career);
  if (filters?.sort) params.set("sort", filters.sort);
  if (pageParam) params.set("cursor", pageParam);
  params.set("size", "20"); // server page size

  const res = await fetch(`/api/jobs/search?${params.toString()}`);
  if (!res.ok) throw new Error("Failed to load jobs");
  return res.json();
}

export default function JobList() {
  const { user } = useAuthStore();

  // ------- local filter state -------
  const [keyword, setKeyword] = useState("");
  const [debounced, setDebounced] = useState("");
  const [filters, setFilters] = useState({
    employmentType: "전체",
    location: "전체",
    career: "전체",
    sort: "최신순",
  });

  // Debounce keyword to avoid spamming network calls
  useEffect(() => {
    const t = setTimeout(() => setDebounced(keyword.trim()), 350);
    return () => clearTimeout(t);
  }, [keyword]);

  // Build a stable query key so React Query can cache per filter set
  const queryKey = useMemo(
    () => [
      "jobs",
      {
        q: debounced,
        type: filters.employmentType,
        loc: filters.location,
        career: filters.career,
        sort: filters.sort,
      },
    ],
    [debounced, filters]
  );

  const {
    data,
    isLoading,
    isError,
    error,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage,
    refetch,
  } = useInfiniteQuery({
    queryKey,
    queryFn: ({ pageParam }) =>
      getJobs({ pageParam, keyword: debounced, filters }),
    initialPageParam: null,
    getNextPageParam: (lastPage) => lastPage?.nextCursor ?? null,
  });

  // IntersectionObserver for infinite scroll
  const sentinelRef = useRef(null);
  useEffect(() => {
    if (!sentinelRef.current) return;
    if (!hasNextPage) return; // nothing to observe

    const node = sentinelRef.current;
    const io = new IntersectionObserver(
      (entries) => {
        const first = entries[0];
        if (first.isIntersecting) fetchNextPage();
      },
      { rootMargin: "600px 0px" }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [sentinelRef.current, hasNextPage, fetchNextPage]);

  const flat = data?.pages.flatMap((p) => p.items) ?? [];

  return (
    <Page>
      <Hero>
        <h5>AI가 분석한</h5>
        <h2>
          {user?.name ? <strong>{user.name}</strong> : <strong>사용자</strong>}님에게
          맞는 채용 공고
        </h2>
      </Hero>

      <SearchPanel>
        <SearchRow>
          <Select
            value={filters.employmentType}
            onChange={(e) =>
              setFilters((f) => ({ ...f, employmentType: e.target.value }))
            }
          >
            {[
              "전체",
              "정규직",
              "계약직",
              "인턴",
              "아르바이트",
              "프리랜서",
            ].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>

          <SearchBox>
            <FiSearch aria-hidden />
            <input
              type="text"
              placeholder="키워드를 자유롭게 입력해보세요"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && refetch()}
            />
          </SearchBox>

          <Select
            value={filters.location}
            onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
          >
            {["전체", "서울", "경기", "부산", "대구", "대전", "광주", "인천"].map(
              (v) => (
                <option key={v} value={v}>
                  {v}
                </option>
              )
            )}
          </Select>

          <Select
            value={filters.career}
            onChange={(e) => setFilters((f) => ({ ...f, career: e.target.value }))}
          >
            {["전체", "신입", "1~3년", "4~7년", "8년+"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>

          <Select
            value={filters.sort}
            onChange={(e) => setFilters((f) => ({ ...f, sort: e.target.value }))}
          >
            {["최신순", "마감임박", "연봉높은순"].map((v) => (
              <option key={v} value={v}>
                {v}
              </option>
            ))}
          </Select>
        </SearchRow>
      </SearchPanel>

      {isLoading ? (
        <List>
          {Array.from({ length: 6 }).map((_, i) => (
            <CardSkeleton key={i} />
          ))}
        </List>
      ) : isError ? (
        <ErrorBox>
          <p>불러오기에 실패했어요. 잠시 후 다시 시도해주세요.</p>
          <button onClick={() => refetch()}>다시 시도</button>
        </ErrorBox>
      ) : (
        <>
          <List>
            {flat.map((job) => (
              <JobCard key={job.id} job={job} />
            ))}
          </List>

          {isFetchingNextPage && (
            <List style={{ marginTop: 12 }}>
              {Array.from({ length: 3 }).map((_, i) => (
                <CardSkeleton key={i} />)
              )}
            </List>
          )}

          {/* sentinel for IntersectionObserver */}
          {hasNextPage ? (
            <Sentinel ref={sentinelRef} />
          ) : (
            <End>모든 채용공고를 확인했어요</End>
          )}

          {/* Fallback action */}
          {hasNextPage && (
            <LoadMore onClick={() => fetchNextPage()} disabled={isFetchingNextPage}>
              {isFetchingNextPage ? "불러오는 중..." : "더 보기"}
            </LoadMore>
          )}
        </>
      )}
    </Page>
  );
}

function JobCard({ job }) {
  return (
    <Card>
      <Logo src={job.companyLogoUrl} alt="company logo" />
      <CardBody>
        <Meta>
          <span>{job.companyName}</span>
          <Dot />
          <small>{formatRelative(job.postedAt)}</small>
        </Meta>
        <Title>{job.title}</Title>
        <Sub>
          {[
            job.location,
            job.experience,
            job.education,
            job.employmentType,
            job.salary,
          ]
            .filter(Boolean)
            .join("  |  ")}
        </Sub>
        {job.tags?.length ? (
          <Tags>
            {job.tags.slice(0, 5).map((t) => (
              <li key={t}>#{t}</li>
            ))}
          </Tags>
        ) : null}
      </CardBody>
    </Card>
  );
}

// util: postedAt -> "7일전" 같은 상대 표현 (client-side fallback)
function formatRelative(iso) {
  try {
    const diff = Date.now() - new Date(iso).getTime();
    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (d > 0) return `${d}일 전`;
    const h = Math.floor(diff / (1000 * 60 * 60));
    if (h > 0) return `${h}시간 전`;
    const m = Math.floor(diff / (1000 * 60));
    if (m > 0) return `${m}분 전`;
    return "방금 전";
  } catch {
    return "";
  }
}

// ------------------------------
// styles
// ------------------------------
const Page = styled.div`
  width: 100%;
  max-width: 720px;
  margin: 0 auto;
`;

const Hero = styled.header`
  padding: 16px 16px 20px;
  background: linear-gradient(90deg, #2852ff 0%, #2cd998 100%);
  border-radius: 0 0 16px 16px;
  color: #fff;
  h5 { font-size: 12px; opacity: 0.9; margin: 0; }
  h2 { font-size: 20px; margin: 6px 0 0; }
  strong { font-weight: 800; }
`;

const SearchPanel = styled.section`
  padding: 12px 16px 8px;
  border-bottom: 1px solid #e9e9e9;
`;

const SearchRow = styled.div`
  display: grid;
  grid-template-columns: 120px 1fr 120px 120px 120px;
  gap: 8px;
  @media (max-width: 640px) {
    grid-template-columns: 1fr;
  }
`;

const Select = styled.select`
  height: 40px;
  border: 1px solid #e1e1e1;
  border-radius: 10px;
  padding: 0 12px;
  background: #fff;
`;

const SearchBox = styled.label`
  display: flex; align-items: center; gap: 8px;
  height: 40px; padding: 0 12px;
  border: 1px solid #e1e1e1; border-radius: 10px; background: #fff;
  svg { flex: 0 0 auto; }
  input { border: none; outline: none; width: 100%; font-size: 14px; }
`;

const List = styled.ul`
  list-style: none; margin: 0; padding: 12px 16px; display: grid; gap: 10px;
`;

const Card = styled.li`
  display: grid; grid-template-columns: 56px 1fr; gap: 12px; align-items: center;
  padding: 12px; border: 1px solid #eee; border-radius: 12px; background: #fff;
`;

const Logo = styled.img`
  width: 56px; height: 56px; object-fit: cover; border-radius: 12px;
  background: #f5f6f7;
`;

const CardBody = styled.div``;

const Meta = styled.div`
  display: flex; align-items: center; gap: 8px; color: #666; font-size: 12px;
  span { font-weight: 600; color: #444; }
`;
const Dot = styled.i`
  width: 3px; height: 3px; background: #bbb; border-radius: 50%; display: inline-block;
`;
const Title = styled.h3`
  margin: 6px 0 4px; font-size: 16px; color: #111;
`;
const Sub = styled.p`
  margin: 0; color: #6b6b6b; font-size: 12px; line-height: 1.4;
`;
const Tags = styled.ul`
  margin: 8px 0 0; padding: 0; list-style: none; display: flex; gap: 6px; flex-wrap: wrap;
  li { background: #f3f6ff; color: #3b5bdb; font-size: 11px; padding: 4px 8px; border-radius: 999px; }
`;

const CardSkeleton = styled.li`
  height: 84px; border-radius: 12px; background: linear-gradient(90deg, #f2f2f2, #ececec, #f2f2f2);
  animation: shimmer 1.2s infinite;
  @keyframes shimmer { 0% { background-position: -200px 0; } 100% { background-position: calc(200px + 100%) 0; } }
  background-size: 200px 100%; border: 1px solid #eee;
`;

const ErrorBox = styled.div`
  padding: 24px 16px; display: grid; gap: 8px; text-align: center;
  button { height: 40px; border-radius: 10px; border: 1px solid #ddd; background: #fff; }
`;

const Sentinel = styled.div`
  height: 1px;
`;
const End = styled.p`
  text-align: center; color: #777; font-size: 12px; padding: 12px 0;
`;
const LoadMore = styled.button`
  display: block; margin: 0 auto 24px; padding: 10px 14px; border-radius: 10px; border: 1px solid #ddd; background: #fff;
`;
