import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {getUserInfo} from "../../api/user/getUserInfo";
import "./DailyProgress.css";
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

    return (
        <div className="main-bg">
            <div className="main">
                <Container>
                    <Row>
                        <h3>최근 7일간의 진척도</h3>
                        <div className="start-page">
                            {userWeeklyProgresses.map((progress, index) => (
                                <div key={index}>
                                    <p>
                                        <strong>{index + 1}. {progress.date}, {progress.type}, {progress.isCheck.toString()}</strong>
                                    </p>
                                </div>
                            ))}
                        </div>
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
