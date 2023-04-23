import { Component, useEffect, useState } from 'react';
import './App.css';
import { Routes, Route, Link, Navigate } from "react-router-dom";
import Main from "./pages/Main";
import Login from "./pages/Login";
import Logout from "./pages/Logout";
import SignUp from "./pages/SignUp";
import MyPage from "./pages/MyPage"
import { getUserInfo } from './api/getUserInfo';
import ExerciseSolution from "./pages/ExerciseSolution";
import StartPage from "./pages/StartPage";
import { useDispatch, useSelector } from "react-redux"
import { loginUser } from "./Store"

function App(){
    let dispatch = useDispatch();
    const [isLogin, setIsLogin] = useState(false);
    const [info, setUserInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        profileImageUrl: "",
    });
    useEffect(()=>{
        dispatch(loginUser(info));
    });
    useEffect(() => {
        const initLogin = async () => {
            const name = await getUserInfo();
            setIsLogin(!!name);
            setUserInfo(name);
        };
        initLogin();
    }, []);
    let userInfo = useSelector((state) => {
        return state.user;
    });
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
          <Route path="/signup" element={<SignUp userInfo={userInfo} />}/>
          <Route path="/mypage" element={isLogin ? <MyPage isLogin={isLogin} /> : <Navigate to="/" />} />
          <Route path="/exerciseSolution" element={<ExerciseSolution />}/>
          <Route path="/survey" element={isLogin ? <StartPage isLogin={isLogin} info={info}/>: <Navigate to="/" />} />
        </Routes>
      </div>)
}

export default App;