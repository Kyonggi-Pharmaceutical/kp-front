import React, { createRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
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
    let [btnActive, setBtnActive] = useState("");


    const slideRef = createRef(null);
    const TOTAL_QUESTIONS = 9;
    const navigate = useNavigate();

    const nextSlide = (idx) => {
        setStress(stress + idx);
        setNum(num + 1);
        setCurrentSlide(currentSlide + 1);
        // slideRef.current.style.transform += 'translateX(-100vw)';

    };

    const toggleActive = (e) => {
        setBtnActive((prev) => {
            return e.target.value;
        });
    };



    useEffect(() => {
        let result = stress;

        if (num > 7 && month == 0){ navigate("/stressResult?result="+result, {
            state:{ value : parseInt(result) },
        })}else if (num > 7 && month == 1){ navigate("/satisfactionResult?result="+result, {
            state:{ value : parseInt(result) },
        })};

    }, [currentSlide]);

    return (
        <div className="main-bg">
            <div className="survey-form">
                <h3 className="small-title">문진하기<FiEdit2 /></h3>
                <section>
                    {!loading && (
                        <>
                            <div id className={styles.slider} ref={slideRef}>
                                {Questions.map((item, idx) => {
                                    return (
                                        <div
                                            id='question'
                                            className={styles.content}
                                            key={item.id}
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
                                                    {item.id + " "}
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
                                                    {item.question}
                                                </p>
                                            </div>
                                            <div
                                                className={"mbti__btn__box"}
                                            >
                                                <button
                                                    id='choose'
                                                    value={idx}
                                                    className={"mbti__button" + (idx == btnActive ? " active" : "")}
                                                    onClick={(event) => {
                                                        nextSlide(0);
                                                        toggleActive(event);
                                                    }}
                                                >
                                                    {item.answers[0].content}
                                                </button>
                                                <button
                                                    id='choose'
                                                    value={idx}
                                                    className={"mbti__button" + (idx == btnActive ? " active" : "")}
                                                    onClick={(event) => {
                                                        nextSlide(1);
                                                        toggleActive(event);
                                                    }}
                                                >
                                                    {item.answers[1].content}
                                                </button>
                                                <button
                                                    id='choose'
                                                    value={idx}
                                                    className={"mbti__button" + (idx == btnActive ? " active" : "")}
                                                    onClick={(event) => {
                                                        nextSlide(2);
                                                        toggleActive(event);
                                                    }}
                                                >
                                                    {item.answers[2].content}
                                                </button>
                                                <button
                                                    id='choose'
                                                    value={idx}
                                                    className={"mbti__button" + (idx == btnActive ? " active" : "")}
                                                    onClick={(event) => {
                                                        nextSlide(3);
                                                        toggleActive(event);
                                                    }}
                                                >
                                                    {item.answers[3].content}
                                                </button>
                                                <button
                                                    id='choose'
                                                    value={idx}
                                                    className={"mbti__button" + (idx == btnActive ? " active" : "")}
                                                    onClick={(event) => {
                                                        nextSlide(4);
                                                        toggleActive(event);
                                                    }}
                                                >
                                                    {item.answers[4].content}
                                                </button>
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        </>
                    )}

                </section>
            </div>
        </div>

    );


};