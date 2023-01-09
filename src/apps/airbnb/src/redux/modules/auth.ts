import { createSlice } from "@reduxjs/toolkit"

const authSlice = createSlice({
    name:'auth',
    initialState:{
        auth:[]
    },
    reducers: {
        changeAuth(state,{payload}){
            state.auth = payload;
        },
    }
})

export default authSlice.reducer;
export const {changeAuth} = authSlice.actions;