import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL;
const path = '/api/v1/users/sign-up';

export async function signUpApi(userInfo) {
    console.log(userInfo);
    await axios
        .post(`${API_URL}${path}`, userInfo,
            {withCredentials: true})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
}