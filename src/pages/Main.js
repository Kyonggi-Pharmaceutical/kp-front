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
import {putUserActivityDailyProgress} from "../api/activity/putUserActivityDailyProgress";
import {getUserActivitySolutions} from "../api/activity/getUserActivitySolutions";
import {getUserTodayProgressChecked} from "../api/progress/getUserTodayProgressChecked";
import {getExerciseInfo} from "../api/getExerciseInfo";
import {getHealthGoal} from "../api/getHealthGoal";
import {getStressGoal} from "../api/getStressGoal";
import {saveDailyChecked} from "../api/postDailyChecked";

function Main({isLogin}) {
    let navigate = useNavigate();

    const survey = () => {
        navigate("/survey");
    }

    const board = () => {
        if (info.nickname && info.fullName) {
            window.location.replace('/board');
        } else {
            alert('로그인/회원가입이 필요한 서비스입니다!');
            navigate('/');
        }
    }

    const myPage = () => {
        navigate("/mypage");
    }

    const [info, setInfo] = useState({
        nickname: '',
        fullName: '',
        healthcareType: null,
        bmi: {
            value: '',
            description: ''
        }
    });
    const [dailyHealthMessage, setDailyHealthMessage] = useState('');
    const [dailyAllRanking, setDailyAllRanking] = useState([]);
    const [weeklyAllRanking, setWeeklyAllRanking] = useState([]);
    const [monthlyAllRanking, setMonthlyAllRanking] = useState([]);
    const [showBeforeCheckModal, setShowBeforeCheckModal] = useState(false);
    const [showAfterCheckModal, setShowAfterCheckModal] = useState(false);
    const [showMonthlyCheckModal, setShowMonthlyCheckModal] = useState(false);
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
    const [isMinimized, setIsMinimized] = useState(false);

    const handleMinimize = () => {
        setIsMinimized(!isMinimized);
    };


    const handleRefreshWeeklyProgress = () => {
        setRefreshWeeklyProgress(prev => !prev);
    };

    useEffect(() => {
        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
            console.log("###" + newinfo.fullName);
            await fetchGoal(newinfo.healthcareType);
        };


        const initDailyHealthMessage = async () => {
            try {
                await initUserinfo();
                const newMessage = await getDailyHealthMessage()
                setDailyHealthMessage(newMessage.content)
            } catch (e) {
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
        initDailyHealthMessage()
        initUserinfo()
        fetchAllRanking()
    }, []);

    useEffect(() => {

        const fetchUserActivitySolutions = async () => {
            if (info.healthcareType != null) {
                try {
                    const activitySolutions = await getUserActivitySolutions();
                    setUserActivitySolutions(activitySolutions);
                } catch (error) {
                    console.error('Failed to fetchUserActivitySolutions:', error);
                }
            }
        };

        const fetchUserExerciseSolutions = async () => {
            console.log('###!! healthcareType:' + info.healthcareType)
            if (info.healthcareType != null) {
                try {
                    const exerciseSolutions = await getExerciseInfo();
                    setUserExerciseSolutions(exerciseSolutions);
                } catch (error) {
                    console.error('Failed to fetchUserExerciseSolutions:', error);
                }
            }
        };


        const fetchWeeklyProgresses = async () => {
            if (info.healthcareType != null) {
                try {
                    const today = await getUserTodayProgressChecked();
                    setShowBeforeCheckModal(!today.check)
                } catch (error) {
                    console.error('Failed to fetchWeeklyProgresses:', error);
                }
            }
        };

        fetchUserActivitySolutions()
        fetchUserExerciseSolutions()
        fetchWeeklyProgresses()
        fetchGoal(info.healthcareType);
    }, [info.healthcareType])

    const putDailyProgress = async (done) => {
        setDailyProgressDone(done)
        setShowBeforeCheckModal(false);
        setShowAfterCheckModal(true);
        if (info.healthcareType === 'STRESS') {
            await putUserActivityDailyProgress(done);
        } else {
            await saveDailyChecked({isCheck: done})
        }

        setTimeout(() => {
            setShowAfterCheckModal(false);
            handleRefreshWeeklyProgress();
            fetchGoal(info.healthcareType);
        }, 3000);
    };


    const fetchGoal = async (healthcareType) => {
        if (info.healthcareType != null) {
            try {
                const today = await getUserTodayProgressChecked();
                setShowBeforeCheckModal(!today.check)
                if (healthcareType === 'HEALTH') {
                    const healthGoal = await getHealthGoal();
                    const endAt = new Date(healthGoal.endAt);
                    const isPast = endAt < new Date();
                    setShowMonthlyCheckModal(today.check && isPast)
                    if (today.check && isPast) {
                        setTimeout(() => {
                            setShowMonthlyCheckModal(false);
                            navigate("/monthSurvey");
                        }, 5000);
                    }
                }
                if (healthcareType === 'STRESS') {
                    const stressGoal = await getStressGoal();
                    const endAt = new Date(stressGoal.endAt);
                    const isPast = endAt < new Date();
                    setShowMonthlyCheckModal(today.check && isPast)
                    if (today.check && isPast) {
                        setTimeout(() => {
                            setShowMonthlyCheckModal(false);
                            navigate("/satisfactionSurvey");
                        }, 5000);
                    }
                }
            } catch (error) {
                console.error('Failed to fetchGoal:', error);
            }
        }
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
                                                                <strong>{number[index + 1]} {exercise.name} (칼로리:{exercise.cal}kcal
                                                                    / {exercise.time}분)</strong>
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
                {info.bmi != null && (
                    <div className="overlay-container">
                        {!isMinimized && (
                            <>
                                <div className="overlay-content">
                                    <h3>현재 나의 상태</h3>
                                    <p>키: {info.height}, 몸무게: {info.weight}</p>
                                    <p>BMI 수치: {info.bmi.value} ({info.bmi.description})</p>
                                    <button onClick={myPage}>업데이트 하러가기</button>
                                </div>
                                <div className="overlay-minimize" onClick={handleMinimize}>
                                    <span>&#8722;</span>
                                </div>
                            </>
                        )}
                        {isMinimized && (
                            <div className="overlay-minimized" onClick={handleMinimize}>
                                <span>&#43;</span>
                            </div>
                        )}
                    </div>
                )}
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
                                {(info.healthcareType === 'STRESS') ? (
                                    userActivitySolutions.map((activity, index) => (
                                        <div key={index}>
                                            <p style={{fontSize: '25px'}}>
                                                <strong>
                                                    ✅️ {activity.name}
                                                </strong>
                                            </p>
                                        </div>
                                    ))
                                ) : (
                                    userExerciseSolutions.map((exercise, index) => (
                                        <div key={index}>
                                            <p style={{fontSize: '25px'}}>
                                                <strong>
                                                    ✅️ {exercise.name} / {exercise.cal}kcal / {exercise.time}분
                                                </strong>
                                            </p>
                                        </div>
                                    ))
                                )}
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
            <Modal show={showMonthlyCheckModal} onHide={() => setShowMonthlyCheckModal(false)} backdrop="static">
                <Modal.Body>
                    <div>
                        <h3>{(info.nickname === '') ? info.fullName : info.nickname}님, 축하합니다!</h3>
                        <p>이번 달 {(info.healthcareType === 'HEALTH') ? '건강' : '스트레스'} 관리 목표가 종료되었습니다 🎉🎉</p>
                        <p><strong>한 달동안 {(info.healthcareType === 'HEALTH') ? '건강' : '스트레스'} 관리를 진행하면서, 변화된 부분이
                            있었나요?</strong></p>
                        <p>잠시 후에 만족도 조사 페이지로 이동됩니다.</p>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default Main;
