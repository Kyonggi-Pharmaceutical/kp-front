import { configureStore, createSlice } from '@reduxjs/toolkit'

let user = createSlice({
    name : 'user',
    initialState : {email: '', firstName: '', lastName: '', stressPoint: 0},
    reducers:{
        loginUser(state, userInfo){
            state.email = userInfo.payload.email;
            state.firstName = userInfo.payload.firstName;
            state.lastName = userInfo.payload.lastName;
            return state;
        },
        setStress(state, point){
            
        }
    },
});
export let {loginUser} = user.actions

export default configureStore({
    reducer: {
        user : user.reducer
    }
})