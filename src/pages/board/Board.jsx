import React, {useState, useEffect} from 'react';
import '../Main.css'
import Accordion from 'react-bootstrap/Accordion'
import './Board.css'
import Button from "react-bootstrap/Button";
import { AiOutlineLike } from "react-icons/ai";
import {useNavigate} from "react-router-dom";
import {getArticlesByCategory} from "../../api/board/getArticlesByCategory";

function Board() {
    const [stressArticles, setStressArticles] = useState([]);
    const [activityArticles, setActivityArticles] = useState([]);
    const [boardId, setBoardId] = useState(0);
    useEffect(() => {
        async function fetchData() {
            const data1 = await getArticlesByCategory(0);
            setActivityArticles(data1);
            console.log(data1)
            const data2 = await getArticlesByCategory(1);
            setStressArticles(data2);;
        }
        fetchData();
    }, []);


    //카테고리 이동 방법
    //체중관리, 스트레스 클릭할 때 activity, stress의 state값이 바뀜. 이걸로 호출하면 될 듯
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
    //게시글로 이동
    const article = {
        "boardId": null,
        "userId": null,
        "title": null,
        "description": null,
        "username": null
    };
    const navigateToArticle = (articleId) => {
        navigate("/article", {state: {value : articleId}});
    }


    const navigateToCreatedArticle = () =>{
        navigate("/createdArticle", {state: {value : boardId}});
    }

    return (
        <div className="main-bg">
            <div className="board-rank">
                <div className="board">
                    <div style={{marginBottom: "20px"}}>
                        <div style={{display: "inline"}}><span className={activity ? "category category-selected" : "category"} onClick={selectAcitivity}>체중관리</span></div>
                        <div style={{display: "inline"}}><span className={stress ? "category category-selected" : "category"} onClick={selectStress}>스트레스관리</span></div>
                        <span><Button variant="outline-danger" style={{float: "right"}} onClick={navigateToCreatedArticle}>게시글 작성</Button></span>
                    </div>
                    <div>
                        {
                            activity ? (
                                activityArticles && activityArticles.map((item)=>(
                                    <Accordion key={item.id}>
                                        <Accordion.Item eventKey="0" style={{marginBottom: "10px"}}>
                                            <Accordion.Header className="accordion-header" style={{marginBottom: "0px"}}>
                                                <div style={{width: "30px", height: "30px", border: "1px solid", textAlign: "center", lineHeight: "30px", margin: "10px", color: "white", backgroundColor: "#E63A35", borderRadius: "7px"}}>
                                                    <span>{item.id}</span>
                                                </div>
                                                <p style={{width: "70%"}} className="accordion-title">{item.title}</p>
                                                <p style={{width: "12%", textAlign: "center", marginTop: "16px"}}><AiOutlineLike size="20" color="black"/>5</p>
                                                <p style={{width: "15%", textAlign: "center", marginTop: "16px"}}>{item.username}</p>
                                            </Accordion.Header>
                                            <Accordion.Body style={{width: "100%"}}>
                                                {item.description}
                                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                                    <Button variant="outline-danger" onClick={()=>{navigateToArticle(item.id)}}>게시글 보기</Button>
                                                </div>
                                            </Accordion.Body>
                                        </Accordion.Item>
                                    </Accordion>
                                ))
                            ) : (
                                stressArticles && stressArticles.map((item)=>(
                                    <Accordion key={item.id}>
                                        <Accordion.Item eventKey="0" style={{marginBottom: "10px"}}>
                                            <Accordion.Header className="accordion-header" style={{marginBottom: "0px"}}>
                                                <div style={{width: "30px", height: "30px", border: "1px solid", textAlign: "center", lineHeight: "30px", margin: "10px", color: "white", backgroundColor: "#E63A35", borderRadius: "7px"}}>
                                                    <span>{item.id}</span>
                                                </div>
                                                <p style={{width: "70%"}} className="accordion-title">{item.title}</p>
                                                <p style={{width: "12%", textAlign: "center", marginTop: "16px"}}><AiOutlineLike size="20" color="black"/>5</p>
                                                <p style={{width: "15%", textAlign: "center", marginTop: "16px"}}>{item.username}</p>
                                            </Accordion.Header>
                                            <Accordion.Body style={{width: "100%"}}>
                                                {item.description}
                                                <div style={{display: "flex", justifyContent: "flex-end"}}>
                                                    <Button variant="outline-danger" onClick={()=>{navigateToArticle(item.id)}}>게시글 보기</Button>
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