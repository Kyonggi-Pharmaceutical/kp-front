import React, {useState, useEffect} from 'react';
import {Link, useNavigate} from "react-router-dom";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Main.css'
import { HiOutlineClipboardList } from 'react-icons/hi';
import {getDailyHealthMessage} from "../api/getDailyHealthMessage";
import {getUserInfo} from "../api/user/getUserInfo";

function Main() {
    let navigate = useNavigate();

    const survey = () => {
        navigate("/survey");
    }

    const board = () => {
        // if(info.nickname){
            navigate("/board");
        }
    //     alert('로그인하세요!');
    //     navigate('/');
    // }

    const [info, setInfo] = useState({
        nickname: '',
        fullName: '',
    });
    const [dailyHealthMessage, setDailyHealthMessage] = useState('');

    useEffect(() => {
        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
            console.log("###" + newinfo.fullName);
        };


        const initDailyHealthMessage = async () => {
            try {
                const newMessage = await getDailyHealthMessage()
                setDailyHealthMessage(newMessage.content)
            } catch (e) {
                console.error(e.message)
                setDailyHealthMessage('설문을 완료하고, 맞춤형 건강 메시지를 받아보세요!')
            }

        }
        initDailyHealthMessage()
        initUserinfo()
    }, []);

    return (
        <div className="main-bg">
            <div className="main">
                {
                    info.fullName ? <p>안녕하세요, {info.nickname === null ? info.fullName : info.nickname}님! {dailyHealthMessage}</p> : <></>
                }
                <Container>
                    <Row>
                        <Col>
                            <div className="main-col-box" onClick={survey}>
                                <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                <p>문진하기</p>
                            </div>
                        </Col>
                        <Col>
                            <div className="main-col-box" onClick={board}>
                                <HiOutlineClipboardList size="200"></HiOutlineClipboardList>
                                <p>게시판</p>
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
