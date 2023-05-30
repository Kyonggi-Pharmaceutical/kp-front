import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import MBTI from "../api/Mbti/../Mbti";
import Activity from "../api/Activity/../Activity";
import styles from "./StressSurvey.css";
import DailyGoal from "./DailyGoal";
import StressResult from "./StressResult";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Main from "./Main";
import {getUserActivitySolutions} from "../api/activity/getUserActivitySolutions";
import {getUserInfo} from "../api/user/getUserInfo";
import {renewSolutions} from "../api/stresses/renewSolutions";
console.log(MBTI);
console.log(Activity);

export default function SatisfactionResult({info, setUserInfo, healthGoal, setHealthGoal}) {
    const [show, setShow] = useState(false);
    const [activityList, setActivityList] = useState([]);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const Main = () => {
        window.location.replace("/main");
    }
    const location = useLocation();
    const value = location.state.value;
    let comparedStressPoint = info.stressPoint - value;
    const [visible, setVisible] = useState(false);


    useEffect( async () => {
        console.log(info.mbti);
        console.log(info.stressPoint);
        console.log(value);
        console.log(comparedStressPoint);

        const fetchUserActivitySolutions = async () => {
            try {
                const activitySolutions = await getUserActivitySolutions();
                setActivityList(activitySolutions);
            } catch (error) {
                console.error('Failed to fetchUserActivitySolutions:', error);
            }
        };

        await fetchUserActivitySolutions();


    }, []);

    function NO(){
        renewSolutions();

        return(
            <div className='new-solution'>
                <div className='new-solution-text'>NEW!!</div>

                <p>{value}점의 스트레스는 현상유지가 필요합니다.</p>
                {
                    Array.isArray(activityList) && activityList.map((activity, idx) => {
                        return (
                            <div className="activity-item" key={idx}>
                                <p>증상: {activity.symptom}</p>
                                <p>추천활동: {activity.name}</p>
                            </div>
                        )
                    })}
                <Button className="button-custom" variant="outline-danger" onClick={Main}>새 솔루션으로 일일 목표 관리하기</Button>
            </div>

        )
    }


    return (

        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#ed6174", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 결과</h3>
                <p>{`${info.mbti} ${info.lastName} ${info.firstName}`}님의 스트레스 지수는 {comparedStressPoint}점 변화했습니다.</p>
                <p>해당 건강솔루션이 도움이 되었나요? </p>
                <div style={{textAlign: "center"}}>
                    <Button variant="danger" onClick={Main} size='lg'style={{backgroundColor: "#ed6174", textAlign: "center", margin: "20px 20px"}}>YES</Button>
                    <Button variant="danger" onClick={handleShow} size='lg' style={{backgroundColor: "#ed6174", textAlign: "center", margin: "20px 20px"}}>NO</Button>
                </div>

                <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color: "#E63A35", marginLeft: "10px"}}><strong>새로운 솔루션이 도착했어요!</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "20px"}}><NO /></Modal.Body>
                    <Modal.Footer>
                        <Button variant="danger" onClick={handleClose}>
                            닫기
                        </Button>
                    </Modal.Footer>
                </Modal>


            </div>
        </div>
    );
}
