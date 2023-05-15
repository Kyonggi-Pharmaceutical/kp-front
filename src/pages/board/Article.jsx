import React, {useEffect, useState} from 'react';
import '../Main.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import {useLocation, useNavigate} from "react-router-dom";
import {getArticleDetail} from "../../api/board/getArticleDetail";
import { AiOutlineUser } from "react-icons/ai";
import {postComment} from "../../api/board/postComment";
import {getComments} from "../../api/board/getComments";
import {getUserId} from "../../api/user/getUserId";
import {deleteArticle} from "../../api/board/deleteArticle";

function Article() {
    const navigate = useNavigate();
    const location = useLocation();
    const articleId = location.state.value;
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const userIdData = await getUserId();
            setUserId(userIdData);
            const articleData = await getArticleDetail(articleId);
            setArticle(articleData);
            // const commentData = await getComments(articleId);
            // setComments(commentData);
            // console.log(comments);
        }
        fetchData();
    }, []);

    const delArticle = (articleId) => {
        deleteArticle(articleId);
        window.location.replace('/board');
    };

    const [comment, setComment] = useState({
        description: null
    });

    const handleInputChange = (event) => {
        setComment((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    const commentSubmit = () => {
        postComment(comment, article.id);
    };

    const modifyArticle = () => {
        const data = {
            articleId: articleId,
            userId: userId,
            article: article,
        };
        console.log(data)
        navigate("/modifyArticle", {state: data });
    };

    return (
        <div className="main-bg">
            <div className="main">
                {
                    article.boardId === 0 ? <h3 className="small-title">체중관리</h3> : <h3 className="small-title">스트레스관리</h3>
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                        <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                            <th style={{width: "15%"}}>제목</th>
                            <td style={{width: "85%"}} colSpan={4}>{article.title}</td>
                        </tr>
                        <tr style={{borderBottom: "2px solid lightgray"}}>
                            {
                                userId === article.userId ?
                                    <>
                                        <th style={{width: "15%"}}>작성자</th>
                                        <td style={{width: "25%"}}>익명{article.userId}</td>
                                        <th style={{width: "40%"}}></th>
                                        <th style={{width: "10%"}}><span className="icon-btn" onClick={()=>modifyArticle()}>수정<TfiPencilAlt /></span></th>
                                        <th style={{width: "10%"}}><span className="icon-btn" onClick={()=>delArticle(article.id)}>삭제<RiDeleteBin6Line /></span></th>
                                    </> : (
                                    <>
                                        <th style={{width: "15%"}}>작성자</th>
                                        <td style={{width: "85%"}}>익명{article.userId}</td>
                                    </>
                                    )
                            }

                        </tr>
                        <tr style={{borderBottom: "4px solid black"}}>
                            <td td style={{width: "100%", minHeight: "300px"}} colSpan={3}>
                                <div style={{minHeight: "300px", padding: "10px"}}>
                                    {article.description}
                                </div>
                            </td>
                        </tr>
                    </tbody>
                </table>
                <form className="comment-input">
                    <input type="text" placeholder="댓글을 입력하세요" name="description" onChange={handleInputChange} value={comment.description}/><div className="comment-btn" onClick={commentSubmit}>등록</div>
                </form>
                <div className="comment-list">
                    <h5>Comment</h5>
                    {
                        <>
                            <div className="comment">
                                <div className="profile-image">
                                    <AiOutlineUser className="user-icon"/>
                                </div>
                                <div style={{width: "90%", marginLeft: "20px"}}>
                                    <h6 style={{fontWeight: "bold"}}>닉네임</h6>
                                    <h6>댓글1</h6>
                                    <h6 style={{float: "right"}}><span>2023-05-04</span><span>수정</span><span>삭제</span></h6>
                                </div>
                            </div>

                            <div className="comment">
                                <div className="profile-image">
                                    <AiOutlineUser className="user-icon"/>
                                </div>
                                <div style={{width: "90%", marginLeft: "20px"}}>
                                    <h6 style={{fontWeight: "bold"}}>정현</h6>
                                    <h6>댓글2</h6>
                                    <h6 style={{float: "right"}}><span>2023-05-04</span><span>수정</span><span>삭제</span></h6>
                                </div>
                            </div>
                        </>
                        //craeteat과 updatedat이 같으면 작성일 : ~~, 다르면 수정일 : ~~로 출력
                    }

                </div>
            </div>
        </div>
    );
}

export default Article;
