import React, {useEffect, useState} from 'react';
import { useLocation } from "react-router-dom";
import stress from '../pages/StressSurvey';
import Checkbox from "../components/CheckBox";
import StressSurvey from "../pages/StressSurvey";
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export default function SatisfactionSurvey(info, healthGoal) {
    const month = 1;

    useEffect( ()=>{
        console.log(info.stressPoint)
    }, [info]);

    const [show, setShow] = useState(true);
    const handleClose = () => setShow(false);

    return (
        <>
            <Modal show={show} onHide={handleClose} animation={false} size="lg" centered>
                <Modal.Header closeButton>
                    <Modal.Title style={{color: "#E63A35"}}><strong>월간 만족도 조사</strong></Modal.Title>
                </Modal.Header>
                <Modal.Body style={{fontSize: "25px"}}>지난 달에 비해 얼마나 스트레스가 개선되었는지 확인해보세요!</Modal.Body>
                <Modal.Footer>
                    <Button variant="danger" onClick={handleClose}>
                        확인!
                    </Button>
                </Modal.Footer>
            </Modal>

            <StressSurvey month={1} />
        </>
    );
}