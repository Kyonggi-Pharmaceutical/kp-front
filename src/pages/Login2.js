import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import Nav from '../components/Nav';
import { postLoginToken } from '../api/postLoginToken';

function Login2({ isLogin, setIsLogin }) {
    const navigate = useNavigate();

    // https://stackoverflow.com/questions/49819183/react-what-is-the-best-way-to-handle-login-and-authentication
    const onGoogleSignIn = async res => {
        const { credential } = res;
        const result = await postLoginToken(credential, setIsLogin);
        setIsLogin(result);
    };

    useEffect(() => {
        if (!isLogin) return;
        navigate('/mypage');
    }, [isLogin]);

    return (
        <div className="main-bg">
            <div className="login-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>로그인</h3>
                <form>
                    <input className="input-box" type="text" placeholder="Username" />
                    <input className="input-box" type="password" placeholder="Password" />
                    <div className="submit-button" onClick={()=>{
                        alert("양식 제출, 현재 onClick 핸들러 사용중, onSubmit 사용?");
                    }}>Go</div>
                    <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인"/>
                </form>

            </div>
        </div>
    );
}

export default Login2;