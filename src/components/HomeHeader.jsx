// 로그인 후 페이지들 공통 헤더

// HomeHeader.jsx
import styled from "styled-components";
import MainLogo from "../assets/img/main_logo.svg";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAuthStore from "../stores/authStore";

export default function HomeHeader() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { role: roleParam } = useParams();

  const isLoggedIn = useAuthStore(s => s.isLoggedIn);
  const logout     = useAuthStore(s => s.logout);
  const storeRole  = useAuthStore(s => s.role);
  const setRole    = useAuthStore(s => s.setRole);

  const role = (roleParam === "owner" || roleParam === "user") ? roleParam : storeRole;
  if (role !== storeRole) setRole(role);

  const go = (to) => navigate(`/${role}${to}`, { replace: false });
  const isJobs = pathname.startsWith(`/${role}/jobs`);
  // const isMatch = pathname.startsWith(`/${role}/ai-matching`);
  const isMatch = new RegExp(`^/${role}/ai-matching(?:$|/|-)`).test(pathname);

  return (
    <HomeHeaderWrapper>
      <ContentWrapper>
        <img src={MainLogo} alt="메인 로고" onClick={() => go("/")} />
        <ContentText>
          <Menu>
            <MenuItem
              className={isJobs ? "active" : ""}
              onClick={() => go("/jobs")}
              aria-current={isJobs ? "page" : undefined}
            >
              채용공고
            </MenuItem>

            <MenuItem
              className={isMatch ? "active" : ""}
              onClick={() => go("/ai-matching")}
              aria-current={isMatch ? "page" : undefined}
            >
              컨설턴트 AI매칭
            </MenuItem>
          </Menu>

          <LoginState>
            {isLoggedIn ? (
              <>
                <button type="button" onClick={logout}>로그아웃</button>
                <RoleBadge>{role === "owner" ? "기업" : "개인"}</RoleBadge>
              </>
            ) : (
              <>
                <button type="button" onClick={() => navigate("/login")}>로그인</button>
                <RoleBadge>{role === "owner" ? "기업" : "개인"}</RoleBadge>
              </>
            )}
          </LoginState>
        </ContentText>
      </ContentWrapper>
    </HomeHeaderWrapper>
  );
}

/* ----- styles ----- */

const HomeHeaderWrapper = styled.header`
  display: flex;
  justify-content: center;
  width: 100%;
  height: clamp(48px, 14vw, 56px);
  border: none;
`;

const ContentWrapper = styled.div`
  width: clamp(344px, 100%, 1024px);
  display: flex;
  align-items: center;
  gap: clamp(8px, 2vw, 16px);
  padding: 0 clamp(8px, 3vw, 12px);

  img {
    width: clamp(28px, 9vw, 40px);
    height: clamp(28px, 9vw, 40px);
    cursor: pointer;
  }
`;

const ContentText = styled.nav`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const Menu = styled.div`
  display: flex;
  align-items: center;
  gap: clamp(12px, 4vw, 20px);
  margin-left: clamp(0px, 1vw, 6px);
  flex-wrap: wrap;
`;

const MenuItem = styled.button`
  position: relative;
  background: none;
  border: 0;
  padding: clamp(4px, 1vw, 8px) clamp(2px, 1vw, 4px);
  font-size: clamp(10px, 3vw, 12px);
  font-family: "Pretendard-Medium";
  color: #111111;
  cursor: pointer;

  /* 언더바 애니메이션 */
  &::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: -2px;
    height: 2px;
    width: 100%;
    transform: scaleX(0);
    transform-origin: left center;
    transition: transform 250ms ease;
    background: #142CA6;
    border-radius: 1px;
  }

  &:hover::after { transform: scaleX(0.5); }
  &.active::after { transform: scaleX(1); }
`;

const LoginState = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;

  button {
    background: none;
    border: 0;
    padding: clamp(4px, 1vw, 8px) clamp(2px, 1vw, 4px);
    font-size: clamp(10px, 3vw, 12px);
    font-family: "Pretendard-Medium";
    color: #111111;
    cursor: pointer;
  }
`;

const RoleBadge = styled.span`
  font-size: clamp(10px, 3vw, 12px);
  font-family: "Pretendard-Medium";
  color: #142CA6;
`;
