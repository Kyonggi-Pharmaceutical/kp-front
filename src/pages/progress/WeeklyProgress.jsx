import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {getUserInfo} from "../../api/user/getUserInfo";
import "./DailyProgress.css";
import "./WeeklyProgress.css";
import {useNavigate} from "react-router-dom";
import {getUserDailyProgressesUpToLastWeek} from "../../api/activity/getUserDailyProgressesUpToLastWeek";

export default function WeeklyProgress({isLogin}) {
    let navigate = useNavigate();

    const main = () => {
        navigate("/");
    }

    const [info, setInfo] = useState({
        nickname: '',
        fullName: '',
        healthcareType: '',
    });

    const [userWeeklyProgresses, setWeeklyProgresses] = useState([]);

    useEffect(() => {


        const initUserinfo = async () => {
            const newInfo = await getUserInfo();
            setInfo(newInfo);
            console.log("###" + newInfo.fullName);
        };

        const fetchWeeklyProgresses = async () => {
            try {
                const progresses = await getUserDailyProgressesUpToLastWeek();
                setWeeklyProgresses(progresses)
            } catch (error) {
                console.error('Failed to fetch user activity solutions:', error);
            }
        };

        fetchWeeklyProgresses()
        initUserinfo()
    }, []);

    const renderGrid = () => {
        const weekDays = getPastWeekDays();
        return (
            <div className="grid-container">
                {weekDays.map((day) => {
                    const progress = userWeeklyProgresses.find((p) => {
                        const formattedDate = formatDate(new Date(p.date));
                        return formattedDate === day;
                    });

                    return (
                        <div className="grid-item" key={day}>
                            <div className="grid-item-content">
                                <p style={{fontSize: '15px', fontWeight: 'bold', marginBottom: '10px'}}>{day}</p>
                                {progress ? (
                                    progress.isCheck ? (
                                        <img src={process.env.PUBLIC_URL + '/img/dailyProgressTrue.png'} alt="check"
                                             className="grid-item-image"/>
                                    ) : (
                                        <img src={process.env.PUBLIC_URL + '/img/dailyProgressFalse.png'} alt="cross"
                                             className="grid-item-image"/>
                                    )
                                ) : (
                                    <span className="grid-item-check"></span>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        );
    };

    const getPastWeekDays = () => {
        const weekDays = [];
        const today = new Date();
        for (let i = 6; i >= 0; i--) {
            const pastDate = new Date(today.getFullYear(), today.getMonth(), today.getDate() - i);
            const formattedDate = formatDate(pastDate);
            weekDays.push(formattedDate);
        }
        return weekDays;
    };


    const formatDate = (date) => {
        const day = String(date.getDate()).padStart(2, '0');
        const weekDays = ['일', '월', '화', '수', '목', '금', '토'];
        const dayOfWeek = weekDays[date.getDay()]; // 요일 인덱스에 맞게 한글 요일을 가져옵니다.

        return `${day}(${dayOfWeek})`;
    };


    return (
        <div className="main">
            <Container>
                <Row className="justify-content-center">
                    <h3 className="text-center">최근 7일간의 진척도</h3>
                    <div>{renderGrid()}</div>
                </Row>
            </Container>
        </div>
    );
}
