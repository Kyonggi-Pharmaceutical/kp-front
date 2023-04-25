import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import MBTI from "../api/Mbti/../Mbti";
import Activity from "../api/Activity/../Activity";
import styles from "./StressSurvey.css";
console.log(MBTI);
console.log(Activity);
export default function StressResult({info, stressResult}) {

    const navigate = useNavigate();
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
            <div className="result-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 결과</h3>
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
                {Activity.map((item) => { return (<p>{`${info.lastName} ${info.firstName}`}님에게 적절한 스트레스 관리방식은 {item.type}입니다.(2~3개 출력예정)</p>)
                })}

                <div className="submit-button" onClick>일일 목표 관리하기</div>

            </div>
        </div>
    );
}