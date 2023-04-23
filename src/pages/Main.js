import React from 'react';
import {Link} from "react-router-dom";

function Main() {
    return (
        <div className="main-bg">
            <div className="main">
                <Link to="/exerciseSolution">exercise</Link>
                <li><Link to="/survey">설문을 시작하시겠습니까?</Link></li>
            </div>
        </div>
    );
}

export default Main;