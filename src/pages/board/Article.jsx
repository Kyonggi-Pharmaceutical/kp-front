import React, {useEffect, useState} from 'react';
import '../Main.css'
import '../Main1.css'
import {RiDeleteBin6Line} from "react-icons/ri";
import {TfiPencilAlt} from "react-icons/tfi";
import {AiOutlineLike} from "react-icons/ai"
import {useLocation, useNavigate} from "react-router-dom";
import {getArticleDetail} from "../../api/board/article/getArticleDetail";
import {AiOutlineUser} from "react-icons/ai";
import {BsPencil} from "react-icons/bs";
import {TiDeleteOutline} from "react-icons/ti"
import {postComment} from "../../api/board/comment/postComment";
import {getComments} from "../../api/board/comment/getComments";
import {getUserId} from "../../api/user/getUserId";
import {deleteArticle} from "../../api/board/article/deleteArticle";
import {putComment} from "../../api/board/comment/putComment";
import {deleteComment} from "../../api/board/comment/deleteComment";
import {postLike} from "../../api/board/like/postLike";
import {getLikeCount} from "../../api/board/like/getLikesCount";
import {getMaintainLikes} from "../../api/board/like/getMaintainLikes";
import {deleteLike} from "../../api/board/like/deleteLike";
import {getLikeCountForComment} from "../../api/board/like/getLikeCountForComment";
import {getMaintainLikesForComment} from "../../api/board/like/getMaintainLikesForComment";
import {postLikeForComment} from "../../api/board/like/postLikeForComment";
import {deleteLikeForComment} from "../../api/board/like/deleteLikeForComment";
import {intLikeForComment} from "../../api/board/like/intlikesForComment";

function Article() {
    const navigate = useNavigate();
    const location = useLocation();
    const articleId = location.state.value;
    const [article, setArticle] = useState([]);
    const [comments, setComments] = useState([]);
    const [userId, setUserId] = useState(0);
    const [newComment, setNewComment] = useState(false);
    const [isLiked, setIsLiked] = useState(false);
    const [likeCount, setLikeCount] = useState(0);
    const [isLikedComment, setIsLikedComment] = useState({});
    const [likeCountComment, setLikeCountComment] = useState({});

    const fetchLikeCount = async () => {
        const count = await getLikeCount(articleId);
        if (count !== null) {
            setLikeCount(count);
        }
    };

    useEffect(() => {
        fetchLikeCount().then();
    }, [isLiked]);


    useEffect(() => {
        async function fetchData() {
            const userIdData = await getUserId();
            setUserId(userIdData);
            const articleData = await getArticleDetail(articleId);
            setArticle(articleData);
            const commentData = await getComments(articleId);
            setComments(commentData);
            const isLikeData = await getMaintainLikes(articleId);
            setIsLiked(isLikeData);

            const likeCounts = {};
            const isLikeComment = {};
            for (const comment of commentData) {
                const count = await getLikeCountForComment(comment.id);
                likeCounts[comment.id] = count;
            }
            setLikeCountComment(likeCounts);
            for (const comment of commentData) {
                const count = await getMaintainLikesForComment(comment.id);
                isLikeComment[comment.id] = count;
            }
            setIsLikedComment(isLikeComment);
        }

        fetchData().then();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const commentData = await getComments(articleId);
            setComments(commentData);

            const likeCounts2 = {};
            const isLikeComment2 = {};
            for (const comment of commentData) {
                const count = await getLikeCountForComment(comment.id);
                likeCounts2[comment.id] = count;
            }
            setLikeCountComment(likeCounts2);
            for (const comment of commentData) {
                const count = await getMaintainLikesForComment(comment.id);
                isLikeComment2[comment.id] = count;
            }
            setIsLikedComment(isLikeComment2);
        }

        fetchData().then(r => console.log("success"));
        setNewComment(false);
    }, [newComment])

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
        navigate("/modifyArticle", {state: data});
    };

    const postLikeApi = async (articleId) => {
        await postLike(articleId);
        setIsLiked(true);
    };

    const delLike = (articleId) => {
        deleteLike(articleId);
        setIsLiked(false);
    };

    const navigateToBoard = () => {
        navigate('/board');
    };
    return (
        <div className="main-bgs" style={{height: "80%", width: "70%"}}>
            <div className="article-box">
                {
                    article.boardId === 0 ? <h3 className="small-title" onClick={navigateToBoard}>체중관리</h3> :
                        <h3 className="small-title" onClick={navigateToBoard}>스트레스관리</h3>
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                    <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                        <th style={{width: "15%"}}>제목</th>
                        <td style={{width: "85%", textAlign: "left"}} colSpan={4}>{article.title}</td>
                    </tr>
                    <tr style={{borderBottom: "2px solid lightgray"}}>
                        {
                            userId === article.userId ?
                                <>
                                    <th style={{width: "15%"}}>작성자</th>
                                    <td style={{width: "15%", textAlign: "left"}}>{article.username}</td>
                                    <th style={{width: "30%"}}></th>
                                    <td style={{width: "10%"}}>
                                        <AiOutlineLike size={20}/> {likeCount}</td>
                                    <th style={{width: "10%"}}><span className="icon-btn"
                                                                     onClick={() => modifyArticle()}>수정 <TfiPencilAlt
                                        size={20}/></span></th>
                                    <th style={{width: "10%"}}><span className="icon-btn"
                                                                     onClick={() => delArticle(article.id)}>삭제 <RiDeleteBin6Line
                                        size={20}/></span></th>
                                </> : (
                                    <>
                                        <th style={{width: "15%"}}>작성자</th>
                                        <td style={{width: "65%", textAlign: "left"}}>{article.username}</td>
                                        <td style={{width: "10%"}}>
                                            <AiOutlineLike size={20}/> {likeCount}</td>
                                        <td style={{width: "10%"}}></td>
                                    </>
                                )
                        }

                    </tr>
                    <tr>
                        <td td style={{width: "100%", minHeight: "300px", borderBottom: "none"}} colSpan={6}>
                            <div style={{minHeight: "300px", padding: "10px", textAlign: "left"}}>
                                {article.description}
                            </div>
                        </td>
                    </tr>
                    <tr style={{borderBottom: "4px solid black"}}>
                        <td style={{padding: "20px", textAlign: "center"}} colSpan={6} className="icon-btn">
                            {
                                isLiked ? (
                                    <img src="/icon/likeon.png" style={{width: "40px"}}
                                         onClick={() => delLike(article.id)}/>
                                ) : (
                                    <img src="/icon/likeoff.png" style={{width: "40px"}}
                                         onClick={() => postLikeApi(article.id)}/>
                                )
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
                <form className="comment-input">
                    <input type="text" placeholder="댓글을 입력하세요" name="description" onChange={handleInputChange}
                           value={comment.description}/>
                    <div className="comment-btn" onClick={commentSubmit}>등록</div>
                </form>
                <div className="comment-list">
                    <h3 style={{textAlign: "left", marginBottom: "20px"}}>Comment</h3>
                    <CommentSection comments={comments} userId={userId} setNewComment={setNewComment}
                                    likeCountComment={likeCountComment} isLikedComment={isLikedComment}/>
                </div>
            </div>
        </div>
    );
}

function CommentSection({comments, userId, setNewComment, likeCountComment, isLikedComment}) {
    const [modify, setModify] = useState(null);
    const [intLike, setIntLike] = useState(0);
    const [comment, setComment] = useState({
        description: null,
    });
    const commentId = setNewComment.id;

    const modifyCommentOpen = (commentId) => {
        setModify(commentId);
    }
    const modifyComment = (newComment) => {
        const commentInfo = {
            id: newComment.id,
            articleId: newComment.articleId,
            description: comment.description,
            userId: newComment.userId,
            username: newComment.username,
        };
        console.log(commentInfo);
        putComment(comment, newComment.id);
        setModify(false);
        setNewComment(true);
    }
    useEffect(() => {
        fetchInitialData();
    }, []);
    const fetchInitialData = async (commentId)=>{
        const response = await intLikeForComment(commentId);
        setIntLike(response);
    };

    const delComment = (articleId, commentId) => {
        deleteComment(articleId, commentId);
        setNewComment(true);
    }

    const handleInputChange = (event) => {
        setComment((prevProps) => ({
            ...prevProps,
            [event.target.name]: event.target.value
        }));
    };

    const postCommentLike = async (commentId) => {
        await postLikeForComment(commentId);
        setNewComment(true);
    };

    const deleteCommentLike = async (commentId) => {
        await deleteLikeForComment(commentId);
        setNewComment(true);
    };

    const handleCommentLike = (commentId, isLike) => {
        if(isLike){
            deleteCommentLike(commentId).then(r => console.log('cl 삭제'));
        }else{
            postCommentLike(commentId).then(r => console.log('cl 추가'));
        }
    };

    return (
        comments && comments.map((item) => (
            <div className="comment" key={item.id} style={{textAlign: "left"}}>
                <div className="profile-image">
                    <AiOutlineUser className="user-icon"/>
                </div>
                <div style={{width: "90%", marginLeft: "20px"}}>
                    {
                        item.userId === userId ? (
                            <h6 style={{float: "right"}}>
                                <span className="icon-btn" onClick={() => modifyCommentOpen(item.id)}><BsPencil
                                    size={20}/></span>
                                <span>   </span>
                                <span className="icon-btn" onClick={() => {
                                    delComment(item.articleId, item.id)
                                }}><TiDeleteOutline size={20}/></span>
                                <span>   </span>
                                <span className="icon-btn" onClick={() => {handleCommentLike(item.id, isLikedComment[item.id])}}>
                                    {
                                        isLikedComment[item.id] == true ? <>
                                            <AiOutlineLike
                                            size={20} color="red"/>{likeCountComment[item.id]}</> : <>
                                            <AiOutlineLike
                                            size={20}/>{likeCountComment[item.id]}
                                        </>
                                    }
                                </span>
                            </h6>
                        ) : (
                            <h6 style={{float: "right"}}>
                                <span className="icon-btn" onClick={() => {handleCommentLike(item.id, isLikedComment[item.id])}}>
                                {
                                    isLikedComment[item.id] == true ? <>
                                        <AiOutlineLike
                                            size={20} color="red"/>{likeCountComment[item.id]}</> : <>
                                        <AiOutlineLike
                                            size={20}/>{likeCountComment[item.id]}
                                    </>
                                }
                                </span>
                            </h6>
                        )
                    }

                    {
                        (item.userId === userId) && (item.id === modify) ? (
                            <>
                                <h6 style={{fontWeight: "bold"}}>{item.username}</h6>
                                <form className="comment-input">
                                    <input type="text" placeholder={item.description} name="description"
                                           onChange={handleInputChange} value={comment.description}/>
                                    <div className="comment-btn" onClick={() => {
                                        modifyComment(item)
                                    }}>수정
                                    </div>
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
    );
}

export default Article;
