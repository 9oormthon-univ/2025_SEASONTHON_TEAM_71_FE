import { Routes, Route, Navigate } from "react-router-dom";
import { useEffect } from "react";
import MainLayout from "./layout/MainLayout";
import JoinLayout from "./layout/JoinLayout";
import ChatLayout from "./layout/ChatLayout";

import Home from "./pages/Home";
import Login from "./pages/Join/Login";
import JoinCategory from "./pages/Join/JoinCategory";
import JoinInfo from "./pages/Join/JoinInfo";
import Chat from "./pages/AIConsultant/Chat";
import JobPost from "./pages/Company/JobPost";

import MatchingMain from "./pages/AIConsultant/MatchingMain";
import MatchingResult from "./pages/AIConsultant/MatchingResult";

import JobList from "./pages/Jobs/JobList";
import JobDetail from "./pages/Jobs/JobDetail";

import useAuthStore from "./stores/authStore";

function App() {
  const { setHydrated } = useAuthStore();

  useEffect(() => {
    // Zustand persist hydration 완료 표시
    setHydrated(true);
  }, [setHydrated]);
  return (
    <Routes>
      {/* JoinLayout 상속받는 그룹*/}
      <Route element={<JoinLayout />}>
        <Route path="/login" element={<Login />} />

        <Route path="/join">
          <Route index element={<Navigate to="category" replace />} />
          <Route path="category" element={<JoinCategory />} />
          <Route path=":role/info" element={<JoinInfo />} />
        </Route>
      </Route>

      {/* MainLayout 상속받는 그룹*/}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/:role/ai-matching" element={<MatchingMain />} />
        <Route path="/:role/ai-matching-result" element={<MatchingResult />} />

        <Route path="/:role/joblist" element={<JobList />} />
        <Route path="/:role/jobdetail/:id" element={<JobDetail />} />
        <Route path="/jobpost" element={<JobPost />} />
      </Route>

      {/* ChatLayout 상속받는 그룹*/}
      <Route element={<ChatLayout />}>
        <Route path="/chat" element={<Chat />} />
      </Route>
    </Routes>
  );
}

export default App;
