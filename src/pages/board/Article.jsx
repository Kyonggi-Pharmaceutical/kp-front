import React, {useEffect, useState} from 'react';
import '../Main.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import { FcLike } from "react-icons/fc"
import {useLocation, useNavigate} from "react-router-dom";
import {getArticleDetail} from "../../api/board/article/getArticleDetail";
import { AiOutlineUser } from "react-icons/ai";
import { BsPencil } from "react-icons/bs";
import { TiDeleteOutline } from "react-icons/ti"
import {postComment} from "../../api/board/comment/postComment";
import {getComments} from "../../api/board/comment/getComments";
import {getUserId} from "../../api/user/getUserId";
import {deleteArticle} from "../../api/board/article/deleteArticle";
import {putComment} from "../../api/board/comment/putComment";
import {deleteComment} from "../../api/board/comment/deleteComment";
import {getLikes} from "../../api/board/like/getLikes";
import {postLike} from "../../api/board/like/postLike";

function Article() {
    const navigate = useNavigate();
    const location = useLocation();
    const articleId = location.state.value;
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(0);
    const [newComment, setNewComment] = useState(false);
    const [like, setLike] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const userIdData = await getUserId();
            setUserId(userIdData);
            const articleData = await getArticleDetail(articleId);
            setArticle(articleData);
            const commentData = await getComments(articleId);
            setComments(commentData);
            const likeData = await getLikes(articleId);
            setLike(likeData);
        }
        fetchData();
    }, []);

    useEffect(()=>{
        async function fetchData() {
            const commentData = await getComments(articleId);
            setComments(commentData);
        }
        if (newComment === true) {
            fetchData();
            setNewComment(false);
        }
    },[newComment])

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

    const commentSubmit = async () => {
        postComment(comment, article.id);
        const commentData = await getComments(articleId);
        setComments(commentData);
        setNewComment(true);
        setComment({description: ''});
    };

    const modifyArticle = () => {
        const data = {
            articleId: articleId,
            userId: userId,
            article: article,
        };
        navigate("/modifyArticle", {state: data });
    };

    const postLikeApi = (articleId) => {
        console.log(articleId)
        //여기가 하트 아이콘을 눌렀을 때 작동하는 함수
        //postLike(articleId);
    };

    return (
        <div className="main-bg">
            <div className="main">
                {
                    article.boardId === 0 ? <h3 className="small-title">체중관리</h3> :
                        <h3 className="small-title">스트레스관리</h3>
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
                                        <td style={{width: "25%"}}>{article.username}</td>
                                        <th style={{width: "30%"}}></th>
                                        <td style={{width: "10%"}} className="icon-btn" onClick={()=>postLikeApi(article.id)}><FcLike size={20}/>{like}</td>
                                        <th style={{width: "10%"}}><span className="icon-btn" onClick={()=>modifyArticle()}>수정<TfiPencilAlt size={20}/></span></th>
                                        <th style={{width: "10%"}}><span className="icon-btn" onClick={()=>delArticle(article.id)}>삭제<RiDeleteBin6Line size={20}/></span></th>
                                    </> : (
                                    <>
                                        <th style={{width: "15%"}}>작성자</th>
                                        <td style={{width: "65%"}}>{article.username}</td>
                                        <td style={{width: "10%"}} className="icon-btn" onClick={()=>postLikeApi(article.id)}><FcLike size={20}/>{like}</td>
                                        <td style={{width: "10%"}}></td>
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
                    <input type="text" placeholder="댓글을 입력하세요" name="description" onChange={handleInputChange} value={comment.description}/>
                    <div className="comment-btn" onClick={commentSubmit}>등록</div>
                </form>
                <div className="comment-list">
                    <h5>Comment</h5>
                    <CommentSection comments={comments} userId={userId} setNewComment={setNewComment}/>
                </div>
            </div>
        </div>
    );
}

function CommentSection({comments, userId, setNewComment}) {
    const [modify, setModify] = useState(null);
    const [comment, setComment] = useState({
        description: null,
    });

    const modifyCommentOpen = (commentId) =>{
        setModify(commentId);
    }
    const modifyComment = (newComment) =>{
        const commentInfo = {
            id : newComment.id,
            articleId : newComment.articleId,
            description : comment.description,
            userId : newComment.userId,
            username : newComment.username,
        };
        console.log(commentInfo);
        putComment(comment, newComment.id);
        setModify(false);
        setNewComment(true);
    }

    const delComment = (articleId, commentId) =>{
        deleteComment(articleId, commentId);
        setNewComment(true);
    }

    const handleInputChange = (event) => {
        setComment((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };
    return (
        comments && comments.map((item) => (
            <div className="comment" key={item.id}>
                <div className="profile-image">
                    <AiOutlineUser className="user-icon"/>
                </div>
                <div style={{width: "90%", marginLeft: "20px"}}>
                    {
                        item.userId === userId ? (
                            <h6 style={{float: "right"}}>
                                <span className="icon-btn" onClick={()=>modifyCommentOpen(item.id)}><BsPencil size={20} /></span>
                                <span>   </span>
                                <span className="icon-btn" onClick={()=>{delComment(item.articleId, item.id)}}><TiDeleteOutline size={20} /></span>
                            </h6>
                        ) : (null)
                    }
                    {
                        (item.userId === userId) && (item.id === modify) ? (
                            <>
                                <h6 style={{fontWeight: "bold"}}>{item.username}</h6>
                                <form className="comment-input">
                                    <input type="text" placeholder={item.description} name="description" onChange={handleInputChange} value={comment.description} />
                                    <div className="comment-btn" onClick={()=>{modifyComment(item)}}>수정</div>
                                </form>
                            </>
                        ) : (
                            <>
                                <h6 style={{fontWeight: "bold"}}>{item.username}</h6>
                                <h6>{item.description}</h6>
                            </>
                        )
                    }
                </div>
            </div>
        ))
    )
}

export default Article;
