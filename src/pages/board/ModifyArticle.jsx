import React, {useEffect, useState} from 'react';
import '../Main.css'
import {getUserInfo} from "../../api/user/getUserInfo";
import {useLocation, useNavigate} from "react-router-dom";
import {putArticle} from "../../api/board/article/putArticle";

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

    const navigateToArticle = (articleId) => {
        navigate("/article", {state: {value : articleId}});
    };

    return (
        <div className="main-bgs" style={{height: "80%", width: "70%"}}>
            <div className="article-box">
                {
                    article.boardId === 0 ? <h3 className="small-title" >체중관리</h3> :
                        <h3 className="small-title" >스트레스관리</h3>
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                    <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                        <th style={{width: "15%"}}>제목</th>
                        <td style={{width: "85%"}} colSpan={2}><input type="text" name="title" onChange={handleInputChange} value={article.title} style={{width: "100%", border: "none"}}/></td>
                    </tr>
                    <tr style={{borderBottom: "2px solid lightgray"}}>
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
                    <div className="comment-btn" onClick={()=>navigateToArticle(article.id)}>취소</div>
                    <div className="comment-btn" style={{marginLeft: "10px"}} onClick={articleSubmit}>등록</div>
                </form>
            </div>
        </div>
    );
}

export default ModifyArticle;
