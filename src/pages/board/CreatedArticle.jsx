import React, {useEffect, useState} from 'react';
import '../Main.css'
import {getUserInfo} from "../../api/user/getUserInfo";
import {postArticle} from "../../api/board/article/postArticle";
import {useLocation, useNavigate} from "react-router-dom";

function CreatedArticle() {
    const location = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        nickname: null,
    });
    useEffect(() => {
        const initUserinfo = async () => {
            const newinfo = await getUserInfo();
            setUser(newinfo);
        };
        initUserinfo();
    }, []);

    const [article, setArticle] = useState({
        title: null,
        description: null,
    });

    const handleInputChange = (event) => {
        setArticle((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    const articleSubmit = () => {
        postArticle(article, location.state.value);
        window.location.replace('/board');
    };

    const navigateToBoard = () => {
        navigate('/board');
    };

    return (
        <div className="main-bg" style={{height: "80%", width: "70%"}}>
            <div className="article-box">
                {
                    location.state.value === 0 ? <h3 className="small-title" onClick={navigateToBoard}>체중관리</h3> :
                        <h3 className="small-title" onClick={navigateToBoard}>스트레스관리</h3>
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                    <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                        <th style={{width: "15%"}}>제목</th>
                        <td style={{width: "85%"}} colSpan={2}><input type="text" name="title" onChange={handleInputChange} value={article.title} placeholder="제목을 입력하세요" style={{width: "100%", border: "none"}}/></td>
                    </tr>
                    <tr style={{borderBottom: "2px solid lightgray"}}>
                        <th style={{width: "15%"}}>작성자</th>
                        <td style={{width: "30%", textAlign: "left"}} onChange={handleInputChange} name="username" value={article.username}>{user.nickname}</td>
                        <td style={{width: "55%"}}></td>
                    </tr>
                    <tr style={{borderBottom: "4px solid black"}}>
                        <td style={{width: "100%", minHeight: "300px"}} colSpan={3}>
                            <div style={{minHeight: "300px", width: "100%", padding: "10px"}}>
                                <textarea style={{width: "100%", border: "none", resize: "none"}} rows="10" placeholder="내용을 입력하세요!" name="description" onChange={handleInputChange} value={article.description}/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <form className="comment-input">
                    <div className="comment-btn" onClick={navigateToBoard}>취소</div>
                    <div className="comment-btn" style={{marginLeft: "10px"}} onClick={articleSubmit}>등록</div>
                </form>
            </div>
        </div>
    );
}

export default CreatedArticle;
