import React from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from '../components/GoogleLogin';
import { useForm } from "react-hook-form";

import { postLoginToken } from '../api/postLoginToken';

function Login({ isLogin, setIsLogin }) {
    const navigate = useNavigate();
    const {register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

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
                <form onSubmit={handleSubmit(onSubmit)} style={{textAlign: "center"}}>
                    <input className="input-box" type="text" placeholder="Username" {...register("username")}/>
                    <input className="input-box" type="password" placeholder="Password" {...register("password")}/>
                    <button type="submit" className="submit-btn">로그인</button>
                    <GoogleLogin onGoogleSignIn={onGoogleSignIn} text="로그인" />
                </form>

            </div>
        </div>
    );
}

export default Login;