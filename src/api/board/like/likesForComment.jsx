import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function likeForComment(commentId) {
    const path = `/api/v1/comments/${commentId}/maintainLikesForComments`;

    try {
        const response = await axios.get(`${API_URL}${path}`, {
            withCredentials: true,
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.log(error);
    }
}