import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function getMbtiRanking(period) {
    const path = '/api/v1/ranking/mbti/'+ period;
    try {
        const response = await axios.get(`${API_URL}${path}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return [];
    }
}