import React from 'react';
import {Component, useEffect, useState} from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage"
import { getUserInfo } from './api/user/getUserInfo';
import StartPage from "./pages/StartPage";
import StressSurvey from "./pages/StressSurvey";
import StressResult from "./pages/StressResult";
import DailyGoal from "./pages/DailyGoal";
import SatisfactionSurvey from "./pages/SatisfactionSurvey";
import SatisfactionResult from "./pages/SatisfactionResult";
import Board from "./pages/board/Board";
import Article from "./pages/board/Article";
import CreatedArticle from "./pages/board/CreatedArticle";
import ModifyArticle from "./pages/board/ModifyArticle";

function App(){
    const [isLogin, setIsLogin] = useState(false);
    const [info, setUserInfo] = useState({
        nickname: "",
        gender: "",
        dateOfBirth: "",
        height: 0.0,
        weight: 0.0,
        mbti: "",
        isSmoking: null,
        isAlcohol: null,
        HealthcareType: null,
        profileImageUrl: '',
        email: '',
        firstName: '',
        lastName: '',
    });
    const [healthGoal, setHealthGoal] = useState({
        userId: '',
        type:'',
        activity: [],
        startStressValue:0
    });
    const month = 0;
    //const stressResult = 0;
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
                    {
                        isLogin ? (<li><Link to="/mypage">My Page</Link></li>) : (<li><Link to="/login">Log In</Link></li>)
                    }
                    <li><Link to="/signup">Sign Up</Link></li>
                </ul>
            </nav>
            <div className="title-header">
                <div className="title"><Link to={"/"} style={{textDecoration: "none", color: "inherit"}}>16Healthcare💊</Link></div>
            </div>
            <Routes>
                <Route path="/" element={<Main />}/>
                <Route path="/login" element={<Login isLogin={isLogin} setIsLogin={setIsLogin}/>} />
                <Route path="/logout" element={<Logout />} />
                <Route path="/signup" element={<SignUp isLogin={isLogin}/>}/>
                <Route path="/mypage" element={isLogin ? <MyPage isLogin={isLogin} /> : <Navigate to="/" />} />
                <Route path="/survey" element={isLogin ? <StartPage isLogin={isLogin} info={info}/>: <Navigate to="/" />} />
                <Route path="/stressSurvey" element={<StressSurvey month={month} stressResult={StressResult}/>}/>
                <Route path="/stressResult" element={<StressResult info={info} setUserInfo={setUserInfo} healthGoal={healthGoal} setHealthGoal={setHealthGoal}/>}/>
                <Route path="/dailyGoal" element={<DailyGoal info={info} healthGoal={healthGoal}/>}/>
                <Route path="/satisfactionSurvey" element={<SatisfactionSurvey month={month} info={info} healthGoal={healthGoal}/>} />
                <Route path="/satisfactionResult" element={<SatisfactionResult info={info} />}/>
                <Route path="/board" element={<Board />}/>
                <Route path="/article" element={<Article />}/>
                <Route path="/createdArticle" element={<CreatedArticle/>}/>
                <Route path="/modifyArticle" element={<ModifyArticle/>}/>
            </Routes>
        </div>)
}

export default App;