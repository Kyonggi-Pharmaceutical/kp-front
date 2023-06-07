import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import Checkbox from "../components/CheckBox";
import Button from "react-bootstrap/Button";



export default function DailyGoal(info) {
    const username = info.lastName + info.firstName;
    const location = useLocation();
    const [complete, setComplete] = useState(false);
    const navigate = useNavigate();
    const SatisfactionSurvey = () => {
        navigate("/satisfactionSurvey");
    }
    const Main = () => {
        navigate("/main");
    }

    useEffect( ()=>{
    }, [info]);

    return (

        <div className="stressResult-bg">
            <div className="stressResult">
                <div className="smallTitle">일일 목표관리</div>
                <p>기본 생활관리</p>
                <p>수면 7~8시간</p><Checkbox checked={complete} onChange={setComplete} />
                <p>간단한 외출 또는 운동</p><Checkbox checked={complete} onChange={setComplete} />

                <p>---------------------------------</p>
                <p>MBTI 스트레스대처하기</p>
                <p>스스로 오늘 할 챌린지 한 가지 이상 정하고 지키기</p><Checkbox checked={complete} onChange={setComplete} />
                <p>인생의 현실적인 목표 5가지 설정하기</p><Checkbox checked={complete} onChange={setComplete} />
                <p>자신과 대화 하며 현재 기분을 적어보기 </p><Checkbox checked={complete} onChange={setComplete} />

                <div style={{textAlign: "center"}}>
                    <Button className="daily-button" onClick={Main}>메인화면으로 가기</Button>
                </div>
            </div>
        </div>
    );
}