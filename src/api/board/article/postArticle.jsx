import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function postArticle(article, boardId) {
    const path = '/api/v1/articles/' + boardId + '/createdArticle';
    await axios
        .post(`${API_URL}${path}`, article,
            {withCredentials: true})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
}