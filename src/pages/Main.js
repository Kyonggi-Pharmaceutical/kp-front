import React from 'react';
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Main.css'
import { HiOutlineClipboardList } from 'react-icons/hi';

function Main() {
    let navigate = useNavigate();

    const survey = () => {
        navigate("/survey");
    }

    return (
        <div className="main-bg">
            <div className="main">
                <Container>
                    <Row>
                        <Col>
                            <div className="main-col-box" onClick={survey}>
                                <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                <p>문진하기</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="main-col-box">
                                <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                <p>~~</p>
                            </div>
                        </Col>
                    </Row>
                    <Row>
                        <Col>1 of 3</Col>
                        <Col>2 of 3</Col>
                        <Col>3 of 3</Col>
                    </Row>
                </Container>

            </div>
        </div>
    );
}

export default Main;