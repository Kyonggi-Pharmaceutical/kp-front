import React, {useEffect, useState} from 'react';
import '../Main.css'
import {getUserInfo} from "../../api/user/getUserInfo";
import {useLocation, useNavigate} from "react-router-dom";
import {putArticle} from "../../api/board/putArticle";

function ModifyArticle() {
    const {state} = useLocation();
    const navigate = useNavigate();
    const [user, setUser] = useState({
        id: null,
        nickname: null,
    });
    const [article, setArticle] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const newinfo = await getUserInfo();
            setUser(newinfo);
            setArticle(state.article);
        }
        fetchData();
    }, []);

    const handleInputChange = (event) => {
        setArticle((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    const articleSubmit = () => {
        putArticle(article, state.articleId, state.userId);
        window.location.replace('/board');
    };

    return (
        <div className="main-bg">
            <div className="main">
                {
                    <h3 className="small-title">카테고리</h3>
                    //카테고리에 따라 카테고리 출력
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                    <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                        <th style={{width: "15%"}}>제목</th>
                        <td style={{width: "85%"}} colSpan={2}><input type="text" name="title" onChange={handleInputChange} value={article.title}/></td>
                    </tr>
                    <tr style={{borderBottom: "2px solid lightgray"}}>
                        {
                            //info의 정보와 게시글의 정보가 같으면 수정 삭제 출력
                        }
                        <th style={{width: "15%"}}>작성자</th>
                        <td style={{width: "25%"}}>{user.nickname}</td>
                        <th style={{width: "60%"}}></th>
                    </tr>
                    <tr style={{borderBottom: "4px solid black"}}>
                        <td style={{width: "100%", minHeight: "300px"}} colSpan={3}>
                            <div style={{minHeight: "300px", width: "100%", padding: "10px"}}>
                                <textarea style={{width: "100%", border: "none", resize: "none"}} rows="10" name="description" onChange={handleInputChange} value={article.description}/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <form className="comment-input">
                    <div className="comment-btn">취소</div>
                    <div className="comment-btn" style={{marginLeft: "10px"}} onClick={articleSubmit}>등록</div>
                </form>
            </div>
        </div>
    );
}

export default ModifyArticle;
