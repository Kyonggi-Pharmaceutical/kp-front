import React, {useEffect, useState} from 'react';
import {getMyArticle} from "../api/getMyArticle";
import {getMyComment} from "../api/getMyComment";
import {getMyLikeForArticle} from "../api/getMyLikeForArticle";
import {getMyLikeForComment} from "../api/getMyLikeForComment";
import './Main1.css'

function GetMyCommunityByUser() {
    const [articles, setArticles] = useState([]);
    const [comments, setComments] = useState([]);
    const [likeForArticle, setLikeForArticle] = useState([]);
    const [likesForComment, setLikeForComment] = useState([]);
    const [selectedTab, setSelectedTab] = useState('articles');
    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await getMyArticle();
                setArticles(response);
            } catch (error) {
                console.error('Error fetching articles:', error);
            }
        };

        const fetchComments = async () => {
            try {
                const response = await getMyComment();
                setComments(response);
            } catch (error) {
                console.error('Error fetching comments:', error);
            }
        };

        const fetchLikeForArticle = async () => {
            try {
                const response = await getMyLikeForArticle();
                setLikeForArticle(response);
            } catch (error) {
                console.error('Error fetching likes for article:', error);
            }
        };

        const fetchLikesForComment = async () => {
            try {
                const response = await getMyLikeForComment();
                setLikeForComment(response);
            } catch (error) {
                console.error('Error fetching likes for comment:', error);
            }
        };

        fetchArticles();
        fetchComments();
        fetchLikeForArticle();
        fetchLikesForComment();
    }, []);

    if (articles.length === 0 || comments.length === 0 || likeForArticle.length === 0 || likesForComment.length === 0) {
        return <div className="main-container">Loading...</div>;
    }
    const handleTabClick = (tab) => {
        setSelectedTab(tab);
    };


    return (
        <div className="main-container">
            <div className="main-bg">
                <div className="body-container">
                    <div className="button-customizing">
                        <button
                            onClick={() => handleTabClick('articles')}
                            className={selectedTab === 'articles' ? 'selected' : ''}
                        >
                            내가 쓴 게시글
                        </button>
                        <button
                            onClick={() => handleTabClick('comments')}
                            className={selectedTab === 'comments' ? 'selected' : ''}
                        >
                            내가 쓴 댓글
                        </button>
                        <button
                            onClick={() => handleTabClick('likedArticles')}
                            className={selectedTab === 'likedArticles' ? 'selected' : ''}
                        >
                            좋아요한 게시글
                        </button>
                        <button
                            onClick={() => handleTabClick('likedComments')}
                            className={selectedTab === 'likedComments' ? 'selected' : ''}
                        >
                            좋아요한 댓글
                        </button>
                    </div>
                    <div className="list-customizing">
                        {selectedTab === 'articles' && (
                            <div className="section1">
                                <p className="p-size">찾은 게시글 목록 {articles.length}개</p>
                                <div className="swiper-container">
                                    <div className="swiper-wrapper">
                                        {articles.map((article) => (
                                            <div key={article.id} className="swiper-slide">
                                                <div className="article-container">
                                                    <div className="article-info">
                                                        <div className="article-text">
                                                            <p>제목: {article.title}</p>
                                                            <p>내용: {article.description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        )}
                        {selectedTab === 'comments' && (
                            <div className="section2">
                                <p className="p-size">찾은 댓글 목록 {comments.length}개</p>
                                {comments.map((comment) => (
                                    <div key={comment.id} className="comment-container">
                                        <div className="article-text">
                                            <p>내용 : {comment.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                        {selectedTab === 'likedArticles' && (
                            <div className="section3">
                                <p className="p-size">좋아요한 게시물 목록 {likeForArticle.length}개</p>
                                {likeForArticle
                                    .map((article) => (
                                        <div key={article.id} className="article-container">
                                            <div className="article-info">
                                                <div className="article-text">
                                                    <p>제목 : {article.title}</p>
                                                    <p>내용 : {article.description}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                            </div>
                        )}
                        {selectedTab === 'likedComments' && (
                            <div className="section4">
                                <p className="p-size">좋아요한 댓글 목록 {likesForComment.length}개</p>
                                {likesForComment.map((comment) => (
                                    <div key={comment.id} className="comment-container">
                                        <div className="article-text">
                                            <p>내용 : {comment.description}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default GetMyCommunityByUser;