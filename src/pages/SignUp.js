import React, {useState} from 'react';
import { useForm } from "react-hook-form";
import Form from 'react-bootstrap/Form';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SignUp() {
    const { register, handleSubmit} = useForm();

    const onSubmit = (data) => {
        setEmail(data.email);
        setPassword(data.password);
        setConfirm(data.confirm);
        setFirstName(data.firstName);
        setLastName(data.lastName);
        setGender(data.gender);
        setHeight(data.height);
        setWeight(data.weight);
        setMbti(data.mbti);
        console.log(data);
    };
    let [email, setEmail] = useState("");
    let [password, setPassword] = useState("");
    let [confirm, setConfirm] = useState("");
    let [firstName, setFirstName] = useState("");
    let [lastName, setLastName] = useState("");
    let [gender, setGender] = useState("");
    let [height, setHeight] = useState();
    let [weight, setWeight] = useState();
    let [mbti, setMbti] = useState("");
    /*프로필 이미지 url??*/

    function range(start, end, step) {
        const res = [];
        for (let i = start; i < end; i += step) {
            res.push(i);
        }
        return res;
    }

    const years = range(1990, 2024, 1);
    const months = [
        "January",
        "February",
        "March",
        "April",
        "May",
        "June",
        "July",
        "August",
        "September",
        "October",
        "November",
        "December",
    ];
    let [dateOfBirth, setDateOfBirth] = useState(new Date());
    let dateToString = (date) =>{
        let year, month, day;
        year = date.substring(6, 10);
        day = date.substring(3, 5);
        month = date.substring(0, 2);
        return year+"-"+month+"-"+day;
    }
    const CustomInput = ({ value, onClick }) => {
        return(
            <div>
                <input className="form-string-input" type="text" id="dateOfBirth" name="dateOfBirth" value={dateToString(value)} onClick={onClick} {...register("dateOfBirth")} />
            </div>)
    }

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
                                <div className="mb-3">
                                    <label>
                                        <input type="radio" value="MALE" {...register("gender")} />
                                        남
                                    </label>
                                    <label>
                                        <input type="radio" value="FEMALE" {...register("gender")} />
                                        여
                                    </label>
                                </div>
                            </div>
                            <div className="form-input-container">
                                <label className="form-input-label" htmlFor="dateOfBirth">생년월일</label>
                                <DatePicker
                                    renderCustomHeader={({
                                                             date,
                                                             changeYear,
                                                             changeMonth,
                                                             decreaseMonth,
                                                             increaseMonth,
                                                             prevMonthButtonDisabled,
                                                             nextMonthButtonDisabled,
                                                         }) => (
                                        <div
                                            style={{
                                                margin: 10,
                                                display: "flex",
                                                justifyContent: "center",
                                            }}
                                        >
                                            <button onClick={decreaseMonth} disabled={prevMonthButtonDisabled}>
                                                {"<"}
                                            </button>
                                            <select
                                                value={date.getFullYear()}
                                                onChange={({ target: { value } }) => changeYear(value)}
                                            >
                                                {years.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <select
                                                value={months[date.getMonth()]}
                                                onChange={({ target: { value } }) =>
                                                    changeMonth(months.indexOf(value))
                                                }
                                            >
                                                {months.map((option) => (
                                                    <option key={option} value={option}>
                                                        {option}
                                                    </option>
                                                ))}
                                            </select>

                                            <button onClick={increaseMonth} disabled={nextMonthButtonDisabled}>
                                                {">"}
                                            </button>
                                        </div>
                                    )}
                                    selected={dateOfBirth}
                                    onChange={(date) => setDateOfBirth(date)}
                                    customInput={<CustomInput />}
                                />
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