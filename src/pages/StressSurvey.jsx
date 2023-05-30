import React, {createRef, useEffect, useRef, useState} from 'react';
import { useNavigate } from "react-router-dom";
import { putStressPoint } from '../api/stresses/putStressPoint'
import { renewSolutions } from "../api/stresses/renewSolutions";
import { createSolutions} from "../api/stresses/createSolution";
import styles from './StressSurvey.css';
import Questions from "../api/StressQuestion/../StressQuestion";
import {getValue} from "@testing-library/user-event/dist/utils";
import { FiEdit2 } from "react-icons/fi";

console.log(Questions);
export default function StressSurvey({month, stressResult}){
    const [loading, setLoading] = useState(false);
    const [num, setNum] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [stress, setStress] = useState(0);
    let [btnActive, setBtnActive] = useState();
    let [btnActive1, setBtnActive1] = useState();
    let [btnActive2, setBtnActive2] = useState();
    let [btnActive3, setBtnActive3] = useState();
    let [btnActive4, setBtnActive4] = useState();
    let [btnActive5, setBtnActive5] = useState();
    let [btnActive6, setBtnActive6] = useState();
    let [btnActive7, setBtnActive7] = useState();
    let [btnActive8, setBtnActive8] = useState();


    const data = ["매우 아니다", "아니다", "보통", "그렇다", "매우 그렇다"];
    const buttonRef = useRef({
        isDoubleClick: false
    });
    const buttonRef1 = useRef({
        isDoubleClick1: false
    });
    const buttonRef2 = useRef({
        isDoubleClick2: false
    });
    const buttonRef3 = useRef({
        isDoubleClick3: false
    });
    const buttonRef4 = useRef({
        isDoubleClick4: false
    });
    const buttonRef5 = useRef({
        isDoubleClick5: false
    });
    const buttonRef6 = useRef({
        isDoubleClick6: false
    });
    const buttonRef7 = useRef({
        isDoubleClick7: false
    });
    const buttonRef8 = useRef({
        isDoubleClick8: false
    });


    const slideRef = createRef(null);
    const TOTAL_QUESTIONS = 9;
    const navigate = useNavigate();

    const nextSlide = (idx) => {
        setStress(stress + idx);
        setNum(num + 1);
        setCurrentSlide(currentSlide + 1);



        // slideRef.current.style.transform += 'translateX(-100vw)';
    };

    const toggleActive = (event) => {
        if(buttonRef.current.isDoubleClick){
                return;
            }
        setBtnActive((prev) => {
            return event.target.value;
        });
        buttonRef.current.isDoubleClick = true;
    };

    const toggleActive1 = (event) => {
        if(buttonRef1.current.isDoubleClick1){
            return;
        }
        setBtnActive1((prev) => {
            return event.target.value;
        });
        buttonRef1.current.isDoubleClick1 = true;
    };

    const toggleActive2 = (event) => {
        if(buttonRef2.current.isDoubleClick2){
            return;
        }
        setBtnActive2((prev) => {
            return event.target.value;
        });
        buttonRef2.current.isDoubleClick2 = true;
    };

    const toggleActive3 = (event) => {
        if(buttonRef3.current.isDoubleClick3){
            return;
        }
        setBtnActive3((prev) => {
            return event.target.value;
        });
        buttonRef3.current.isDoubleClick3 = true;
    };
    const toggleActive4 = (event) => {
        if(buttonRef4.current.isDoubleClick4){
            return;
        }
        setBtnActive4((prev) => {
            return event.target.value;
        });
        buttonRef4.current.isDoubleClick4 = true;
    };
    const toggleActive5 = (event) => {
        if(buttonRef5.current.isDoubleClick5){
            return;
        }
        setBtnActive5((prev) => {
            return event.target.value;
        });
        buttonRef5.current.isDoubleClick5 = true;
    };
    const toggleActive6 = (event) => {
        if(buttonRef6.current.isDoubleClick6){
            return;
        }
        setBtnActive6((prev) => {
            return event.target.value;
        });
        buttonRef6.current.isDoubleClick6 = true;
    };
    const toggleActive7 = (event) => {
        if(buttonRef7.current.isDoubleClick7){
            return;
        }
        setBtnActive7((prev) => {
            return event.target.value;
        });
        buttonRef7.current.isDoubleClick7 = true;
    };
    const toggleActive8 = (event) => {
        if(buttonRef8.current.isDoubleClick8){
            return;
        }
        setBtnActive8((prev) => {
            return event.target.value;
        });
        buttonRef8.current.isDoubleClick8 = true;
    };


    useEffect(() => {
        let result = stress;

        putStressPoint(result).then(r => result);



        if (num > 8 && month == 0){ navigate("/stressResult?result="+result, {
            state:{ value : parseInt(result) },
        })

            try {
                const response = renewSolutions();;
                if (response.ok) {
                    console.log('User StressSolution created');
                }
            } catch (error) {
                console.log(error);
                alert('API 요청이 실패했습니다. 다시 시도해주세요.');
            }

            try {
                const response = createSolutions();;
                if (response.ok) {
                    console.log('User StressGoal created');
                }
            } catch (error) {
                console.log(error);
                alert('API 요청이 실패했습니다. 다시 시도해주세요.');
            }


        }else if (num > 8 && month == 1){ navigate("/satisfactionResult?result="+result, {
            state:{ value : parseInt(stress) },
        })

            try {
                const response = renewSolutions();;
                if (response.ok) {
                    console.log('User StressSolution created');
                }
            } catch (error) {
                console.log(error);
                alert('API 요청이 실패했습니다. 다시 시도해주세요.');
            }

            try {
                const response = createSolutions();;
                if (response.ok) {
                    console.log('User StressGoal created');
                }
            } catch (error) {
                console.log(error);
                alert('API 요청이 실패했습니다. 다시 시도해주세요.');
            }


        };

    }, [currentSlide]);

    return (
        <div className="main-bg" style={{height:"550px"}}>
            <div className="stress-survey-form">
                <h3 className="small-title" style={{color: "#ed6174", marginBottom: "40px", marginTop: "20px"}}>문진하기<FiEdit2 /></h3>
                <section>
                    {!loading && (
                        <>
                            <div className={styles.slider} ref={slideRef}>
                                        <div
                                            id='question1'
                                            className={styles.content}
                                        >
                                            <div className={styles.top}>
                                                <div
                                                    className={styles.mbti__counter}
                                                >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    1
                                                </span>
                                                    <span
                                                        className={
                                                            styles.mbti__end__color
                                                        }
                                                    >
                                                        / 9번
                                                </span>
                                                </div>
                                                <p
                                                    className={
                                                        styles.mbti__question
                                                    }
                                                    style={{fontSize: "25px"}}
                                                >
                                                    "매우 피곤하고 지쳐서 먹는 것조차 힘드나요?"
                                                </p>
                                            </div>
                                            <div
                                                className={"mbti__btn__box"}
                                            >
                                                {data.map((item, idx) =>{
                                                    return(
                                                        <>
                                                        <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef}
                                                        className={"mbti__button" + (idx == btnActive ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(idx);
                                                            toggleActive(event);
                                                        }}
                                                    >
                                                            {item}
                                                    </button>
                                                        </>
                                                    );
                                                })}

                                            </div>
                                        </div>
                                <div
                                    id='question2'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    2
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / 9번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            잠을 쉽게 이루지 못하는 편인가요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef1}
                                                        className={"mbti__button" + (idx == btnActive1 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(idx);
                                                            toggleActive1(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question2'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    3
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / 9번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            무기력함을 자주 느끼시나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef2}
                                                        className={"mbti__button" + (idx == btnActive2 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(idx);
                                                            toggleActive2(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question4'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    4
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / 9번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            심장이 너무 크게 뛰는것처럼 느껴지나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef3}
                                                        className={"mbti__button" + (idx == btnActive3 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(idx);
                                                            toggleActive3(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question5'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    5
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / {TOTAL_QUESTIONS}번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            삶의 의미가 없다고 느끼시나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef4}
                                                        className={"mbti__button" + (idx == btnActive4 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(idx);
                                                            toggleActive4(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question6'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                   6
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / {TOTAL_QUESTIONS}번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            자기주변을 통제할 수 없나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef5}
                                                        className={"mbti__button" + (idx == btnActive5 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(6);
                                                            toggleActive5(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question7'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    7
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / {TOTAL_QUESTIONS}번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            어떤 일을 바로 시작하기가 힘드나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef6}
                                                        className={"mbti__button" + (idx == btnActive6 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(7);
                                                            toggleActive6(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question8'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                   8
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / {TOTAL_QUESTIONS}번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            전보다 자신이 예민하고 짜증이 늘어난것처럼 생각되시나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef7}
                                                        className={"mbti__button" + (idx == btnActive7 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(8);
                                                            toggleActive7(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question9'
                                    className={styles.content}
                                >
                                    <div className={styles.top}>
                                        <div
                                            className={styles.mbti__counter}
                                        >
                                                <span
                                                    className={
                                                        styles.mbti__progress__color
                                                    }
                                                >
                                                    9
                                                </span>
                                            <span
                                                className={
                                                    styles.mbti__end__color
                                                }
                                            >
                                                        / {TOTAL_QUESTIONS}번
                                                </span>
                                        </div>
                                        <p
                                            className={
                                                styles.mbti__question
                                            }
                                            style={{fontSize: "25px"}}
                                        >
                                            정신과 치료를 생각해본적이 있나요?
                                        </p>
                                    </div>
                                    <div
                                        className={"mbti__btn__box"}
                                    >
                                        {data.map((item ,idx) =>{
                                            return(
                                                <>
                                                    <button
                                                        id='choose'
                                                        value={idx}
                                                        ref={buttonRef8}
                                                        className={"mbti__button" + (idx == btnActive8 ? " active" : "")}
                                                        onClick={(event) => {
                                                            nextSlide(9);
                                                            toggleActive8(event);
                                                        }}
                                                    >
                                                        {item}
                                                    </button>
                                                </>
                                            );
                                        })}
                                    </div>
                                </div>
                                <div
                                    id='question10'
                                    className={styles.content}
                                >
                                </div>


                            </div>
                        </>
                    )}

                </section>
            </div>
        </div>

    );


};
