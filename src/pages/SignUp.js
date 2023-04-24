import React, {useEffect, useState} from 'react';
import {signUpApi} from "../api/signUpApi"
import {getUserInfo} from "../api/getUserInfo";
import { useNavigate } from 'react-router-dom';

//회원가입
function SignUp({isLogin}) {
    //유저 정보 조회
    const navi = useNavigate();
    const [info, setInfo] = useState({
        email: '',
        firstName: '',
        lastName: '',
        stressPoint: 0,
    });
    useEffect(() => {
        if (!isLogin) {
            alert("no");
            navi('/mypage')
        };

        const initUserinfo = async () => {
            let newin = await getUserInfo();
            setInfo(newin);
        };
        initUserinfo();
    }, [isLogin]);


    //dateOfBirth를 입력받기 위한 변수
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

    //제출할 데이터를 저장할 state
    let [formData, setFormData] = useState({
        nickname: "",
        gender: "MALE",
        dateOfBirth: "",
        height: 0.0,
        weight: 0.0,
        mbti: "",
        isSmoking: null,
        isAlcohol: null,
        HealthcareType: null,
        stressPoint: 0,
        year: '1980',
        month: '01',
        day: '01',
    });

    const handleInputChange = (event) => {  //form에서 데이터 입력을 감지하는 handle
        setFormData((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    const onSubmit = (data) => {    //회원가입 버튼을 눌렀을 떄 작동하는 함수
        data.preventDefault();
        const submitData = {    //API 서버로 보낼 사용자 데이터 변수
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
        signUpApi(submitData);  //서버로 제출
        navi("/mypage");
    };

    return (    //회원가입 form
        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>회원가입</h3>
                <div className="form-box">
                    <form onSubmit={onSubmit}>
                        <div className="signup-form">
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="email">이메일</label>
                                <input className="form-string-input" type="email" id="email" name="email" value={info.email} readOnly disabled/>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="lastname">성</label>
                                <input className="form-string-input" type="text" id="lastname" name="lastname" value={info.lastName} readOnly disabled />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="firstname">이름</label>
                                <input className="form-string-input" type="text" id="firstname" name="firstname" value={info.firstName} readOnly disabled />
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