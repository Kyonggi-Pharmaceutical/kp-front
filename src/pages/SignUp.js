import React, {useEffect, useState} from 'react';
import {useSelector} from "react-redux";
import {signUpApi} from "../api/signUpApi"

//회원가입
function SignUp(userInfo) {
    let userStore = userInfo.userInfo;

    //변수
    const YEAR = [];
    const nowYear = new Date().getFullYear();
    for (let i = 1980; i <= nowYear; i++) {
        YEAR.push(i);
    }
    const MONTH = [];
    for (let i = 1; i <= 12; i++) {
        let m = String(i).padStart(2, '0');
        MONTH.push(m);
    }
    const DAY = [];
    for (let i = 1; i <= 31; i++) {
        let d = String(i).padStart(2, '0');
        DAY.push(d);
    }

    const dateToString = (year, month, day) => {
        return year + "-" + month + "-" + day
    }
    let [formData, setFormData] = useState({
        nickname: "",
        gender: "MALE",
        dateOfBirth: "",
        height: 0.0,
        weight: 0.0,
        mbti: "",
        isSmoking: true,
        isAlcohol: true,
        HealthcareType: "HEALTH",
        stressPoint: 0,
        year: '1980',
        month: '01',
        day: '01',
    });

    const handleInputChange = (event) => {
        setFormData((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };
    const onSubmit = (data) => {
        data.preventDefault();
        const submitData = {
            nickname: formData.nickname,
            gender: formData.gender,
            dateOfBirth: dateToString(formData.year, formData.month, formData.day),
            height: formData.height,
            weight: formData.weight,
            mbti: formData.mbti,
            isSmoking: formData.isSmoking,
            isAlcohol: formData.isAlcohol,
            HealthcareType: formData.HealthcareType,
            stressPoint: formData.stressPoint,
        }
        signUpApi(submitData);
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
                                <input className="form-string-input" type="email" id="email" name="email" value={userStore.email} readOnly disabled/>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="lastname">성</label>
                                <input className="form-string-input" type="text" id="lastname" name="lastname" value={userStore.lastName} readOnly disabled />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="firstname">이름</label>
                                <input className="form-string-input" type="text" id="firstname" name="firstname" value={userStore.firstName} readOnly disabled />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="firstname">별명</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="nickname" name="nickname" value={formData.nickname}/>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="gender">성별</label>
                                <div className="mb-3">
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="MALE"
                                            checked={formData.gender === 'MALE'}
                                            onChange={handleInputChange}
                                        />
                                        남성
                                    </label>
                                    <label>
                                        <input
                                            type="radio"
                                            name="gender"
                                            value="FEMALE"
                                            checked={formData.gender === 'FEMALE'}
                                            onChange={handleInputChange}
                                        />
                                        여성
                                    </label>
                                </div>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="height">생년월일</label>
                                <div style={{display: 'flex'}}>
                                    <select className="select" name="year" onChange={handleInputChange}>
                                        {YEAR.map(y => {
                                            return <option key={y}>{y}</option>;
                                        })}
                                    </select>
                                    <select className="select" name="month" onChange={handleInputChange}>
                                        {MONTH.map(m => {
                                            return <option key={m}>{m}</option>;
                                        })}
                                    </select>
                                    <select className="select" name="day" onChange={handleInputChange}>
                                        {DAY.map(d => {
                                            return <option key={d}>{d}</option>;
                                        })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="height">키</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="height" name="height" value={formData.height} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="weight">몸무게</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="weight" name="weight" value={formData.weight} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="mbti">MBTI</label>
                                <input onChange={handleInputChange} className="form-string-input" type="text" id="mbti" name="mbti" value={formData.mbti} />
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