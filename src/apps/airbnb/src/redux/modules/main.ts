
import { createSlice } from "@reduxjs/toolkit"
import { useScrollPosition } from "../../hooks/useScrollPosition";

const mainSlice = createSlice({
    name:'main',
    initialState:{
        headerConfig:{
          isFixed: false,
          isHome: false,
          topAlpha: false // 透明度
        },
        isSearch:false,
    },
    reducers: {
      changeHeaderConfigAction(state,{payload}){
        state.headerConfig = payload;
      },
      changeSearchStatusAction(state,{payload}){
        state.isSearch = payload;
      },
    }
})

export default mainSlice.reducer;
export const {changeHeaderConfigAction,changeSearchStatusAction} = mainSlice.actions;