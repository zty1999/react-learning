import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

// 异步操作 在 extraReducer中监听promise状态执行后续操作 或直接派发同步 action 执行后续操作
export const fetchUserInfoAction = createAsyncThunk("fetch/userInfo", async (payload, { dispatch }) => {
  const res = await axios.get("http://123.207.32.32:8000/home/multidata")
  const userinfo = res.data.data.keywords;
  dispatch(changeUserInfo(userinfo))
  return res.data;
})
const userSlice = createSlice({
  name: 'user',
  initialState: {
    userInfo: {}
  },
  reducers: {
    // action: {payload}
    changeUserInfo(state, { payload }) {
      state.userInfo = payload;
    }
  },
  // 异步的reducer
  extraReducers: {
    // [fetchUserInfoAction.pending as any](state, { payload }) {
    // ...
    // },
    [fetchUserInfoAction.fulfilled as any](state, { payload }) {
      state.userInfo = payload
    },
    // [fetchUserInfoAction.rejected as any](state, { payload }) {
    // ...
    // },
  }
})

export const { changeUserInfo } = userSlice.actions
export default userSlice.reducer