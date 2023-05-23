import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Main1.css'
import './Main.css'
import {getDailyHealthMessage} from "../api/main/getDailyHealthMessage";
import {getUserInfo} from "../api/user/getUserInfo";
import {HiOutlineClipboardList} from "react-icons/hi";
import {getAllRanking} from "../api/main/getAllRanking";
import MainRank from "./main/MainRank";
import WeeklyProgress from "./progress/WeeklyProgress";

function Main({isLogin}) {
    let navigate = useNavigate();

    const survey = () => {
        navigate("/survey");
    }

    const board = () => {
        if (info.nickname) {
            window.location.replace('/board');
        } else {
            alert('로그인하세요!');
            navigate('/');
        }
    }

    const today = () => {
        navigate("/today");
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
                setDailyHealthMessage('설문을 완료하고, 맞춤형 건강 메시지를 받아보세요!')
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

    return (
        <div className="main-container">
            <div className="main-bg">
                <div className="main">
                    <Container>
                        <Row>
                            <Col>
                                <div className="main-col-box">
                                    {/*<p className="health-message">{dailyHealthMessage}</p>*/}
                                    <p>TODO 1. 오늘의 건강 메시지 표시 할 공간</p>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col style={{maxWidth: '70%'}}>
                                <div className="main-col-box" style={{height: '53%'}}>
                                    <p></p>
                                    <p>TODO 2. 맞춤형 솔루션 표시 할 공간</p>
                                </div>
                                {info.healthcareType === null ? (
                                    <div className="main-col-box" onClick={survey}>
                                        <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                        <p>문진하기</p>
                                    </div>
                                ) : (
                                    <div className="main-col-box">
                                        <WeeklyProgress isLogin={isLogin}/>
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
        </div>
    );
}

export default Main;
