import { createSlice } from "@reduxjs/toolkit"

const menuSlice = createSlice({
    name:'menu',
    initialState:{
        menus:[]
    },
    reducers: {
        changeMenu(state,{payload}){
            state.menus = payload;
        },
    }
})

export default menuSlice.reducer;
export const {changeMenu} = menuSlice.actions;