import React, {useEffect, useState} from 'react';
import moment from "moment";
import {saveDailyChecked} from "../api/postDailyChecked";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import { getUserActivitySolutions } from "../api/activity/getUserActivitySolutions";
import stress from '../pages/StressSurvey';
import MBTI from "../api/Mbti/../Mbti";
import Activity from "../api/Activity/../Activity";
import styles from './StressSurvey.css';
import Button from 'react-bootstrap/Button';
import Main from "./Main";
import {putStressPoint} from "../api/stresses/putStressPoint";
import {getUserInfo} from "../api/user/getUserInfo";
console.log(MBTI);


export default function StressResult({info, setUserInfo, healthGoal, setHealthGoal}) {
    const [activityList, setActivityList] = useState([]);



    const navigate = useNavigate();
    const DailyGoal = () => {
        navigate("/dailyGoal");
    }


    const location = useLocation();
    const value = location.state.value;

    useEffect( async () => {


        const fetchUserActivitySolutions = async () => {
            try {
                const activitySolutions = await getUserActivitySolutions();
                setActivityList(activitySolutions);
            } catch (error) {
                console.error('Failed to fetchUserActivitySolutions:', error);
            }
        };
        const stressPoint = await getUserInfo();
        setUserInfo(stressPoint);

        await fetchUserActivitySolutions();

    }, []);

    return (

        <div className="stressResult-bg">
            <div className="stressResult">
                <div className="smallTitle">설문 결과</div>

                <p>{` ${info.lastName} ${info.firstName}`}님의 스트레스 지수는 {value}점입니다.</p>
                {
                    Array.isArray(activityList) && activityList.map((activity, idx) => {
                        return (
                            <div className="activity-item" key={idx}>
                                <p>증상: {activity.symptom}</p>
                                <p>추천활동: {activity.name}</p>
                            </div>
                        )
                    })}
                <p>{value}점의 스트레스는 현상유지가 필요합니다.</p>
                <div style={{textAlign: "center"}}>
                    <Button className="daily-button" onClick={Main}>일일 목표 확인</Button>
                </div>

            </div>
        </div>
    );
}