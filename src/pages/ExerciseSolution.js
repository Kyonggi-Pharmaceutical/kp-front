import React from 'react';
import {getExerciseSolution} from "../api/getExerciseSolution";
import axios from "axios";

function ExerciseSolution() {
    const API_URL = process.env.REACT_APP_API_URL;
    const path = '/api/v1/exercises/exercisesSolution';
    //console.log(getExerciseSolution())
    axios
        .get(`${API_URL}${path}`)
        .then((data) => {
            console.log(JSON.parse(data));
        })
        .catch(() => {
            console.log("실패");
        });

    return (
        <div className="main-bg">
            <div className="main">
                ExercisesSolution
            </div>
        </div>
    );
}


export default ExerciseSolution;