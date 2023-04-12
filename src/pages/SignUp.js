import React, {useState} from 'react';

function SignUp() {
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
            <div className="sign-page">
                <h3 style={{margin: "25px", color: "#E63A35", fontWeight: "bolder", fontSize: "40px", marginBottom: "40px"}}>회원가입</h3>
                <form>
                    <label>ㄴㅇㄹ</label>
                    <input className="signup-input" type="email" name="email"/>
                    <input className="signup-input" type="password" name="password"/>
                    <input className="signup-input" type="confirm" name="confirm"/>
                    <input className="signup-input" type="firstName" name="firstName"/>
                    <input className="signup-input" type="lastName" name="lastName"/>
                    <input className="signup-input" type="gender" name="gender"/>
                    <input className="signup-input" type="dateOfBirth" name="dateOfBirth"/>
                    <input className="signup-input" type="height" name="height"/>
                    <input className="signup-input" type="weight" name="weight"/>
                    <input className="signup-input" type="mbti" name="mbti"/>
                </form>
            </div>
        </div>
    );
}

export default SignUp;