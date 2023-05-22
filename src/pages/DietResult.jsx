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

    const handleClick = async () => {

        const responses = await fetchDailyProgressAPI()
        if(responses.isCheck ==true)
        {
            setIsCheck(true);
            alert('이미 체크하셨습니다!');

        }else {
            if (!isCheck) {
                try {
                    setIsCheck(true);
                    const response = await saveDailyChecked({isCheck: true});
                    if (response) {
                        alert('전송되었습니다!');
                    } else {
                        alert('전송에 실패했습니다!');
                    }
                } catch (error) {
                    console.error('Failed to fetch user info:', error);
                }
            } else {
                alert('이미 체크하셨습니다!');
            }
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
    const renderTileContent = ({ date }) => {
        const dateString = moment(date).format('YYYY-MM-DD');
        const isChecked = trueDates.find((progress) => progress.date === dateString && progress.isCheck);

        return isChecked ? <div className="dot"></div> : null;
    };
    return (
        <div>
            <p>{`${username}`}님,</p>
            {Array.isArray(exerciseList) &&
                exerciseList.map((exercise) => (
                    <div key={exercise.id}>
                        <p>Name: {exercise.name}</p>
                        <p>Type: {exercise.type}</p>
                        <p>Cal: {exercise.cal}</p>
                    </div>
                ))}
            <div>
                <input type="checkbox" checked={isCheck} onChange={handleClick}/>
            </div>
            <div>
                <Calendar
                    onChange={handleDateChange}
                    value={selectedDate}
                    locale="en-EN"
                    tileContent={renderTileContent}
                />
            </div>
        </div>
    );
}

export default ExerciseList;