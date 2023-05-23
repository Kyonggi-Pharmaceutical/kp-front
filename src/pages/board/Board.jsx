import React, {useState, useEffect} from 'react';
import axios from "axios"
import '../Main.css'
import '../Main1.css'
import Accordion from 'react-bootstrap/Accordion'
import './Board.css'
import Button from "react-bootstrap/Button";
import ButtonGroup from 'react-bootstrap/ButtonGroup';
import ToggleButton from 'react-bootstrap/ToggleButton';
import {AiOutlineLike} from "react-icons/ai"
import {useNavigate} from "react-router-dom";
import {getArticlesByCategory} from "../../api/board/article/getArticlesByCategory";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import {getMonthMBTI} from "../../api/board/rank/getMonthMBTI";
import {getMonthALL} from "../../api/board/rank/getMonthAll";

function Board() {
    const [stressArticles, setStressArticles] = useState([]);
    const [activityArticles, setActivityArticles] = useState([]);
    const [boardId, setBoardId] = useState(0);
    const [likeCount, setLikeCount] = useState({});

    const [dayALL, setDayALL] = useState([]);
    const [dayMBTI, setDayMBTI] = useState([]);
    const [weekALL, setWeekALL] = useState([]);
    const [weekMBTI, setWeekMBTI] = useState([]);
    const [monthALL, setMonthALL] = useState([]);
    const [monthMBTI, setMonthMBTI] = useState([]);

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

            setMonthMBTI( await getMonthMBTI());
            setMonthALL( await getMonthALL());
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
        <div className="main-container">
        <div className="main-bgs">
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
                                                    <AiOutlineLike size="20"/> {likeCount[item.id]}</p>
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
                                                    <AiOutlineLike  size="20"/> {likeCount[item.id]}</p>
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
                <Rank dayMBTI={dayMBTI} dayALL={dayALL} weekMBTI={weekMBTI} weekALL={weekALL} monthMBTI={monthMBTI} monthALL={monthALL}/>
            </div>
        </div>
        </div>
    );
}

function Rank({dayMBTI, dayALL, weekMBTI, weekALL, monthMBTI, monthALL}) {
    const [medal, setMedal] = useState({1: '/icon/first.png', 2: '/icon/second.png', 3: '/icon/third.png'});

    const [radioValue, setRadioValue] = useState('1');
    const radios = [
        { name: 'MBTI', value: '1' },
        { name: 'ALL', value: '2' },
    ];

    return (
        <div className="rank" style={{display: "flex", flexDirection: "column"}}>
            <Tabs
                defaultActiveKey="daily"
                id="justify-tab-example"
                className="mb-3"
                justify
            >
                <Tab eventKey="daily" title={<span className="rank-title">Daily</span>} >
                    {radioValue == 1 ? (
                        <>
                            <h3 className="rank-small-title">MBTI</h3>
                            {dayMBTI.map((item) => (
                                <div className="rank-map" key={item.rank}>
                                    <img src={medal[item.rank]} width="30px" /> {item.mbti}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <h3 className="rank-small-title">ALL</h3>
                            {dayALL.map((item) => (
                                <div className="rank-map" key={item.rank}>
                                    <img src={medal[item.rank]} width="30px" /> {item.nickname}
                                </div>
                            ))}
                        </>
                    )}
                </Tab>
                <Tab eventKey="weekly" title={<span className="rank-title">Weekly</span>}>
                    {radioValue == 1 ? (
                        <>
                            <h3 className="rank-small-title">MBTI</h3>
                            {weekMBTI.map((item) => (
                                <div className="rank-map" key={item.rank}>
                                    <img src={medal[item.rank]} width="30px" /> {item.mbti}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <h3 className="rank-small-title">ALL</h3>
                            {weekALL.map((item) => (
                                <div className="rank-map" key={item.rank}>
                                    <img src={medal[item.rank]} width="30px" /> {item.nickname}
                                </div>
                            ))}
                        </>
                    )}
                </Tab>
                <Tab eventKey="monthly" title={<span className="rank-title">Monthly</span>}>
                    {radioValue == 1 ? (
                        <>
                            <h3 className="rank-small-title">MBTI</h3>
                            {monthMBTI.map((item) => (
                                <div className="rank-map" key={item.rank}>
                                    <img src={medal[item.rank]} width="30px" /> {item.mbti}
                                </div>
                            ))}
                        </>
                    ) : (
                        <>
                            <h3 className="rank-small-title">ALL</h3>
                            {monthALL.map((item) => (
                                <div className="rank-map" key={item.rank}>
                                    <img src={medal[item.rank]} width="30px" /> {item.nickname}
                                </div>
                            ))}
                        </>
                    )}
                </Tab>
            </Tabs>
            <ButtonGroup style={{display: "flex", justifyContent: "center", marginTop: "auto"}}>
                {radios.map((radio, idx) => (
                    <ToggleButton
                        key={idx}
                        id={`radio-${idx}`}
                        type="radio"
                        variant="outline-success"
                        name="radio"
                        value={radio.value}
                        checked={radioValue === radio.value}
                        onChange={(e) => setRadioValue(e.currentTarget.value)}
                    >
                        {radio.name}
                    </ToggleButton>
                ))}
            </ButtonGroup>
        </div>
    );
}

export default Board;