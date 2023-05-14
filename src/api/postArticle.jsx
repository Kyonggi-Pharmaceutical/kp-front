import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function postArticle(article, boardId) {
    const path = '/api/v1/articles/' + boardId + '/createdAndUpdatedArticle';
    await axios
        .post(`${API_URL}${path}`, article,    //API 주소로 사용자정보(userInfo)를 담아 보냄
            {withCredentials: true})    //권한을 위한 쿠키를 첨가
        .then((response) => {
            console.log(response.data);     //성공했을 경우 데이터 출력해보기
        })
        .catch((error)=>{       //실패했을 경우 오류 출력
            console.log(error);
        })
}