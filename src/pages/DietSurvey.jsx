import { useState } from 'react';
import React, {useEffect} from 'react';
import {saveHealthGoalWeight } from '../api/postExerciseInfo'
import { useNavigate } from 'react-router-dom';
import {saveUserExercises} from "../api/postUserExercise";


function DietSurvey({ info }) {
    const navigate = useNavigate();
    const [exerciseGroup, setExerciseGroup] = useState('');
    const [weightGoal, setWeightGoal] = useState('');
    const username = info.lastName + info.firstName;

    const handleExercisePurposeChange = (event) => {
        setExerciseGroup(event.target.value);
    };
    const handleWeightGoalChange = (event) => {
        setWeightGoal(event.target.value);
    };
    const result = exerciseGroup;
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent the default form submission behavior

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
        <div>
            <p>{`${username}`}님, 원하는 운동 목적을 선택해주세요.</p>
            <form onSubmit={handleSubmit}>
                <label>
                    <input type="radio" value="CARDIO" onChange={handleExercisePurposeChange} />
                    <span>체력 향상 및 유지</span>
                </label>
                <label>
                    <input type="radio" value="WEIGHT" onChange={handleExercisePurposeChange} />
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
                    <select>
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
                    <select>
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
    );
}

export default DietSurvey;