import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
<<<<<<< HEAD
import Button from 'react-bootstrap/Button';
=======
>>>>>>> 7b6454b (feature : 솔루션 시작, 관리카테고리 선택 페이지 개발)

export default function StartPage({ isLogin, info }) {
    const navigate = useNavigate();
    const username = info.lastName + info.firstName;
    const stressSurvey = () => {
        navigate("/stressSurvey?name="+username);
    }
    const dietSurvey = () => {
        navigate("/dietSurvey?name="+username);
    }
<<<<<<< HEAD
    const home = () => {
        navigate("/");
    }
=======
>>>>>>> 7b6454b (feature : 솔루션 시작, 관리카테고리 선택 페이지 개발)

    useEffect( ()=>{
        if (!isLogin) navigate('/');
    }, [isLogin, info]);

    return (
<<<<<<< HEAD

        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 시작하기</h3>
                <div className="start-page">
                    <p><strong>{`${info.lastName} ${info.firstName}`.replace(/\s+/g, "")}</strong>님, 무슨 건강관리를 원하시나요?</p>
                    <div>
                        <Button className="button-custom" variant="outline-danger" size="lg" onClick={dietSurvey}>체중관리</Button>
                        <Button className="button-custom" variant="outline-danger" size="lg" onClick={stressSurvey}>스트레스관리</Button>
                        <Button className="button-custom" variant="outline-danger" size="lg" onClick={home}>돌아가기</Button>
                    </div>
                </div>
=======

        <div className="main-bg">
            <div className="start-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>설문 시작하기</h3>
                <p>{`${info.lastName} ${info.firstName}`}님, 무슨 건강관리를 원하시나요?</p>
                    <div className="submit-button" onClick={dietSurvey}>체중</div>
                    <div className="submit-button" onClick={stressSurvey}>스트레스</div>

>>>>>>> 7b6454b (feature : 솔루션 시작, 관리카테고리 선택 페이지 개발)
            </div>
        </div>
    );
}