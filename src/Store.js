import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {
        email: "",
        firstName: "",
        lastName: "",
        profileImageUrl: "",
        nickname: "",
        gender: "",
        dateOfBirth: "",
        height: 0.0,
        weight: 0.0,
        mbti: "",
        isSmoking: false,
        isAlcohol: false,
        HealthcareType: "HEALTH",
        stressPoint: 0,
    },
    reducers:{
        loginUser(state, userInfo){
            state.email = userInfo.payload.email;
            state.firstName = userInfo.payload.firstName;
            state.lastName = userInfo.payload.lastName;
            state.profileImageUrl = userInfo.payload.profileImageUrl;
            return state;
        },
        signUpStore(state, userInfo){
            state.nickname = userInfo.payload.nickname;
            state.gender = userInfo.payload.gender;
            state.dateOfBirth = userInfo.payload.dateOfBirth;
            state.height = userInfo.payload.height;
            state.weight = userInfo.payload.weight;
            state.mbti = userInfo.payload.mbti;
            state.isSmoking = userInfo.payload.isSmoking;
            state.isAlcohol = userInfo.payload.isAlcohol;
            state.HealthcareType = userInfo.payload.HealthcareType;
            return state;
        },
        setStress(state, point){
            
        }
    },
});
export let {loginUser, signUpStore} = user.actions

export default configureStore({
    reducer: {
        user : user.reducer
    }
})