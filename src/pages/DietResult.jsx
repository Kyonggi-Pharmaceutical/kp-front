import React, {useEffect, useState} from 'react';
import moment from "moment";
import {getExerciseInfo} from '../api/getExerciseInfo';
import {saveDailyChecked} from "../api/postDailyChecked";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import {getDailyProgress} from "../api/getDailyProgress";
import './DietResult.css';

function ExerciseList({info}) {
    const [exerciseList, setExerciseList] = useState([]);
    const [isCheck, setIsCheck] = useState(false);
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [trueDates, setTrueDates] = useState([]);
    const username = info.firstName + info.lastName;

    // 운동 솔루션 제공
    useEffect(() => {
        async function fetchExerciseList() {
            const response1 = await getExerciseInfo();
            setExerciseList(response1);
        }

        fetchExerciseList();
    }, []);

    const fetchDailyProgressAPI = async () => {
        try {
            const response = await fetch(`/api/v1/health/printDailyProgress`);
            const data = await response.json();
            return data;

        } catch (error) {
            console.error('Failed to fetch daily progress:', error);
            return false;
        }
    };

    useEffect(() => {
        fetchInitialData();
    }, []);

    const fetchInitialData = async () => {
        try {
            const response = await fetchDailyProgressAPI();
            setIsCheck(response);
        } catch (error) {
            console.error('Failed to fetch initial data:', error);
        }
    };

    const handleClick = async () => {
        if (isCheck) {
            alert('이미 체크하셨습니다!');
            return;
        }

        try {
            setIsCheck(true);
            const saveResponse = await saveDailyChecked({isCheck: true});
            if (saveResponse) {
                alert('전송되었습니다!');
            } else {
                alert('전송에 실패했습니다!');
            }
        } catch (error) {
            console.error('Failed to fetch user info:', error);
        }
    };

    // 이전 dailyProgress 확인
    const handleDateChange = (date) => {
        setSelectedDate(date);
    };

    useEffect(() => {
        async function fetchDailyProgress() {
            const responses = await getDailyProgress();
            setTrueDates(Array.isArray(responses) ? responses : []);
        }

        fetchDailyProgress();
    }, []);
    const renderTileContent = ({date}) => {
        const dateString = moment(date).format('YYYY-MM-DD');
        const isChecked = trueDates.find((progress) => progress.date === dateString && progress.isCheck);
        return isChecked ? <div className="dot"></div> : null;
    };
    return (
        <div className="center-container">
            <div className="result-form">
                <div className="username">
                    <p>{`${username}`}님,</p>
                </div>
                <div className="content">
                    <div className="calendar-container">
                        <Calendar
                            onChange={handleDateChange}
                            value={selectedDate}
                            locale="en-EN"
                            tileContent={renderTileContent}
                        />
                        <div className="exercise-list">
                            <table>
                                <thead>
                                <tr>
                                    <th>Name</th>
                                    <th>Type</th>
                                    <th>Cal</th>
                                    <th>Time</th>
                                    <th>Checkbox</th>
                                </tr>
                                </thead>
                                <tbody>
                                {Array.isArray(exerciseList) &&
                                    exerciseList.map((exercise) => (
                                        <tr className="exercise-item" key={exercise.id}>
                                            <td>{exercise.name}</td>
                                            <td>{exercise.type}</td>
                                            <td>{exercise.cal}</td>
                                            <td>{exercise.time}</td>
                                            <td>
                                                <input
                                                    className="checkbox-custom"
                                                    type="checkbox"
                                                    checked={isCheck}
                                                    onClick={handleClick}
                                                />
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ExerciseList;