import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import styles from './StressSurvey.css';

export default function StressDailyGoal({info}) {
    const username = info.lastName + info.firstName;
    const location = useLocation();
    const value = location.state.value;
    const stressSurvey = () => {
        navigate("/stressSurvey?name="+username);
    }
    const dietSurvey = () => {
        navigate("/dietSurvey?name="+username);
    }

    useEffect( ()=>{
    }, [info]);

    return (

        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 시작하기</h3>
                <p>{`${info.lastName} ${info.firstName}`}님의 현재 스트레스 지수는 {value}점입니다.</p>
            </div>
        </div>
    );
}