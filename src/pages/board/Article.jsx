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
import {getUserInfo} from "../../api/user/getUserInfo";

function Article() {
    const navigate = useNavigate();
    const location = useLocation();
    const articleId = location.state.value;
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(0);
    const [username, setUsername] = useState(null);
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
    useEffect(() => {
        async function fetchData() {
            const userIdData = await getUserId();
            setUserId(userIdData);
            const articleData = await getArticleDetail(articleId);
            setArticle(articleData);
            const usernames = articleData.username;
            setUsername(usernames);

            // const commentData = await getComments(articleId);
            // setComments(commentData);
            // console.log(comments);
        }
        fetchData();
    }, []);

    useEffect(() => {
        fetchComments();
    }, []);

    async function fetchComments() {
        try {
            const comments = await getComments(articleId);
            setComments(comments);
        } catch (error) {
            console.log(error);
        }
    }

    const delArticle = (articleId) => {
        deleteArticle(articleId);
        window.location.replace('/board');
    };

    const [comment, setComment] = useState({
        description: null,
        username: null
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
                                        <td style={{width: "25%"}}>{username}</td>
                                        <th style={{width: "40%"}}></th>
                                        <th style={{width: "10%"}}><span className="icon-btn" onClick={()=>modifyArticle()}>수정<TfiPencilAlt /></span></th>
                                        <th style={{width: "10%"}}><span className="icon-btn" onClick={()=>delArticle(article.id)}>삭제<RiDeleteBin6Line /></span></th>
                                    </> : (
                                    <>
                                        <th style={{width: "15%"}}>작성자</th>
                                        <td style={{width: "85%"}}>{username}</td>
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
                        <input type="text" placeholder="댓글을 입력하세요" name="description" onChange={handleInputChange} value={comment.description} />
                        <p style={{ display: 'none' }} name="username" onChange={handleInputChange} value={comment.username} >{user.username}</p>
                        <div className="comment-btn" onClick={commentSubmit}>등록</div>
                    </form>

                <div className="comment-list">
                    <div className="comment">
                        <ul>
                            {comments.map((comment) => (
                                <li key={comment.id}>{comment.description}, {comment.username}</li>
                            ))}
                        </ul>
                    </div>
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
