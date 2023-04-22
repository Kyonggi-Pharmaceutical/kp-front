import React from 'react';
import {signUpApi} from "../api/signUpApi"

function ApiTest() {
    const userRequest = {
        nickname: "사용자 닉네임",
        gender: "MALE",
        dateOfBirth: "2000-01-01",
        height: 180,
        weight: 70,
        mbti: "INFP",
        healthcareType: "NORMAL",
        stressPoint: 30,
        isSmoking: false,
        isAlcohol: true,
    };
    const signup = () => {
        signUpApi(userRequest);
    };


    return (
        <div className="main-bg">
            <div className="main">
                <button onClick={signup}>테스트</button>
            </div>
        </div>
    );
}

export default ApiTest;