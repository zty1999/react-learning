import { getEntireRoomList } from "../../../services/modules/entire"
import * as actionTypes from "./constants"

export const changeCurrentPageAction = (currentPage) => ({
  type:actionTypes.CHANGE_CURRENT_PAGE,
  currentPage  
})
export const changeRoomListAction = (roomList) => ({
  type:actionTypes.CHANGE_Room_LIST,
  roomList  
})
export const changeTotalCountAction = (totalCount) => ({
  type:actionTypes.CHANGE_TOTAL_COUNT,
  totalCount  
})
export const changeIsLoadingAction = (isLoading) => ({
  type:actionTypes.CHANGE_IS_LOADING,
  isLoading  
})

export const fetchEntireRoomListAction = (page = 0) =>{
  return async (dispatch,getState) => {
    // 0. 修改 currentPage
    dispatch(changeCurrentPageAction(page))
    // 1. 根据页码获取最新数据
    // 1.1 显示 loading 蒙版
    dispatch(changeIsLoadingAction(true) as any)
    const {currentPage} = getState().entire;
    const res = await getEntireRoomList(currentPage * 20)
    dispatch(changeIsLoadingAction(false) as any)
    // 2. 获取到最新数据，保存 redux 的 store 中
    const roomList = res.list;
    const totalCount = res.totalCount;
    dispatch(changeRoomListAction(roomList))
    dispatch(changeTotalCountAction(totalCount))
    console.log("EntireRoomList",res);
    
  }
}