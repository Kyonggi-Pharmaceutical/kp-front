import React from 'react';
import '../Main.css'

function CreatedArticle({info}) {

    return (
        <div className="main-bg">
            <div className="main">
                {
                    <h3 className="small-title">카테고리</h3>
                    //카테고리에 따라 카테고리 출력
                }
                <table style={{width: "90%", margin: "20px auto"}}>
                    <tbody>
                    <tr style={{borderTop: "4px solid black", borderBottom: "1px solid lightgray"}}>
                        <th style={{width: "15%"}}>제목</th>
                        <td style={{width: "85%"}} colSpan={2}><input type="text"/></td>
                    </tr>
                    <tr style={{borderBottom: "2px solid lightgray"}}>
                        {
                            //info의 정보와 게시글의 정보가 같으면 수정 삭제 출력
                        }
                        <th style={{width: "15%"}}>작성자</th>
                        <td style={{width: "25%"}}>작성자이름</td>
                        <th style={{width: "60%"}}></th>
                    </tr>
                    <tr style={{borderBottom: "4px solid black"}}>
                        <td style={{width: "100%", minHeight: "300px"}} colSpan={3}>
                            <div style={{minHeight: "300px", width: "100%", padding: "10px"}}>
                                <textarea style={{width: "100%", border: "none", resize: "none"}} rows="10" placeholder="내용을 입력하세요!"/>
                            </div>
                        </td>
                    </tr>
                    </tbody>
                </table>
                <form className="comment-input">
                    <div className="comment-btn">취소</div>
                    <div className="comment-btn" style={{marginLeft: "10px"}}>등록</div>
                </form>

            </div>
        </div>
    );
}

export default CreatedArticle;
