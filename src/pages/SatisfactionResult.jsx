import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import MBTI from "../api/Mbti/../Mbti";
import Activity from "../api/Activity/../Activity";
import styles from "./StressSurvey.css";
import DailyGoal from "./DailyGoal";
import StressResult from "./StressResult";
console.log(MBTI);
console.log(Activity);

export default function SatisfactionResult({info, setUserInfo, healthGoal, setHealthGoal}) {


    const navigate = useNavigate();
    const DailyGoal = () => {
        navigate("/dailyGoal");
    }
    const location = useLocation();
    const value = location.state.value;
    let comparedStressPoint = info.stressPoint - value;
    const [visible, setVisible] = useState(false);


    useEffect( ()=>{

    }, []);

    function NO(){
        return(
            <div className='new-solution'>
                <div className='new-solution-text'>NEW SOLUTION</div>
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
                {Activity.map((item) => { return (<p>{`${info.lastName} ${info.firstName}`}님이 무기력할 때, 적절한 스트레스 관리방식은 {item.type}입니다.(증상별 2~3개 출력예정)</p>)
                })}
                <div className="new-submit-button" onClick={DailyGoal}>새 솔루션으로 일일 목표 관리하기</div>
            </div>
        )
    }


    return (

        <div className="month-main-bg">
            <div className="month-result-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 결과</h3>
                <p>ENFP {`${info.lastName} ${info.firstName}`}님의 스트레스 지수는 {comparedStressPoint}점 변화했습니다.</p>
                <p>해당 건강솔루션이 도움이 되었나요? </p>
                <div className="month-submit-button" onClick={DailyGoal}>YES</div>
                <div className="month-submit-button" onClick={()=>{
                    setVisible(!visible);
                 }}
                >
                    {visible ? "HOLD" : "NO"}
                </div>
                {visible && <NO />}




            </div>
        </div>
    );
}