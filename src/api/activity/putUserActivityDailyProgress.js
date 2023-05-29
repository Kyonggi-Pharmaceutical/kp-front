import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;

export async function putUserActivityDailyProgress(done) {
    const path = `/api/v1/stresses/daily-progress?done=` + done;

    try {
        const response = await axios.put(`${API_URL}${path}`, null, {
            withCredentials: true,
        });
        console.log(response.data);
    } catch (error) {
        console.log(error);
    }
}
