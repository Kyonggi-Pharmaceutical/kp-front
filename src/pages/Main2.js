import { Link } from 'react-router-dom';
import "./Main1.css";
import "./Main.css";
function Main() {


    return (
        <div className="main-container">
            <div className="main-bg1">
                <div className="main">
                    <div className="greeting">
                        <p className="greeting-text">
                            안녕하세요,
                        </p>
                    </div>
                    <div className="greeting" style={{marginTop: '120px', marginBottom: '120px'}}>
                        <p className="greeting-text">여러분의 건강을 책임지는 16Healthcare 입니다.</p>
                        <p className="greeting-text">MBTI에 따른 맞춤형 운동 및 스트레스 관리 방법을 추천받아보세요!</p>
                        <p className="health-message">하단에 로그인 버튼을 눌러 건강관리를 시작해볼까요?</p>
                    </div>
                    <div className="button-container">
                        <Link to="/login">
                            <button className="login-button">로그인</button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Main;
