import { Component, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login2 from "./pages/Login2";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage"
import { getUserInfo } from './api/getUserInfo';
import StartPage from "./pages/StartPage";
import StressSurvey from "./pages/StressSurvey";
import StressResult from "./pages/stressResult";

function App(){
    const [isLogin, setIsLogin] = useState(false);
    const [info, setUserInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        stressPoint: 0,
    });
    const stressResult = 0;

    useEffect(() => {
        const initLogin = async () => {
            const name = await getUserInfo();
            setIsLogin(!!name);
            setUserInfo(name);
        };

        initLogin();

    }, []);

  return(
      <div>
        <nav className="navbar">
          <ul className="nav-list">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/login">Log In</Link></li>
            <li><Link to="/signup">Sign Up</Link></li>
          </ul>
        </nav>
        <div className="title-header">
          <div className="title">16Healthcare💊</div>
        </div>
        <Routes>
          <Route path="/" element={<Main />}/>
          <Route path="/login" element={<Login2 isLogin={isLogin} setIsLogin={setIsLogin}/>} />
          <Route path="/signup" element={<SignUp />}/>
          <Route path="/mypage" element={isLogin ? <MyPage isLogin={isLogin} /> : <Navigate to="/" />} />
          <Route path="/survey" element={isLogin ? <StartPage isLogin={isLogin} info={info}/>: <Navigate to="/" />} />
          <Route path="/stressSurvey" element={<StressSurvey stressResult={stressResult}/>}/>
          <Route path="/stressResult" element={<StressResult info={info} stressResult={stressResult}/>}/>
        </Routes>
      </div>)
}

export default App;