import React, {useState, useEffect} from 'react';
import '../Main.css'
import Accordion from 'react-bootstrap/Accordion'
import './Board.css'
import Button from "react-bootstrap/Button";
import { AiOutlineLike } from "react-icons/ai";

function Board() {
    const testBoard = [
        {
            "boardId": 1,
            "userId": 'jeonh',
            "title": "sunt aut facere repellat provident occaecati exsdfsdfsdfsdfsdfsdfsdfsdfsdfasdfiashjdfjkjasdkl;jaskl;dfjal;skdjf;klasjd;cepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 2,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 3,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 4,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 5,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 6,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 7,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 8,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 9,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 10,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 11,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 12,
            "userId": 'hyun',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 13,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 14,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        },
        {
            "boardId": 15,
            "userId": 'aaaa',
            "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
            "description": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
        }
    ]

    /*
    const [boardData, setBoardData] = useState([]);

  useEffect(() => {
    // 게시판 데이터를 가져오는 API 호출
    // 예시로 fetch를 사용하여 데이터를 가져온다고 가정합니다.
    fetch('/api/board')
      .then((response) => response.json())
      .then((data) => setBoardData(data));
      setPageCount(Math.ceil(data.length / pageSize));
  }, []);
    * */
    useEffect(()=>{
        setPageCount(Math.ceil(testBoard.length / pageSize));
    }, [])

    //페이징
    const [currentPage, setCurrentPage] = useState(1);
    const [pageCount, setPageCount] = useState(1);
    const pageSize = 10;

    const handlePrevPage = () => {
        setCurrentPage((prevPage) => prevPage - 1);
    };

    const handleNextPage = () => {
        setCurrentPage((prevPage) => prevPage + 1);
    };

    const boardList = testBoard.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
    );

    //카테고리 이동 방법
    //체중관리, 스트레스 클릭할 때 activity, stress의 state값이 바뀜. 이걸로 호출하면 될 듯
    const [activity, setActivity] = useState(true);
    const [stress, setStress] = useState(false);
    const selectCategory = ()=>{
        setActivity(!activity);
        setStress(!stress);
    }

    //게시글로 이동
    const navigateToArticle = () => {
        console.log('article');
    }

    return (
        <div className="main-bg">
            <div className="board-rank">
                <div className="board">
                    <div style={{marginBottom: "20px"}}>
                        <span className={activity ? "category category-selected" : "category"} onClick={selectCategory}>체중관리</span><span className={stress ? "category category-selected" : "category"} onClick={selectCategory}>스트레스관리</span>
                    </div>
                    <div>
                        {
                            boardList.map((item)=>(
                                <Accordion key={item.boardId}>
                                    <Accordion.Item eventKey="0" style={{marginBottom: "10px"}}>
                                        <Accordion.Header className="accordion-header" style={{marginBottom: "0px"}}>
                                            <div style={{width: "30px", height: "30px", border: "1px solid", textAlign: "center", lineHeight: "30px", margin: "10px", color: "white", backgroundColor: "#E63A35", borderRadius: "7px"}}>
                                                <span>{item.boardId}</span>
                                            </div>
                                            <p style={{width: "70%"}} className="accordion-title">{item.title}</p>
                                            <p style={{width: "12%", textAlign: "center", marginTop: "16px"}}><AiOutlineLike size="20" color="black"/>5</p>
                                            <p style={{width: "15%", textAlign: "center", marginTop: "16px"}}>{item.userId}</p>
                                        </Accordion.Header>
                                        <Accordion.Body style={{width: "100%"}}>
                                            {item.description}
                                            <div style={{display: "flex", justifyContent: "flex-end"}}>
                                                <Button variant="outline-danger" onClick={navigateToArticle}>게시글 보기</Button>
                                            </div>
                                        </Accordion.Body>
                                    </Accordion.Item>
                                </Accordion>
                            ))
                        }
                    </div>

                    <Pagination
                        currentPage={currentPage}
                        pageCount={pageCount}
                        handlePrevPage={handlePrevPage}
                        handleNextPage={handleNextPage}
                    />
                </div>
                <div className="rank">
                    rank
                </div>
            </div>
        </div>
    );
}

function Pagination({ currentPage, pageCount, handlePrevPage, handleNextPage }) {
    return (
        <div style={{width: "100%", textAlign: "center"}}>
            <button disabled={currentPage === 1} onClick={handlePrevPage}>
                이전
            </button>
            <span>{currentPage}</span>
            <button disabled={currentPage === pageCount} onClick={handleNextPage}>
                다음
            </button>
        </div>
    );
}

export default Board;