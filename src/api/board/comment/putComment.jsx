import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function putComment(comment, commentId) {
    const path = '/api/v1/articles/' + commentId + '/updatedComment';

    await axios
        .put(`${API_URL}${path}`, comment,    //API 주소로 사용자정보(userInfo)를 담아 보냄
            {withCredentials: true})    //권한을 위한 쿠키를 첨가
        .then((response) => {
            console.log(response.data);     //성공했을 경우 데이터 출력해보기
        })
        .catch((error)=>{       //실패했을 경우 오류 출력
            console.log(error);
        })
}