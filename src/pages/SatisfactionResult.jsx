import React, {useEffect, useState} from 'react';
import {useNavigate} from 'react-router-dom';
import {useLocation} from "react-router-dom";
import MBTI from "../api/Mbti/../Mbti";
import Activity from "../api/Activity/../Activity";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import {getUserActivitySolutions} from "../api/activity/getUserActivitySolutions";
import {renewSolutions} from "../api/stresses/renewSolutions";

console.log(MBTI);
console.log(Activity);

export default function SatisfactionResult({info, setUserInfo, healthGoal, setHealthGoal}) {
    const [show, setShow] = useState(false);
    const [activityList, setActivityList] = useState([]);

    const navigate = useNavigate();

    const handleClose = () => {
        setShow(false);
        satisfactionSurvey();
    }
    const handleShow = () => setShow(true);

    const Main = () => {
        window.location.replace("/main");
    }

    const satisfactionSurvey = () => {
        window.location.replace("/satisfactionSurvey");
    }
    const survey = () => {
        navigate('/survey');
    }

    const location = useLocation();
    const value = location.state.value;
    let comparedStressPoint = info.stressPoint - value;
    const [visible, setVisible] = useState(false);


    useEffect(() => {
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

        fetchUserActivitySolutions();


    }, [comparedStressPoint, info.mbti, info.stressPoint, value]);

    function NO() {
        renewSolutions();

        return (
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
                <h3 style={{
                    margin: "25px",
                    color: "#ed6174",
                    fontWeight: "bolder",
                    fontSize: "40px",
                    marginBottom: "40px"
                }}>설문 결과</h3>
                <p>{`${info.mbti} ${info.lastName} ${info.firstName}`}님의 스트레스 지수는 {comparedStressPoint}점 변화했습니다.</p>
                <p>해당 스트레스 관리 솔루션이 도움이 되어 계속 솔루션을 제공받고 싶으시다면 yes를 눌러주세요!</p>
                <div style={{textAlign: "center"}}>
                    <Button variant="danger" onClick={handleShow} size='lg'
                            style={{backgroundColor: "#ed6174", textAlign: "center", margin: "20px 20px"}}>YES</Button>
                    <Button variant="danger" onClick={survey} size='lg'
                            style={{backgroundColor: "#ed6174", textAlign: "center", margin: "20px 20px"}}>NO</Button>
                </div>

                <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color: "#E63A35", marginLeft: "10px"}}><strong>새로운 스트레스 관리를
                            시작해보세요!</strong></Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{fontSize: "20px"}}><NO/></Modal.Body>
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
