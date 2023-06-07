import React, { useEffect, useState } from 'react';
import { postUserAnswer } from '../api/postUserAnswer';
import { useNavigate } from 'react-router-dom';
import { getAccomplishmentHealth } from '../api/getAccomplishmentHealth';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

function SatisfySurvey({ info }) {
    const navigate = useNavigate();
    const [userAnswer, setUserAnswer] = useState('');
    const [selectedSatisfaction, setSelectedSatisfaction] = useState('');
    const username = info.lastName + info.firstName;
    const [accomplishment, setAccomplishment] = useState(0);
    const [showDissatisfiedModal, setShowDissatisfiedModal] = useState(false);
    const [showProceedModal, setShowProceedModal] = useState(false);

    useEffect(() => {
        const initWeightInfo = async () => {
            const newinfo = await getAccomplishmentHealth();
            if (newinfo) {
                setAccomplishment(newinfo.accomplishRate);
            }
        };

        initWeightInfo();
    }, []);

    const handleSatisfactionSelect = (satisfaction) => {
        setSelectedSatisfaction(satisfaction);

        if (satisfaction === 'satisfied') {
            setUserAnswer('NORMAL');
            setShowProceedModal(true); // Show the proceed modal
        } else if (satisfaction === 'dissatisfied') {
            setShowDissatisfiedModal(true); // Show the dissatisfied modal
        }
    };

    const handleReasonSelect = (reason) => {
        setUserAnswer(reason);
    };

    const handleSubmit = async () => {
        try {
            await postUserAnswer(userAnswer);
            console.log('User answer successfully saved');
            console.log(userAnswer);
        } catch (error) {
            console.error('API 요청이 실패했습니다:', error);
            alert('API 요청이 실패했습니다. 다시 시도해주세요.');
        }
    };

    const handleCloseDissatisfiedModal = () => {
        setShowDissatisfiedModal(false);
    };


const handleProceed2 = () => {
        navigate('/dietSurvey');
    };

    const handleSkip = () => {
        setShowProceedModal(false);
        navigate('/survey');
    };

    const handleCloseProceedModal = () => {
        setShowProceedModal(false);
    };

    const handleResponseSubmit = () => {
        if (userAnswer) {
            handleSubmit(); // 응답 제출
            setShowDissatisfiedModal(false);
            setShowProceedModal(true); // 다음 모달로 전환
        } else {
            alert('이유를 선택해주세요.');
        }
    };

    return (
        <div className="center-container">
            <div className="main-bgs">
                <div className="month-result">
                    <h4>
                        {`${username}`}님의 달성률은{' '}
                        <span style={{ color: 'orangered', fontWeight: 'bolder', fontSize: '30px' }}>
              {accomplishment}%
            </span>{' '}
                        입니다.
                    </h4>
                </div>
                <h1 className="h2-con">지금까지 만족하셨나요?</h1>
                <div className="low-con">
                    <button className="satisfied-btn" onClick={() => { handleSatisfactionSelect('satisfied'); handleSubmit(); }}>
                        만족
                    </button>
                    <button className="dissatisfied-btn" onClick={() => handleSatisfactionSelect('dissatisfied')}>
                        불만족
                    </button>
                </div>
                <Modal show={showDissatisfiedModal} onHide={handleCloseDissatisfiedModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>불만족한 이유 선택</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <select
                            className="reason-select"
                            value={userAnswer}
                            onChange={(e) => handleReasonSelect(e.target.value)}
                        >
                            <option value="">이유를 선택해주세요</option>
                            <option value="HARD">너무 어려웠다</option>
                            <option value="EASY">너무 쉬웠다</option>
                        </select>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={handleCloseDissatisfiedModal}>
                            닫기
                        </Button>
                        <Button variant="primary" onClick={handleResponseSubmit} disabled={!userAnswer}>
                            응답 제출
                        </Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={showProceedModal} onHide={handleCloseProceedModal}>
                    <Modal.Header closeButton>
                        <Modal.Title>진행 여부</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <p>운동 솔루션을 진행하시겠습니까?</p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="primary" onClick={handleProceed2}>
                            네
                        </Button>
                        <Button variant="secondary" onClick={handleSkip}>
                            아니요
                        </Button>
                    </Modal.Footer>
                </Modal>
            </div>
        </div>
    );
}

export default SatisfySurvey;
