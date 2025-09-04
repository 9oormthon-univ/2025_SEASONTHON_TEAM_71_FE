import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import JoinLayout from "./layout/JoinLayout";

import Home from "./pages/Home";
import Login from "./pages/Join/Login";
import JoinCategory from "./pages/Join/JoinCategory";
import JoinInfo from "./pages/Join/JoinInfo";
import Chat from "./pages/AIConsultant/Chat";

import MatchingMain from "./pages/AIConsultant/MatchingMain";
import MatchingResult from "./pages/AIConsultant/MatchingResult";

import Chatting from "./pages/AIConsultant/Chatting";

import JobList from "./pages/Jobs/JobList";
import JobDetail from "./pages/Jobs/JobDetail";

function App() {
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
        <Route path="/:role/jobdetail" element={<JobDetail />} />
        <Route path="/chat" element={<Chat />} />
      </Route>

      <Route path="/chatting" element={<Chatting />} />
    </Routes>
  );
}

export default App;
