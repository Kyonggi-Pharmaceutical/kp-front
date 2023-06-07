import React, {useState} from 'react';
import { useEffect } from 'react';
import {Link, useNavigate} from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import { postLoginToken } from '../api/user/postLoginToken';
import Carousel from 'react-bootstrap/Carousel';
import {getUserInfo} from "../api/user/getUserInfo";

function Login({ isLogin, setIsLogin }) {
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        nickname: null,
        mbti: null,
    });
    //구글 소셜 로그인 성공 여부 확인
    // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
    const onGoogleSignIn = async res => {
        const { credential } = res;
        const result = await postLoginToken(credential, setIsLogin);
        setIsLogin(result);
        console.log('로그인 성공');
    };

    //로그인이 되었다면 mypage로 이동, 아니면 return
    useEffect(async () => {
        if (!isLogin) return;
        //navigate('/mypage');
        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
        };
        let newinfo = await getUserInfo();
        setInfo(newinfo);
        ;
        initUserinfo().then(r => newinfo);
        if ((info.mbti === null) && (info.nickname === null)) {
            navigate("/signup")
        } else {
            navigate("/main")
        }
    }, [isLogin]);

    return (
        <div className="main-container">
            <div className="main-bgs" style={{borderRadius: "20px", boxShadow: "0 5px 7px rgba(0, 0, 0, 0.5)", padding: "50px", height: "80%"}}>
                <h5 style={{fontWeight: "bold", color: "#E63A35"}}>로그인하여 더 많은 서비스를 이용해보세요</h5>
                <div style={{width: "90%", height: "90%", margin: "0 auto"}}>
                    <Carousel variant="dark" style={{borderRadius: "20px", boxShadow: "0 1px 2px rgba(0, 0, 0, 0.5)", overflow: "hidden"}}>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src="/img/user_main.png"
                                alt="First slide"
                            />
                            <Carousel.Caption>
                                <h3>사용자 메인페이지</h3>
                                <p>맞춤 서비스를 체험해보세요</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src="/img/exercise.png"
                                alt="Second slide"
                            />

                            <Carousel.Caption>
                                <h3>운동 솔루션</h3>
                                <p>목적에 맞는 솔루션을 제공합니다</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item interval={3000}>
                            <img
                                className="d-block w-100"
                                src="/img/community.png"
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>커뮤니티</h3>
                                <p>정보를 공유하며 토론 해보세요</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                    </Carousel>
                </div>
                <div style={{width: "100%", display: "flex", justifyContent: "center", margin: "20px"}}>
                    <div style={{padding: "5px", border: "1px solid lightgrey", borderRadius: "10px"}}>
                        <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;