import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {signUpApi} from "../api/signUpApi"

//회원가입
function SignUp() {
    //store에 저장된 user정보 불러오기
    let userInfo = useSelector((state) => {
        return state.user;
    });

    //변수
    let [dateOfBirth, setDateOfBirth] = useState(new Date().toLocaleDateString().replace(/\./g, '').replace(/\s/g, '-'));
    let [signUpData, setSignUpData] = useState({
        nickname: "helpme",
        gender: "",
        dateOfBirth: "2022-02-02",
        height: 0.0,
        weight: 0.0,
        mbti: "",
        isSmoking: true,
        isAlcohol: true,
        HealthcareType: "HEALTH",
        stressPoint: 0,
    });
    const handleInputChange = (event) => {
        setSignUpData((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };
    const onSubmit = (data) => {
        data.preventDefault();
        console.log(signUpData);
        signUpApi(signUpData);
        //signUpApi();
    };


    return (
        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>회원가입</h3>
                <div className="form-box">
                    <form onSubmit={onSubmit}>
                        <div className="signup-form">
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="email">이메일</label>
                                <input className="form-string-input" type="email" id="email" name="email" value={userInfo.email} readOnly disabled/>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="lastname">성</label>
                                <input className="form-string-input" type="text" id="lastname" name="lastname" value={userInfo.lastName} readOnly disabled />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="firstname">이름</label>
                                <input className="form-string-input" type="text" id="firstname" name="firstname" value={userInfo.firstName} readOnly disabled />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="gender">성별</label>
                                <div className="mb-3">
                                    <input onChange={handleInputChange} className="form-string-input" type="text" id="gender" name="gender" value={signUpData.gender} />
                                </div>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="height">생년월일</label>

                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="height">키</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="height" name="height" value={signUpData.height} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="weight">몸무게</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="weight" name="weight" value={signUpData.weight} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="mbti">MBTI</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="mbti" name="mbti" value={signUpData.mbti} />
                            </div>
                            <button type="submit" className="submit-btn">회원가입</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default SignUp;