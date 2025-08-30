import { Routes, Route } from 'react-router-dom';
import MainLayout from './layout/MainLayout';
import JoinLayout from './layout/JoinLayout';
import Login from './pages/Login';

function App() {
  return (
    <Routes>
      <Route></Route>

      {/* JoinLayout 상속받는 그룹*/}
      <Route element={<JoinLayout />}>
        <Route path="/login" element={<Login />}></Route>
      </Route>

      {/* MainLayout 상속받는 그룹*/}
      <Route element={<MainLayout />}>
        <Route></Route>
      </Route>
    </Routes>
  );
}

export default App;
