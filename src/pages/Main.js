import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Main1.css'
import './Main.css'
import {getDailyHealthMessage} from "../api/main/getDailyHealthMessage";
import {getUserInfo} from "../api/user/getUserInfo";
import {HiOutlineCheckCircle, HiOutlineClipboardList, HiOutlineXCircle} from "react-icons/hi";
import {getAllRanking} from "../api/main/getAllRanking";
import MainRank from "./main/MainRank";
import WeeklyProgress from "./progress/WeeklyProgress";
import Modal from "react-bootstrap/Modal";
import {putUserDailyProgress} from "../api/activity/putUserDailyProgress";
import {getUserActivitySolutions} from "../api/activity/getUserActivitySolutions";
import {getUserTodayProgressChecked} from "../api/progress/getUserTodayProgressChecked";
import {getExerciseInfo} from "../api/getExerciseInfo";

function Main({isLogin}) {
    let navigate = useNavigate();

    const survey = () => {
        navigate("/survey");
    }

    const [info, setInfo] = useState({
        nickname: '',
        fullName: '',
        healthcareType: '',
    });
    const [dailyHealthMessage, setDailyHealthMessage] = useState('');
    const [dailyAllRanking, setDailyAllRanking] = useState([]);
    const [weeklyAllRanking, setWeeklyAllRanking] = useState([]);
    const [monthlyAllRanking, setMonthlyAllRanking] = useState([]);
    const [showBeforeCheckModal, setShowBeforeCheckModal] = useState(false);
    const [showAfterCheckModal, setShowAfterCheckModal] = useState(false);
    const [dailyProgressDone, setDailyProgressDone] = useState(false);
    const [userActivitySolutions, setUserActivitySolutions] = useState([]);
    const [userExerciseSolutions, setUserExerciseSolutions] = useState([]);
    const [refreshWeeklyProgress, setRefreshWeeklyProgress] = useState(false);
    const [number, setNumber] = useState({
        1: "1️⃣",
        2: "2️⃣",
        3: "3️⃣",
        4: "4️⃣",
        5: "5️⃣",
    });

    const handleRefreshWeeklyProgress = () => {
        setRefreshWeeklyProgress(prev => !prev);
    };

    useEffect(() => {
        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
            console.log("###" + newinfo.fullName);
        };


        const initDailyHealthMessage = async () => {
            try {
                const newMessage = await getDailyHealthMessage()
                setDailyHealthMessage(newMessage.content)
            } catch (e) {
                console.error(e.message)
                setDailyHealthMessage('문진을 완료하고, 맞춤형 건강 관리 솔루션을 받아보세요!')
            }
        }

        const fetchAllRanking = async () => {
            try {
                // 서버 API를 통해 사용자 랭킹 데이터를 가져옴
                const daily = await getAllRanking('daily')
                const weekly = await getAllRanking('weekly')
                const monthly = await getAllRanking('monthly')
                setDailyAllRanking(daily);
                setWeeklyAllRanking(weekly);
                setMonthlyAllRanking(monthly);
            } catch (error) {
                console.error('Failed to fetch user ranking:', error);
            }
        };

        const fetchUserActivitySolutions = async () => {
            try {
                const activitySolutions = await getUserActivitySolutions();
                setUserActivitySolutions(activitySolutions);
            } catch (error) {
                console.error('Failed to fetch user activity solutions:', error);
            }
        };

        const fetchUserExerciseSolutions = async () => {
            try {
                const exerciseSolutions = await getExerciseInfo();
                setUserExerciseSolutions(exerciseSolutions);
            } catch (error) {
                console.error('Failed to fetch user activity solutions:', error);
            }
        };

        const fetchWeeklyProgresses = async () => {
            try {
                const today = await getUserTodayProgressChecked();
                setShowBeforeCheckModal(!today.check)
            } catch (error) {
                console.error('Failed to fetch user activity solutions:', error);
            }
        };

        fetchUserActivitySolutions()
        fetchUserExerciseSolutions()
        initDailyHealthMessage()
        initUserinfo()
        fetchAllRanking()
        fetchWeeklyProgresses()
        console.log(info.healthcareType)
    }, []);

    const putDailyProgress = async (done) => {
        setDailyProgressDone(done)
        setShowBeforeCheckModal(false);
        setShowAfterCheckModal(true);
        await putUserDailyProgress(done);
        setTimeout(() => {
            setShowAfterCheckModal(false);
            handleRefreshWeeklyProgress();
        }, 3000);
    };

    return (
        <div className="main-container">
            <div className="main-bgs">
                <div className="main">
                    <Container>
                        <Row>
                            <Col>
                                <div className="main-col-box">
                                    <p className="health-message" style={{fontSize: '30px'}}>{dailyHealthMessage}</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{maxWidth: '70%', width: '750px'}}>
                                {info.healthcareType === null ? (
                                    <div className="main-col-clickable-box" style={{height: '100%'}} onClick={survey}>
                                        <HiOutlineClipboardList size="400"></HiOutlineClipboardList>
                                        <p>문진하기</p>
                                    </div>
                                ) : (
                                    <div>
                                        <div className="main-col-box" style={{height: '53%'}}>
                                            {info.healthcareType === 'HEALTH' ? (
                                                <div>
                                                    <h3 className="text-center">오늘의 맞춤형 건강 관리 솔루션</h3>
                                                    <p style={{fontSize: '25px'}}>ㅤ</p>
                                                    {userExerciseSolutions.map((exercise, index) => (
                                                        <div key={index}>
                                                            <p style={{fontSize: '25px'}}>
                                                                <strong>
                                                                    {number[index + 1]} {exercise.name} (칼로리:{exercise.cal} / 시간:{exercise.time})
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    ))}
                                                    <p style={{fontSize: '25px'}}>ㅤ</p>
                                                </div>
                                            ) : (
                                                <div>
                                                    <h3 className="text-center">오늘의 맞춤형 스트레스 관리 솔루션</h3>
                                                    {userActivitySolutions.map((activity, index) => (
                                                        <div key={index}>
                                                            <p style={{fontSize: '25px'}}>
                                                                <strong>
                                                                    {number[index + 1]} {activity.name}
                                                                </strong>
                                                            </p>
                                                        </div>
                                                    ))}
                                                </div>
                                            )}
                                        </div>
                                        <div className="main-col-box" style={{height: '45%'}}>
                                            <WeeklyProgress
                                                isLogin={isLogin}
                                                key={refreshWeeklyProgress}
                                            />
                                        </div>
                                    </div>
                                )}
                            </Col>

                            <Col style={{maxWidth: '30%'}}>
                                <MainRank dayALL={dailyAllRanking} weekALL={weeklyAllRanking}
                                          monthALL={monthlyAllRanking}/>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </div>
            <Modal show={showBeforeCheckModal} onHide={() => setShowBeforeCheckModal(false)} backdrop="static">
                <Modal.Body>
                    <Container>
                        <Row>
                            <h3>일일 진척도 체크</h3>
                            <div className="start-page">
                                <p>
                                    <strong>
                                        {`${info.lastName} ${info.firstName}`.replace(/\s+/g, '')}
                                    </strong>
                                    님의{' '}
                                    {info.healthcareType === 'STRESS' ? '스트레스' : '건강'}
                                    관리 솔루션 입니다
                                </p>

                                {userActivitySolutions.map((activity, index) => (
                                    <div key={index}>
                                        <p style={{fontSize: '25px'}}>
                                            <strong>
                                                ✅️ {activity.name}
                                            </strong>
                                        </p>
                                    </div>
                                ))}
                                <p>달성하셨나요?</p>
                            </div>
                        </Row>
                        <Row>
                            <Col>
                                <div
                                    className="daily-progress-col-box"
                                    onClick={() => putDailyProgress(true)}
                                >
                                    <HiOutlineCheckCircle size="200"/>
                                    <p>YES</p>
                                </div>
                            </Col>
                            <Col>
                                <div
                                    className="daily-progress-col-box"
                                    onClick={() => putDailyProgress(false)}
                                >
                                    <HiOutlineXCircle size="200"/>
                                    <p>NO</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal show={showAfterCheckModal} onHide={() => setShowAfterCheckModal(false)} backdrop="static">
                <Modal.Body>
                    {dailyProgressDone ? (
                        <img style={{width: '300px', height: '300px'}}
                             src={process.env.PUBLIC_URL + '/img/dailyProgressTrue.png'} alt="Default Image"/>
                    ) : (
                        <img style={{width: '300px', height: '300px'}}
                             src={process.env.PUBLIC_URL + '/img/dailyProgressFalse.png'} alt="Default Image"/>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Main;
