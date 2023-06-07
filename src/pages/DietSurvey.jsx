import {useState} from 'react';
import React, {useEffect} from 'react';
import {saveHealthGoalWeight} from '../api/postExerciseInfo';
import {useNavigate} from 'react-router-dom';
import {saveUserExercises} from '../api/postUserExercise';
import './DietSurvey.css';

function DietSurvey({info}) {
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
        if (!exerciseGroup) {
            alert('운동 목적을 선택하세요.');
            return;
        }

        if (exerciseGroup === 'WEIGHT') {
            if (weightGoal >= info.weight) {
                alert('현재 몸무게보다 높네요. 몸무게를 다시 설정하세요!');
                return;
            }
        } else if (exerciseGroup === 'CARDIO') {
            if (weightGoal < info.weight) {
                alert('현재 몸무게보다 낮네요. 몸무게를 다시 설정하세요!');
                return;
            }
        }
        if(!weightGoal){
            alert('목표 몸무게를 입력하세요!');
            return;
        }

        if (!sleepTime || sleepTime === "none") {
            alert('수면 시간을 선택하세요!');
            return;
        }

        if (!exerciseTime || exerciseTime === "none" ){
            alert('운동 가능한 시간대를 선택하세요!');
            return;
        }


        try {
            await saveHealthGoalWeight(weightGoal);
            console.log('Data successfully saved');
        } catch (error) {
            console.log(error);
            alert('API 요청이 실패했습니다. 다시 시도해주세요.');
        }
        handleClick();
        window.location.replace('/main');
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
                        <h3>{`${username}`}님의 운동 기초 설문지</h3>
                    </label>

                    <form onSubmit={handleSubmit}>
                        <div className="question-container">
                            <p>원하시는 운동 목적이 무엇 입니까? </p>
                            <div className="radio-container">
                            <label >
                                <input type="radio" name="exercisePurpose" value="CARDIO"
                                       onChange={handleExercisePurposeChange}/>
                                <span>체력 향상 및 유지</span>
                            </label>
                            <label>
                                <input type="radio" name="exercisePurpose" value="WEIGHT"
                                       onChange={handleExercisePurposeChange}/>
                                <span>체중 감량</span>
                            </label>
                        </div>
                        </div>
                        <div className="question-container">
                            <label>
                              <p>원하시는 목표 몸무게는 몇 입니까?</p>
                                <input type="text" name="userWeight" onChange={handleWeightGoalChange} placeholder="몸무게를 적어주세요"/>kg
                            </label>
                        </div>
                        <div className="question-container">
                            <label>
                                <p>평소 수면 시간은 어떻게 되십니까?</p>
                                <select value={sleepTime} onChange={(event) => setSleepTime(event.target.value)}>
                                    <option value="none">시간 선택</option>
                                    <option value="4">5시간 이하</option>
                                    <option value="5">5시간에서 6시간</option>
                                    <option value="6">6시간에서 7시간</option>
                                    <option value="7">7시간에서 8시간</option>
                                    <option value="7">8시간 이상</option>
                                </select>
                            </label>
                        </div>
                        <div className="question-container">
                            <label>
                                <p>평소 운동을 하는 시간대는 어떻게 되십니까?</p>
                                <select value={exerciseTime} onChange={(event) => setExerciseTime(event.target.value)}>
                                    <option value="none">시간대 선택</option>
                                    <option value="dawn">새벽</option>
                                    <option value="morning">아침</option>
                                    <option value="afternoon">오후</option>
                                    <option value="evening">저녁</option>
                                </select>
                            </label>
                        </div>
                        <button type="submit">완 료</button>
                    </form>
                </div>
            </div>
        </div>
    )
        ;
}

export default DietSurvey;
