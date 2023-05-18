import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function postLike(articleId) {
    const path = '/api/v1/articles/' + articleId + '/createdLike';
    await axios
        .post(`${API_URL}${path}`,
            {withCredentials: true})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
}