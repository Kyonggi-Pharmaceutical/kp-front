import { Link } from 'react-router-dom';
import "./Main1.css";
function BeforeLogin() {


    return (
        <div className="main-container">
            <div className="main-bgs">
                <div className="main">
                    <div className="greeting">
                        <p className="greeting-text">
                            안녕하세요,
                        </p>
                    </div>
                    <div className="greeting" style={{marginTop: '60px'}}>
                        <p className="greeting-text">여러분의 건강을 책임지는 16Healthcare 입니다.</p>
                        <p className="greeting-text">MBTI에 따른 맞춤형 운동 및 스트레스 관리 방법을 추천받아보세요!</p>
                        <p className="health-message">하단에 시작하기 버튼을 눌러 건강관리를 시작해볼까요?</p>
                    </div>
                    <div className="button-container">
                        <Link to="/login">
                            <button className="login-button">시작하기</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default BeforeLogin;