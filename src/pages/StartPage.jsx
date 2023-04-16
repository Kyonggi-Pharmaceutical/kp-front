import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function StartPage({ isLogin, info }) {
    const navigate = useNavigate();
    const username = info.lastName + info.firstName;
    const stressSurvey = () => {
        navigate("/stressSurvey?name="+username);
    }
    const dietSurvey = () => {
        navigate("/dietSurvey?name="+username);
    }

    useEffect( ()=>{
        if (!isLogin) navigate('/');
    }, [isLogin, info]);

    return (

        <div className="main-bg">
            <div className="start-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 시작하기</h3>
                <p>{`${info.lastName} ${info.firstName}`}님, 무슨 건강관리를 원하시나요?</p>
                    <div className="submit-button" onClick={dietSurvey}>체중</div>
                    <div className="submit-button" onClick={stressSurvey}>스트레스</div>

            </div>
        </div>
    );
}