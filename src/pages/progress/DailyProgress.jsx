import React, {useEffect, useState} from 'react';
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import {getUserInfo} from "../../api/user/getUserInfo";
import "./DailyProgress.css";
import {HiOutlineCheckCircle, HiOutlineXCircle} from "react-icons/hi";
import {useNavigate} from "react-router-dom";

export default function DailyProgress({isLogin}) {
    let navigate = useNavigate();

    const main = () => {
        navigate("/");
    }

    const [info, setInfo] = useState({
        nickname: '',
        fullName: '',
        healthcareType: '',
    });

    useEffect(() => {


        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
            console.log("###" + newinfo.fullName);
        };

        initUserinfo()
    }, []);

    return (
        <div className="main-bg">
            <div className="main">
                <Container>
                    <Row>
                        <h3>일일 진척도 체크</h3>
                        <div className="start-page">
                            <p><strong>{`${info.lastName} ${info.firstName}`.replace(/\s+/g, "")}</strong>님의 솔루션 입니다</p>
                            <p><strong>1. 운동하기</strong></p>
                            <p><strong>2. 살빼기</strong></p>
                            <p><strong>3. 숨쉬기</strong></p>
                            <p>달성하셨나요?</p>
                        </div>
                    </Row>
                    <Row>
                        <Col>
                            <div className="daily-progress-col-box" onClick={"/"}>
                                <HiOutlineCheckCircle size="200"></HiOutlineCheckCircle>
                                <p>YES</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="daily-progress-col-box" onClick={"/"}>
                                <HiOutlineXCircle size="200"></HiOutlineXCircle>
                                <p>NO</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col className="d-flex justify-content-center" style={{marginTop: '40px'}}>
                            <div>
                                <Button
                                    className="daily-progress-button"
                                    variant="outline-danger"
                                    size="lg"
                                    onClick={main}
                                >
                                    뒤로 가기
                                </Button>
                            </div>
                        </Col>
                    </Row>
                </Container>
            </div>
        </div>
    );
}
