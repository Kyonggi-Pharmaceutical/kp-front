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
console.log(MBTI);
console.log(Activity);

export default function SatisfactionResult({info, setUserInfo, healthGoal, setHealthGoal}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const navigate = useNavigate();
    const DailyGoal = () => {
        navigate("/dailyGoal");
    }
    const location = useLocation();
    const value = location.state.value;
    let comparedStressPoint = info.stressPoint - value;
    const [visible, setVisible] = useState(false);


    useEffect( ()=>{

    }, []);

    function NO(){
        return(
            <div className='new-solution'>
                <div className='new-solution-text'>NEW!!</div>
                {MBTI.map((item) => {
                    return (
                        <div
                            key={item.id}
                        >
                            <p>{item.description}</p>
                        </div>
                    )
                })}

                <p>{value}점의 스트레스는 현상유지가 필요합니다.</p>
                <p>ENFP유형은 사회적지지 추구, 정서적 대처, 소망적 사고에 해당하는 스트레스 대처방식을 자주 효과적으로 사용합니다.</p>
                {Activity.map((item) => { return (<p>{`${info.lastName} ${info.firstName}`}님이 무기력할 때, 적절한 스트레스 관리방식은 {item.type}입니다. 또는 스스로 오늘 할 챌린지 한 가지 이상 정하고 지키기나
                    인생의 현실적인 목표 설정하기, 자신과 대화하며 현재 기분을 적어보세요.</p>)
                })}
                <Button className="button-custom" variant="outline-danger" onClick={DailyGoal}>새 솔루션으로 일일 목표 관리하기</Button>
            </div>
        )
    }


    return (

        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 결과</h3>
                <p>ENFP {`${info.lastName} ${info.firstName}`}님의 스트레스 지수는 {comparedStressPoint}점 변화했습니다.</p>
                <p>해당 건강솔루션이 도움이 되었나요? </p>
                <div style={{textAlign: "center"}}>
                    <Button variant="danger" onClick={DailyGoal} size='lg'style={{textAlign: "center", margin: "20px 20px"}}>YES</Button>
                    <Button variant="danger" onClick={handleShow} size='lg' style={{textAlign: "center", margin: "20px 20px"}}>NO</Button>
                </div>

                <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
                    <Modal.Header closeButton>
                        <Modal.Title style={{color: "#E63A35"}}><strong>새로운 솔루션이 도착했어요!</strong></Modal.Title>
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