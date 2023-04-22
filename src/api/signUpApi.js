import axios from "axios";

// const API_URL = process.env.REACT_APP_API_URL;
// const path = '/api/v1/users/sign-up';

export async function signUpApi(userInfo) {
    //User: JSON.stringify(user),
    console.log(userInfo);
    await axios
        .post("http://localhost:8080/api/v1/users/sign-up", {
            UserRequest : userInfo,
        },
            {withCredentials: true})
        .then((response) => {
            console.log(response.data);
        })
        .catch((error)=>{
            console.log(error);
        })
}