import React from 'react';
import {Component, useEffect, useState} from 'react';
import './App1.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route, Link, Navigate} from "react-router-dom";
import healthIcon from './images/health.png';
import Main from "./pages/Main";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage"
import {getUserInfo} from './api/user/getUserInfo';
import StartPage from "./pages/StartPage";
import StressSurvey from "./pages/StressSurvey";
import StressResult from "./pages/StressResult";
import DailyGoal from "./pages/DailyGoal";
import SatisfactionSurvey from "./pages/SatisfactionSurvey";
import SatisfactionResult from "./pages/SatisfactionResult";
import DietSurvey from "./pages/DietSurvey";
import DietResult from "./pages/DietResult";
import Board from "./pages/board/Board";
import Article from "./pages/board/Article";
import CreatedArticle from "./pages/board/CreatedArticle";
import ModifyArticle from "./pages/board/ModifyArticle";
import WeeklyProgress from "./pages/progress/WeeklyProgress";
import Main2 from "./pages/BeforeLogin";
import Mine from "./pages/MyCommunity";
import MonthSatisfySurvey from "./pages/SatisfySurvey";
function App() {
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
        type: '',
        activity: [],
        startStressValue: 0
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

    return (
        <div className="app-container">
            <div className="sidebar-container">
                <div className="title-header">
                    <div className="title">
                        <img src={healthIcon} alt="Health Icon" className="health-image"/>
                        <div className="title-font">
                            <span className="title-text">16HEALTH</span>
                            <span className="title-text">CARE</span>
                        </div>
                    </div>
                </div>
                <nav className="navbar">
                    <div className="menu-bar">
                        <ul>
                            <li>
                                <Link to="/main" style={{textDecoration: "none", color: "white"}}>
                                <span className="bold-size">H O M E</span>
                                <span className="li-span">메 인</span></Link>
                            </li>
                            <li>
                                <Link to={isLogin ? "/board" : "/"} style={{textDecoration: "none", color: "white"}}>
                                <span className="bold-size">B O A R D</span>
                                <span className="li-span">게시판</span></Link>
                            </li>
                            <li>
                                <Link to="/Mine" style={{textDecoration: "none", color: "white"}}>
                                <span className="bold-size">M I N E</span>
                                <span className="li-span">나의 활동</span></Link>
                            </li>
                        </ul>
                    </div>
                    <ul className="nav-list">
                        <li><Link to="/">Home</Link></li>
                        {isLogin ? (
                            <li><Link to="/mypage">My Page</Link></li>
                        ) : (
                            null
                        )}
                        {
                            isLogin ? null : <li><Link to="/signup">Sign Up</Link></li>
                        }
                    </ul>
                </nav>
            </div>
            <div className="main-container">
                <Routes>
                    <Route path="/" element={<Main2 isLogin={isLogin} setIsLogin={setIsLogin}/>}/>
                    <Route path="/main" element={isLogin ? <Main isLogin={isLogin} setIsLogin={setIsLogin}/> : <Navigate to="/"/>}/>
                    <Route path="/signup" element={isLogin ? <SignUp isLogin={isLogin}/> : <Navigate to="/"/>}/>
                    <Route path="/mypage" element={isLogin ? <MyPage isLogin={isLogin}/> : <Navigate to="/"/>}/>
                    <Route path="/Mine" element={isLogin ? <Mine/> : <Navigate to="/"/>}/>
                    <Route path="/weekly-my-progress"
                           element={isLogin ? <WeeklyProgress isLogin={isLogin}/> : <Navigate to="/"/>}/>
                    <Route path="/survey"
                           element={isLogin ? <StartPage isLogin={isLogin} info={info}/> : <Navigate to="/"/>}/>
                    <Route path="/stressSurvey" element={<StressSurvey month={month} stressResult={StressResult}/>}/>
                    <Route path="/stressResult"
                           element={<StressResult info={info} setUserInfo={setUserInfo} healthGoal={healthGoal}
                                                  setHealthGoal={setHealthGoal}/>}/>
                    <Route path="/dietSurvey" element={<DietSurvey info={info}/>}/>
                    <Route path="/dietResult" element={<DietResult info={info}/>}/>
                    <Route path="/dailyGoal" element={<DailyGoal info={info} healthGoal={healthGoal}/>}/>
                    <Route path="/satisfactionSurvey"
                           element={<SatisfactionSurvey month={month} info={info} healthGoal={healthGoal}/>}/>
                    <Route path="/satisfactionResult" element={<SatisfactionResult info={info}/>}/>
                    <Route path="/board" element={<Board/>}/>
                    <Route path="/article" element={<Article/>}/>
                    <Route path="/createdArticle" element={<CreatedArticle/>}/>
                    <Route path="/modifyArticle" element={<ModifyArticle/>}/>
                    <Route path="/monthSurvey" element={<MonthSatisfySurvey/>}/>

                </Routes>
            </div>
        </div>
    )
}

export default App;
