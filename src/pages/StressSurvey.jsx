import React, { createRef, useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import styles from './StressSurvey.css';
import Questions from "../api/StressQuestion/../StressQuestion";
import {getValue} from "@testing-library/user-event/dist/utils";
console.log(Questions);
export default function StressSurvey({month, stressResult}){
    const [loading, setLoading] = useState(false);
    const [num, setNum] = useState(0);
    const [currentSlide, setCurrentSlide] = useState(1);
    const [stress, setStress] = useState(0);


    const slideRef = createRef(null);
    const TOTAL_QUESTIONS = 9;
    const navigate = useNavigate();

    const nextSlide = (idx) => {
        setStress(stress + idx);
        setNum(num + 1);
        setCurrentSlide(currentSlide + 1);
        // slideRef.current.style.transform += 'translateX(-100vw)';

    };



    useEffect(() => {
        let result = stress;

        if (num > 8 && month == 0){ navigate("/stressResult?result="+result, {
            state:{ value : parseInt(result) },
        })}else if (num > 8 && month == 1){ navigate("/satisfactionResult?result="+result, {
            state:{ value : parseInt(result) },
        })};

    }, [currentSlide]);

    return (
        <>
            <section className={styles.container}>
                {!loading && (
                    <>
                        <div id className={styles.slider} ref={slideRef}>
                            {Questions.map((item) => {
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
                                                    {item.id}
                                                </span>
                                                <span
                                                    className={
                                                        styles.mbti__end__color
                                                    }
                                                >
                                                    /{TOTAL_QUESTIONS}
                                                </span>
                                            </div>
                                            <h1
                                                className={
                                                    styles.mbti__question
                                                }
                                            >
                                                {item.question}
                                            </h1>
                                        </div>
                                        <article
                                            className={styles.mbti__btn__box}
                                        >
                                            <button
                                                id='choose'
                                                className={styles.mbti__button}
                                                onClick={() => nextSlide(0)}
                                            >
                                                {item.answers[0].content}
                                            </button>
                                            <button
                                                id='choose'
                                                className={styles.mbti__button}
                                                onClick={() => nextSlide(1)}
                                            >
                                                {item.answers[1].content}
                                            </button>
                                            <button
                                                id='choose'
                                                className={styles.mbti__button}
                                                onClick={() => nextSlide(2)}
                                            >
                                                {item.answers[2].content}
                                            </button>
                                            <button
                                                id='choose'
                                                className={styles.mbti__button}
                                                onClick={() => nextSlide(3)}
                                            >
                                                {item.answers[3].content}
                                            </button>
                                            <button
                                                id='choose'
                                                className={styles.mbti__button}
                                                onClick={() => nextSlide(4)}
                                            >
                                                {item.answers[4].content}
                                            </button>
                                        </article>
                                    </div>
                                );
                            })}
                        </div>
                    </>
                )}

            </section>
        </>

    );


};
