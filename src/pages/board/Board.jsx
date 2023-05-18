import React, {useState, useEffect} from 'react';
import axios from "axios"
import '../Main.css'
import Accordion from 'react-bootstrap/Accordion'
import './Board.css'
import Button from "react-bootstrap/Button";
import {FcLike} from "react-icons/fc"
import {useNavigate} from "react-router-dom";
import {getArticlesByCategory} from "../../api/board/article/getArticlesByCategory";



function Board() {
    const [stressArticles, setStressArticles] = useState([]);
    const [activityArticles, setActivityArticles] = useState([]);
    const [boardId, setBoardId] = useState(0);
    const [likeCount, setLikeCount] = useState({});

    useEffect(() => {
        async function fetchData() {
            const data1 = await getArticlesByCategory(0);
            const data2 = await getArticlesByCategory(1);

            const likeCounts = {};

            for (const item of data1) {
                const count = await getLikeCount(item.id);
                likeCounts[item.id] = count;
            }
            for (const item of data2) {
                const count = await getLikeCount(item.id);
                likeCounts[item.id] = count;
            }

            setLikeCount(likeCounts);
            setActivityArticles(data1);
            setStressArticles(data2);
        }

        fetchData();
    }, []);

    async function getLikeCount(articleId) {
        try {
            const response = await axios.get(`/api/v1/articles/${articleId}/likes`, {
                withCredentials: true,
            });
            return response.data;
        } catch (error) {
            console.error(error);
            return 0;
        }
    }

    const [activity, setActivity] = useState(true);
    const [stress, setStress] = useState(false);
    const selectAcitivity = () => {
        setStress(false);
        setActivity(true);
        setBoardId(0);
    };
    const selectStress = () => {
        setStress(true);
        setActivity(false);
        setBoardId(1);
    };

    const navigate = useNavigate();
    const navigateToArticle = (articleId) => {
        navigate("/article", {state: {value: articleId}});
    }

    const navigateToCreatedArticle = () => {
        navigate("/createdArticle", {state: {value: boardId}});
    }

    return (
        <div className="main-bg">
            <div className="board-rank">
                <div className="board">
                    <div style={{marginBottom: "20px"}}>
                        <div style={{display: "inline"}}><span
                            className={activity ? "category category-selected" : "category"}
                            onClick={selectAcitivity}>체중관리</span></div>
                        <div style={{display: "inline"}}><span
                            className={stress ? "category category-selected" : "category"}
                            onClick={selectStress}>스트레스관리</span></div>
                        <span><Button variant="outline-danger" style={{float: "right"}}
                                      onClick={navigateToCreatedArticle}>게시글 작성</Button></span>
                    </div>
                    <div>
                        {
                            activity ? (
                                activityArticles && activityArticles.map((item) => (
                                    <Accordion key={item.id}>
                                        <Accordion.Item eventKey="0" style={{marginBottom: "10px"}}>
                                            <Accordion.Header className="accordion-header"
                                                              style={{marginBottom: "0px"}}>
                                                <div style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "1px solid",
                                                    textAlign: "center",
                                                    lineHeight: "30px",
                                                    margin: "10px",
                                                    color: "white",
                                                    backgroundColor: "#E63A35",
                                                    borderRadius: "7px"
                                                }}>
                                                    <span>{item.id}</span>
                                                </div>
                                                <p style={{width: "70%"}}
                                                   className="accordion-title">{item.title}</p>
                                                <p style={{width: "12%", textAlign: "center", marginTop: "16px"}}>
                                                    <FcLike size="20" color="black"/>{likeCount[item.id]}</p>
                                                <p style={{
                                                    width: "15%",
                                                    textAlign: "center",
                                                    marginTop: "16px"
                                                }}>{item.username}</p>
                                            </Accordion.Header>
                                            <Accordion.Body style={{width: "100%"}}>
                                                {item.description}
                                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                                    <Button variant="outline-danger" onClick={() => {
                                                        navigateToArticle(item.id)
                                                    }}>게시글 보기</Button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            ) : (
                                stressArticles && stressArticles.map((item) => (
                                    <Accordion key={item.id}>
                                        <Accordion.Item eventKey="0" style={{marginBottom: "10px"}}>
                                            <Accordion.Header className="accordion-header"
                                                              style={{marginBottom: "0px"}}>
                                                <div style={{
                                                    width: "30px",
                                                    height: "30px",
                                                    border: "1px solid",
                                                    textAlign: "center",
                                                    lineHeight: "30px",
                                                    margin: "10px",
                                                    color: "white",
                                                    backgroundColor: "#E63A35",
                                                    borderRadius: "7px"
                                                }}>
                                                    <span>{item.id}</span>
                                                </div>
                                                <p style={{width: "70%"}}
                                                   className="accordion-title">{item.title}</p>
                                                <p style={{width: "12%", textAlign: "center", marginTop: "16px"}}>
                                                    <FcLike size="20" color="black"/> {likeCount[item.id]}</p>
                                                <p style={{
                                                    width: "15%",
                                                    textAlign: "center",
                                                    marginTop: "16px"
                                                }}>{item.username}</p>
                                            </Accordion.Header>
                                            <Accordion.Body style={{width: "100%"}}>
                                                {item.description}
                                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                                    <Button variant="outline-danger" onClick={() => {
                                                        navigateToArticle(item.id)
                                                    }}>게시글 보기</Button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            )
                        }
                    </div>
                </div>
                <div className="rank">
                    rank
                </div>
            </div>
        </div>
    );
}

export default Board;