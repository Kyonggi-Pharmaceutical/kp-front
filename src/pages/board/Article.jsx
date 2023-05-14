import React, {useEffect, useState} from 'react';
import '../Main.css'
import { RiDeleteBin6Line } from "react-icons/ri";
import { TfiPencilAlt } from "react-icons/tfi";
import {useLocation} from "react-router-dom";
import {getArticleDetail} from "../../api/getArticleDetail";
import { AiOutlineUser } from "react-icons/ai";

function Article({info}) {
    const location = useLocation();
    const [article, setArticle] = useState([]);
    useEffect(() => {
        async function fetchData() {
            const data = await getArticleDetail(location.state.value);
            setArticle(data);
        }
        fetchData();
    }, []);

    return (
        <div className="main-bg">
            <div className="main">
                {
                    //카테고리에 따라 카테고리 출력
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                        <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                            <th style={{width: "15%"}}>제목</th>
                            <td style={{width: "85%"}} colSpan={4}>{article.title}</td>
                        </tr>
                        <tr style={{borderBottom: "2px solid lightgray"}}>
                            {
                                //info의 정보와 게시글의 정보가 같으면 수정 삭제 출력
                            }
                            <th style={{width: "15%"}}>작성자</th>
                            <td style={{width: "25%"}}>익명</td>
                            <th style={{width: "40%"}}></th>
                            <th style={{width: "10%"}}>수정<TfiPencilAlt /></th>
                            <th style={{width: "10%"}}>삭제<RiDeleteBin6Line /></th>
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
                    <input type="text" placeholder="댓글을 입력하세요"/><div className="comment-btn">등록</div>
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
