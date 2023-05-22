import React, {useState, useEffect} from 'react';
import {useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Table from "react-bootstrap/Table";
import './Main.css'
import {getDailyHealthMessage} from "../api/main/getDailyHealthMessage";
import {getUserInfo} from "../api/user/getUserInfo";
import {HiOutlineClipboardList} from "react-icons/hi";
import {TbBarbell, TbYoga} from "react-icons/tb";
import {getAllRanking} from "../api/main/getAllRanking";

function Main() {
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
    const [currentTableIndex, setCurrentTableIndex] = useState(0);

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

    const handleTableButtonClick = (index) => {
        setCurrentTableIndex(index);
    };

    return (
        <div className="main-bg">
            <div className="main">
                {
                    info.fullName ? (
                        <div className="greeting">
                            <p className="greeting-text">
                                안녕하세요, {info.nickname ? info.nickname : info.fullName}님!
                            </p>
                            <p className="health-message">{dailyHealthMessage}</p>
                        </div>
                    ) : (
                        <div className="greeting" style={{marginTop: '120px', marginBottom: '120px'}}>
                            <p className="greeting-text">여러분의 건강을 책임지는 16Healthcare 입니다.</p>
                            <p className="greeting-text">MBTI에 따른 맞춤형 운동 및 스트레스 관리 방법을 추천받아보세요!</p>
                            <p className="health-message">우측 상단에 로그인 버튼을 눌러 건강관리를 시작해볼까요?</p>
                        </div>
                    )
                }

                {info.healthcareType === 'STRESS' && (
                    <Container>
                        <Row>
                            <Col>
                                <div className="main-col-box" onClick={today}>
                                    <TbYoga size="200"></TbYoga>
                                    <p>오늘의 활동 체크</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="main-col-box" onClick={board}>
                                    <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                    <p>게시판</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
                {info.healthcareType === 'HEALTH' && (
                    <Container>
                        <Row>
                            <Col>
                                <div className="main-col-box" onClick={today}>
                                    <TbBarbell size="200"></TbBarbell>
                                    <p>오늘의 운동 체크</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="main-col-box" onClick={board}>
                                    <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                    <p>게시판</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
                {info.healthcareType === null && (
                    <Container>
                        <Row>
                            <Col>
                                <div className="main-col-box" onClick={survey}>
                                    <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                    <p>문진하기</p>
                                </div>
                            </Col>
                            <Col>
                                <div className="main-col-box" onClick={board}>
                                    <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                    <p>게시판</p>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                )}
                <Container style={{marginTop: '20px'}}>
                    <Row>
                        <Col>
                            {currentTableIndex === 0 && (
                                <Table striped hover borderless className={"table-col-box table-no-cursor ranking-table-container"}>
                                    <thead>
                                    <tr>
                                        <th colSpan={3} className="text-center">
                                            <h4>일간 사용자 랭킹</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>순위</th>
                                        <th>닉네임</th>
                                        <th>진척도</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {dailyAllRanking.map((user, index) => (
                                        <tr key={user.rank}>
                                            <td>{user.rank}</td>
                                            <td>{user.nickname}</td>
                                            <td>{user.progressRate}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )}
                            {currentTableIndex === 1 && (
                                <Table striped hover borderless className={"table-col-box table-no-cursor ranking-table-container"}>
                                    <thead>
                                    <tr>
                                        <th colSpan={3} className="text-center">
                                            <h4>주간 사용자 랭킹</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>순위</th>
                                        <th>닉네임</th>
                                        <th>진척도</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {weeklyAllRanking.map((user, index) => (
                                        <tr key={user.rank}>
                                            <td>{user.rank}</td>
                                            <td>{user.nickname}</td>
                                            <td>{user.progressRate}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )}
                            {currentTableIndex === 2 && (
                                <Table striped hover borderless className={"table-col-box table-no-cursor ranking-table-container"}>
                                    <thead>
                                    <tr>
                                        <th colSpan={3} className="text-center">
                                            <h4>월간 사용자 랭킹</h4>
                                        </th>
                                    </tr>
                                    <tr>
                                        <th>순위</th>
                                        <th>닉네임</th>
                                        <th>진척도</th>
                                    </tr>
                                    </thead>
                                    <tbody>
                                    {monthlyAllRanking.map((user, index) => (
                                        <tr key={user.rank}>
                                            <td>{user.rank}</td>
                                            <td>{user.nickname}</td>
                                            <td>{user.progressRate}</td>
                                        </tr>
                                    ))}
                                    </tbody>
                                </Table>
                            )}
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <div className="table-buttons">
                                <button
                                    className={`table-button ${currentTableIndex === 0 ? 'active' : ''}`}
                                    onClick={() => handleTableButtonClick(0)}
                                >
                                    <span>일간</span>
                                </button>
                                <button
                                    className={`table-button ${currentTableIndex === 1 ? 'active' : ''}`}
                                    onClick={() => handleTableButtonClick(1)}
                                >
                                    <span>주간</span>
                                </button>
                                <button
                                    className={`table-button ${currentTableIndex === 2 ? 'active' : ''}`}
                                    onClick={() => handleTableButtonClick(2)}
                                >
                                    <span>월간</span>
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}

export default Main;
