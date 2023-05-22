import { useState } from 'react';
import React, { useEffect } from 'react';
import { saveHealthGoalWeight } from '../api/postExerciseInfo';
import { useNavigate } from 'react-router-dom';
import { saveUserExercises } from '../api/postUserExercise';
import './DietSurvey.css';

function DietSurvey({ info }) {
    const navigate = useNavigate();
    const [exerciseGroup, setExerciseGroup] = useState('');
    const [weightGoal, setWeightGoal] = useState('');
    const username = info.lastName + info.firstName;
    const [sleepTime, setSleepTime] = useState('');
    const [exerciseTime, setExerciseTime] = useState('');


    const handleExercisePurposeChange = (event) => {
        const selectedPurpose = event.target.value;
        setExerciseGroup(selectedPurpose);

    };
    const handleWeightGoalChange = (event) => {
        const userInput = event.target.value;

        if (!/^\d*$/.test(userInput)) {
            alert('숫자만 입력하세요');
            return;
        }

        setWeightGoal(userInput);
    };

    const result = exerciseGroup;

    const handleSubmit = async (event) => {
        event.preventDefault();


        if (exerciseGroup === 'WEIGHT') {
            if (weightGoal >= info.weight) {
                alert('몸무게를 다시 설정하세요.');
                return;
            }
        } else if (exerciseGroup === 'CARDIO') {
            if (weightGoal < info.weight) {
                alert('몸무게를 다시 설정하세요.');
                return;
            }
        }

        if (!sleepTime) {
            alert('수면 시간을 선택하세요.');
            return;
        }

        if (!exerciseTime) {
            alert('운동 가능한 시간을 선택하세요.');
            return;
        }


        try {
            await saveHealthGoalWeight(weightGoal);
            console.log('Data successfully saved');
            navigate('/dietResult?exerciseType=' + result);
        } catch (error) {
            console.log(error);
            alert('API 요청이 실패했습니다. 다시 시도해주세요.');
        }

        // Call the handleClick function after handleSubmit
        handleClick();
    };

    const handleClick = async () => {
        try {
            const response = await saveUserExercises();
            if (response.ok) {
                console.log('User exercises successfully saved');
            }
        } catch (error) {
            console.log(error);
            alert('API 요청이 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="center-container">
            <div className="survey-form">
                <div>
                    <label>
                        <h5>{`${username}`}님, 원하는 운동 목적을 선택해주세요.</h5>
                    </label>
                    <form onSubmit={handleSubmit}>
                        <label>
                            <input type="radio" name="exercisePurpose" value="CARDIO" onChange={handleExercisePurposeChange} />
                            <span>체력 향상 및 유지</span>
                        </label>
                        <label>
                            <input type="radio" name="exercisePurpose" value="WEIGHT" onChange={handleExercisePurposeChange} />
                            <span>체중 감량</span>
                        </label>
                        <br />
                        <label>
                            목표 몸무게:
                            <input type="text" name="userWeight" onChange={handleWeightGoalChange} />
                        </label>
                        <br />
                        <label>
                            수면 시간:
                            <select value={sleepTime} onChange={(event) => setSleepTime(event.target.value)}>
                                <option value="none">선택 안 함</option>
                                <option value="4">4시간</option>
                                <option value="5">5시간</option>
                                <option value="6">6시간</option>
                                <option value="7">7시간</option>
                                <option value="8">8시간</option>
                                <option value="9">9시간 이상</option>
                            </select>
                        </label>
                        <br />
                        <label>
                            운동 가능한 시간:
                            <select value={exerciseTime} onChange={(event) => setExerciseTime(event.target.value)}>
                                <option value="none">선택 안 함</option>
                                <option value="morning">아침</option>
                                <option value="afternoon">오후</option>
                                <option value="evening">저녁</option>
                            </select>
                        </label>
                        <br />
                        <button type="submit">완료</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default DietSurvey;