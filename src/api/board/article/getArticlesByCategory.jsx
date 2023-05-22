import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getArticlesByCategory(boardId) {
    const path = '/api/v1/boards/' + boardId + '/articles';

    try {
        const response = await axios.get(`${API_URL}${path}`, {
            withCredentials: true,
        });
        return response.data; // 데이터 반환
    } catch (error) {
        console.log(error);
        return null; // 에러 발생 시 null 반환
    }
}