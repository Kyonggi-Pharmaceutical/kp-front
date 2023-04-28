import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import MBTI from "../api/Mbti/../Mbti";
import Activity from "../api/Activity/../Activity";
import styles from "./StressSurvey.css";
import DailyGoal from "./DailyGoal";
import Button from 'react-bootstrap/Button';
console.log(MBTI);
console.log(Activity);
export default function StressResult({info, setUserInfo, healthGoal, setHealthGoal}) {


    const submitData = {
        userId: '1111',
        type:'현상유지',
        activity: [],
        startStressValue:info.stressPoint
    };
    const navigate = useNavigate();
    const DailyGoal = () => {
        navigate("/dailyGoal");
    }


    const location = useLocation();
    const value = location.state.value;

    useEffect( ()=>{
        setHealthGoal(submitData);
        setUserInfo({stressPoint : value});
    }, []);

    return (

        <div className="main-bg">
            <div className="main">
                <h3 className="small-title">설문 결과</h3>
                <p>ENFP {`${info.lastName} ${info.firstName}`}님의 스트레스 지수는 {value}점입니다.</p>
                {MBTI.map((item) => {
                    return (
                        <div
                            key={item.id}
                        >
                            <p>{item.description}</p>
                        </div>
                    )
                })}
                <p>{value}점의 스트레스는 현상유지가 필요합니다.</p>
                <p>ENFP유형은 사회적지지 추구, 정서적 대처, 소망적 사고에 해당하는 스트레스 대처방식을 자주 효과적으로 사용합니다.</p>
                {Activity.map((item) => { return (<p>{`${info.lastName} ${info.firstName}`}님이 무기력할 때, 적절한 스트레스 관리방식은 {item.type}입니다. 또는 스스로 오늘 할 챌린지 한 가지 이상 정하고 지키기나
                    인생의 현실적인 목표 설정하기, 자신과 대화하며 현재 기분을 적어보세요.</p>)
                    submitData.activity = item.type;
                })}
                <div style={{textAlign: "center"}}>
                    <Button className="button-custom" variant="outline-danger" size="lg" onClick={DailyGoal}>일일 목표 관리하기</Button>
                </div>

            </div>
        </div>
    );
}