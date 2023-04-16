import { Routes, Route, BrowserRouter as Router, Link } from 'react-router-dom';
import Login from './pages/Login';
import MyPage from './pages/MyPage';
import { useEffect, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { getUserInfo } from './api/getUserInfo';
import Activities from "./pages/Activities";
import StressInput from "./pages/StressInput";

export default function App() {
  const [isLogin, setIsLogin] = useState(false);

  useEffect(() => {
    const initLogin = async () => {
      const name = await getUserInfo();
      setIsLogin(!!name);
    };
    initLogin();
  }, []);

  return (
    <div className="App">
      <Routes>
        <Route
          path="/"
          element={<Login isLogin={isLogin} setIsLogin={setIsLogin} />}
        />
        <Route
          path="mypage"
          element={isLogin ? <MyPage isLogin={isLogin} /> : <Navigate to="/" />}
        />
        <Route path="/stressInput" element={  <StressInput /> }/>
        <Route path="/stressResult" element = { <Activities /> } />
      </Routes>

    </div>
  );
}
