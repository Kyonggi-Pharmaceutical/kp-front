import {useNavigate} from 'react-router-dom';
import "./Main1.css";
import React, {useEffect, useState} from "react";
import GoogleLogin from '../components/GoogleLogin'
import {postLoginToken} from '../api/user/postLoginToken';
import {getUserInfo} from "../api/user/getUserInfo";

function BeforeLogin({isLogin, setIsLogin}) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        nickname: '',
        mbti: '',
    });

    const onGoogleSignIn = async res => {
        const {credential} = res;
        const result = await postLoginToken(credential, setIsLogin);
        setIsLogin(result);
    };

    useEffect(() => {
        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
        };
        initUserinfo();
    }, [isLogin]);

    useEffect(() => {
        if (isLogin === true) {
            if (info.mbti == null) {
                navigate('/signup');
            } else {
                navigate('/main');
            }
        }
    }, [info.mbti, navigate])

    return (
        <div className="main-container">
            <div className="main-bgs">
                <div className="main">
                    <div className="greeting">
                        <p className="greeting-text">
                            안녕하세요,
                        </p>
                    </div>
                    <div className="greeting" style={{marginTop: '60px'}}>
                        <p className="greeting-text">여러분의 건강을 책임지는 16Healthcare 입니다.</p>
                        <p className="greeting-text">MBTI에 따른 맞춤형 운동 및 스트레스 관리 방법을 추천받아보세요!</p>
                        <p className="health-message">하단에 시작하기 버튼을 눌러 건강관리를 시작해볼까요?</p>
                    </div>
                    <div style={{width: "100%", display: "flex", justifyContent: "center", margin: "20px"}}>
                        <div style={{padding: "5px", borderRadius: "10px"}}>
                            <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeforeLogin;
