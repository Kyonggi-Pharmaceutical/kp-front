import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function postLike(articleId) {
    const path = `/api/v1/articles/${articleId}/createdLike`;

    try {
        const response = await axios.post(`${API_URL}${path}`, null, {
            withCredentials: true,
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}