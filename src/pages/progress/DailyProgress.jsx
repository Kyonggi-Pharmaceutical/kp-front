import React, {useEffect, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import {getUserInfo} from '../../api/user/getUserInfo';
import './DailyProgress.css';
import {HiOutlineCheckCircle, HiOutlineXCircle} from 'react-icons/hi';
import {useNavigate} from 'react-router-dom';
import {getUserActivitySolutions} from '../../api/activity/getUserActivitySolutions';
import {putUserDailyProgress} from '../../api/activity/putUserDailyProgress';
import Modal from 'react-bootstrap/Modal';

export default function DailyProgress({isLogin}) {
    let navigate = useNavigate();
    const [info, setInfo] = useState({
        nickname: '',
        fullName: '',
        healthcareType: '',
    });
    const [userActivitySolutions, setUserActivitySolutions] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [dailyProgressDone, setDailyProgressDone] = useState(false);

    useEffect(() => {
        const initUserinfo = async () => {
            const newInfo = await getUserInfo();
            setInfo(newInfo);
            console.log('###' + newInfo.fullName);
        };

        const fetchUserActivitySolutions = async () => {
            try {
                const activitySolutions = await getUserActivitySolutions();
                setUserActivitySolutions(activitySolutions);
            } catch (error) {
                console.error('Failed to fetch user activity solutions:', error);
            }
        };

        fetchUserActivitySolutions();
        initUserinfo();
    }, []);

    const putDailyProgress = async (done) => {
        setDailyProgressDone(done)
        setShowModal(true);
        await putUserDailyProgress(done);
        setTimeout(() => {
            setShowModal(false);
            navigate('/weekly-my-progress', {state: isLogin});
        }, 3000);
    };

    const main = () => {
        navigate('/');
    };

    return (
        <div className="main-bg">
            <div className="main">
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
                                    <p>
                                        <strong>
                                            {index + 1}. {activity.name}
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
                    <Row>
                        <Col
                            className="d-flex justify-content-center"
                            style={{marginTop: '40px'}}
                        >
                            <div>
                                <Button
                                    className="daily-progress-button"
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={main}
                                >
                                    뒤로 가기
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
            <Modal show={showModal} onHide={() => setShowModal(false)} backdrop="static">
                <Modal.Body>
                    {dailyProgressDone ? (
                        <img style={{ width: '300px', height: '300px'}} src={process.env.PUBLIC_URL + '/img/dailyProgressTrue.png'} alt="Default Image"/>
                    ) : (
                        <img style={{ width: '300px', height: '300px'}} src={process.env.PUBLIC_URL + '/img/dailyProgressFalse.png'} alt="Default Image"/>
                    )}
                </Modal.Body>
            </Modal>
        </div>
    );
}
