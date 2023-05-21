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
                    const progress = userWeeklyProgresses.find((p) => p.date === day);
                    return (
                        <div className="grid-item" key={day}>
                            <div className="grid-item-content">
                                <p style={{fontSize: '3px', fontWeight: 'bold', marginBottom: '10px'}}>{day}</p>
                                {progress ? (
                                    <span className="grid-item-check">{progress.isCheck ? 'O' : 'X'}</span>
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
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const day = String(date.getDate()).padStart(2, '0');
        return `${year}-${month}-${day}`;
    };

    return (
        <div className="main-bg">
            <div className="main">
                <Container>
                    <Row>
                        <h3>최근 7일간의 진척도</h3>
                        <div className="start-page">{renderGrid()}</div>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" style={{marginTop: '40px'}}>
                            <div>
                                <Button
                                    className="daily-progress-button"
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={main}
                                >
                                    메인으로 가기
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
