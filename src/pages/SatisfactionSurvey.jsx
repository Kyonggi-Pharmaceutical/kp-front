import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import Checkbox from "../components/CheckBox";
import StressSurvey from "../pages/StressSurvey";


export default function SatisfactionSurvey(info, healthGoal) {
    const month = 1;

    useEffect( ()=>{
    }, [info]);

    return (

        <div className="month-main-bg">
            <div className="month-result-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>월간 만족도 조사</h3>
                <p>지난 달에 비해 얼마나 스트레스가 개선되었는지 확인해보세요!</p>
                <StressSurvey month={1}></StressSurvey>

            </div>
        </div>
    );
}