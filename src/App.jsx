import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import JoinLayout from "./layout/JoinLayout";

import Home from "./pages/Home";
import Login from "./pages/Join/Login";
import JoinCategory from "./pages/Join/JoinCategory";
import JoinInfo from "./pages/Join/JoinInfo";

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
        {/* <Route index element={<Home />} /> */}
        <Route path="/home" element={<Home />} />
      </Route>
    </Routes>
  );
}

export default App;
