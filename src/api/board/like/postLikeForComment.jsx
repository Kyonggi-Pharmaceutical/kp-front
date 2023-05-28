import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function postLikeForComment(commentId) {
    const path = `/api/v1/comments/${commentId}/likes`;

    try {
        const response = await axios.post(`${API_URL}${path}`, null, {
            withCredentials: true,
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}