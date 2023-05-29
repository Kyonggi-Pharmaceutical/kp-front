import React, {useEffect, useState} from 'react';
import {signUpApi} from "../api/user/signUpApi"
import {getUserInfo} from "../api/user/getUserInfo";
import { useNavigate } from 'react-router-dom';
import '../App1.css'
import ToggleButton from "react-bootstrap/ToggleButton";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

//회원가입
function SignUp({isLogin}) {
    //유저 정보 조회
    const navigate = useNavigate();
    const [info, setInfo] = useState({
        nickname: null,
        gender: null,
        dateOfBirth: null,
        height: null,
        weight: null,
        mbti: null,
        isSmoking: null,
        isAlcohol: null,
        HealthcareType: null,
        profileImageUrl: null,
        email: null,
        firstName: null,
        lastName: null,
    });
    useEffect(() => {
        const initUserinfo = async () => {
            let newinfo = await getUserInfo();
            setInfo(newinfo);
        };
        initUserinfo();
    }, [isLogin]);


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
        isSmoking: null,
        isAlcohol: null,
        HealthcareType: null,
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
        let EI = '';
        let NS = '';
        let FT = '';
        let JP = '';

        if(EIValue == 1) EI='E'; else EI='I';
        if(NSValue == 1) NS='N'; else NS='S';
        if(FTValue == 1) FT='F'; else FT='T';
        if(JPValue == 1) JP='J'; else JP='P';

        const submitData = {
            nickname: formData.nickname,
            gender: formData.gender,
            dateOfBirth: dateToString(formData.year, formData.month, formData.day),
            height: formData.height,
            weight: formData.weight,
            mbti: EI+NS+FT+JP,
            isSmoking: formData.isSmoking,
            isAlcohol: formData.isAlcohol,
            HealthcareType: formData.HealthcareType,
            stressPoint: formData.stressPoint,
        }
        signUpApi(submitData);
        navigate('/main');
    };

    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'MALE', value: '1' },
        { name: 'FEMALE', value: '2' },
    ];


    const navigateToMbti = () => {
        window.open('https://www.16personalities.com/ko/%EB%AC%B4%EB%A3%8C-%EC%84%B1%EA%B2%A9-%EC%9C%A0%ED%98%95-%EA%B2%80%EC%82%AC', "_blank", "noopener, noreferrer");
    };

    const [EIValue, setEIValue] = useState('1');
    const [NSValue, setNSValue] = useState('1');
    const [FTValue, setFTValue] = useState('1');
    const [JPValue, setJPValue] = useState('1');

    return (
        <div className="main-bgs" style={{width: "50%", height : "80%"}}>
            <div className="article-box">
                <h3 className="small-title">회원가입</h3>
                <div style={{width: "70%", margin: "0 auto"}}>
                    <button onClick={navigateToMbti} style={{fontSize: "20px"}}>MBTI 검사하기</button>
                    <form onSubmit={onSubmit}>
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
                            <ButtonGroup style={{display: "flex", justifyContent: "center", marginTop: "auto"}}>
                                {radios.map((radio, idx) => (
                                    <ToggleButton
                                        key={idx}
                                        id={`radio-${idx}`}
                                        type="radio"
                                        variant="outline-success"
                                        name="radio"
                                        value={radio.value}
                                        checked={radioValue === radio.value}
                                        onChange={(e) => {
                                            setRadioValue(e.currentTarget.value)
                                            formData.gender = radio.name;
                                        }}
                                    >
                                        {radio.name}
                                    </ToggleButton>
                                ))}
                            </ButtonGroup>
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
                            <SelectMbti setEIValue={setEIValue} setNSValue={setNSValue} setFTValue={setFTValue} setJPValue={setJPValue} EIValue={EIValue} NSValue={NSValue} FTValue={FTValue} JPValue={JPValue}/>
                        </div>
                        <button type="submit" className="submit-btn">회원가입</button>
                    </form>
                </div>
            </div>
        </div>
    );
}

function SelectMbti ({setEIValue, setNSValue, setFTValue, setJPValue, EIValue, FTValue, NSValue, JPValue})  {
    const radiosEI = [
        { name: 'E', value: '1' },
        { name: 'I', value: '2' },
    ];
    const radiosNS = [
        { name: 'N', value: '1' },
        { name: 'S', value: '2' },
    ];
    const radiosFT = [
        { name: 'F', value: '1' },
        { name: 'T', value: '2' },
    ];
    const radiosJP = [
        { name: 'J', value: '1' },
        { name: 'P', value: '2' },
    ];

    return (
        <div style={{width: "60%", margin: "0 auto"}}>
            <ButtonGroup style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                {radiosEI.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}-ei`}
                        type="radio"
                        variant="outline-dark"
                        name="radio1"
                        value={radio.value}
                        checked={EIValue === radio.value}
                        onChange={(e) => {
                            setEIValue(e.currentTarget.value)
                        }}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <ButtonGroup style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                {radiosNS.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}-ns`}
                        type="radio"
                        variant="outline-dark"
                        name="radio2"
                        value={radio.value}
                        checked={NSValue === radio.value}
                        onChange={(e) => {
                            setNSValue(e.currentTarget.value)
                        }}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <ButtonGroup style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                {radiosFT.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}-ft`}
                        type="radio"
                        variant="outline-dark"
                        name="radio3"
                        value={radio.value}
                        checked={FTValue === radio.value}
                        onChange={(e) => {
                            setFTValue(e.currentTarget.value)
                        }}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
            <ButtonGroup style={{display: "flex", justifyContent: "center", marginTop: "5px"}}>
                {radiosJP.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}-jp`}
                        type="radio"
                        variant="outline-dark"
                        name="radio4"
                        value={radio.value}
                        checked={JPValue === radio.value}
                        onChange={(e) => {
                            setJPValue(e.currentTarget.value)
                        }}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    )
}

export default SignUp;