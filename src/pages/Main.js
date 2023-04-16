import React from 'react';
import {Link, Navigate, Route} from "react-router-dom";
import StartPage from "./StartPage";

function Main() {
    return (
        <div className="main-bg">
            <div className="main">
                본문
                <li><Link to="/survey">설문을 시작하시겠습니까?</Link></li>
            </div>
        </div>
    );
}

export default Main;
