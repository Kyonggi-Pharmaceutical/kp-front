import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Dropdown from 'react-bootstrap/Dropdown';

function SignUp() {
    const { register, handleSubmit } = useForm();
    const onSubmit = (data) => {
        console.log(data);
    };

    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [gender, setGender] = useState("");
    let [dateOfBirth, setDateOfBirth] = useState("");
    let [height, setHeight] = useState();
    let [weight, setWeight] = useState();
    let [mbti, setMbti] = useState("");
    /*프로필 이미지 url??*/

    return (
        <div className="main-bg">
            <div className="main">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>회원가입</h3>
                <div className="form-box">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className="signup-form">
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="email">이메일</label>
                                <input className="form-string-input" type="email" id="email" name="email" {...register("email")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="password">비밀번호</label>
                                <input className="form-string-input" type="password" id="password" name="password" {...register("password")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="confirm-password">비밀번호 확인</label>
                                <input className="form-string-input" type="password" id="confirm-password" name="confirm-password" {...register("confirm")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="lastname">성</label>
                                <input className="form-string-input" type="text" id="lastname" name="lastname" {...register("lastname")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="firstname">이름</label>
                                <input className="form-string-input" type="text" id="firstname" name="firstname" {...register("firstname")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="gender">성별</label>
                                <input className="form-string-input" type="text" id="gender" name="gender" {...register("gender")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="dateOfBirth">생년월일</label>
                                <input className="form-string-input" type="text" id="dateOfBirth" name="dateOfBirth" {...register("dateOfBirth")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="height">키</label>
                                <input className="form-string-input" type="text" id="height" name="height" {...register("height")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="weight">몸무게</label>
                                <input className="form-string-input" type="text" id="weight" name="weight" {...register("weight")} />
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="mbti">MBTI</label>
                                <input className="form-string-input" type="text" id="mbti" name="mbti" {...register("mbti")} />
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