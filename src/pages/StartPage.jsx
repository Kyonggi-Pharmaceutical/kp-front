import React, {useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import {getUserInfo} from "../api/user/getUserInfo";

export default function StartPage({ isLogin }) {
    const navigate = useNavigate();
    const stressSurvey = () => {
        navigate("/stressSurvey");
    }
    const dietSurvey = () => {
        navigate("/dietSurvey");
    }
    const main = () => {
        navigate("/main");
    }

    const [info, setInfo] = useState({
        nickname: '',
        fullName: ''
    });

    useEffect( ()=>{
        if (!isLogin) navigate('/');

        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setInfo(newinfo);
        };

        initUserinfo();
    }, [isLogin]);

    if(info) {
        return (

            <div className="main-bg">
                <div className="main">
                    <h3 style={{
                        margin: "25px",
                        color: "#E63A35",
                        fontWeight: "bolder",
                        fontSize: "40px",
                        marginBottom: "40px"
                    }}>설문 시작하기</h3>
                    <div className="start-page">
                        <p><strong>{`${info.lastName} ${info.firstName}`.replace(/\s+/g, "")}</strong>님, 무슨 건강관리를 원하시나요?
                        </p>
                        <div>
                            <Button className="button-custom" variant="outline-danger" size="lg"
                                    onClick={dietSurvey}>체중관리</Button>
                            <Button className="button-custom" variant="outline-danger" size="lg"
                                    onClick={stressSurvey}>스트레스관리</Button>
                            <Button className="button-custom" variant="outline-danger" size="lg"
                                    onClick={main}>돌아가기</Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}
