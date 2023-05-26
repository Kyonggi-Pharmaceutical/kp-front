import React, { useState } from 'react';
import { postUserAnswer } from '../api/postUserAnswer';
import { useNavigate } from 'react-router-dom';

function SatisfySurvey() {
    const navigate = useNavigate();
    const [userAnswer, setUserAnswer] = useState('');
    const [selectedSatisfaction, setSelectedSatisfaction] = useState('');
    const [selectedReason, setSelectedReason] = useState('');

    const handleSatisfactionSelect = (satisfaction) => {
        setSelectedSatisfaction(satisfaction);

        if (satisfaction === 'satisfied') {
            setUserAnswer('NORMAL');
        } else if (satisfaction === 'dissatisfied') {
            setSelectedReason('');
        }
    };

    const handleReasonSelect = (reason) => {
        setSelectedReason(reason);

        if (reason === 'too-hard') {
            setUserAnswer('HARD');
            navigate('/survey');
        } else if (reason === 'too-easy') {
            setUserAnswer('EASY');
            navigate('/dietsurvey');
        }
    };

    const handleSubmit = async () => {
        try {
            await postUserAnswer(userAnswer);
            console.log('User answer successfully saved');
        } catch (error) {
            console.error('API 요청이 실패했습니다:', error);
            alert('API 요청이 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div>
            <h1 className="h2-con">지금까지 만족하셨나요?</h1>
            <button
                className="satisfied-btn"
                onClick={() => {
                    handleSatisfactionSelect('satisfied');
                    handleSubmit();
                }}
            >
                만족
            </button>
            <button
                className="dissatisfied-btn"
                onClick={() => handleSatisfactionSelect('dissatisfied')}
            >
                불만족
            </button>

            {selectedSatisfaction === 'dissatisfied' && (
                <div className="reason-section">
                    <h2 className="de-con">불만족한 이유 선택</h2>
                    <select
                        className="reason-select"
                        value={selectedReason}
                        onChange={(e) => handleReasonSelect(e.target.value)}
                    >
                        <option value="">이유를 선택해주세요</option>
                        <option value="too-hard">너무 어려웠다</option>
                        <option value="too-easy">너무 쉬웠다</option>
                    </select>
                    <button className="submit-btn" onClick={handleSubmit}>
                        응답 제출
                    </button>
                </div>
            )}

            {selectedSatisfaction === 'satisfied' && (
                <div>
                    <h2 className="de-con">진행 여부</h2>
                    <button className="proceed-btn" onClick={() => navigate('/dietsurvey')}>
                        진행한다
                    </button>
                    <button className="skip-btn" onClick={() => navigate('/survey')}>
                        안한다
                    </button>
                </div>
            )}
        </div>
    );
}

export default SatisfySurvey;