import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { shallowEqual, useSelector,useDispatch } from "react-redux";
import { changeDetailInfoAction } from '@/apps/airbnb/src/redux/modules/detail'

import { RoomsWrapper } from "./style";  
import RoomItem from "@airbnb/components/room-item";  

const EntireRooms = memo(() => {
   const {roomList,totalCount,isLoading} =  useSelector((state:any)=>({
    roomList: state.entire.roomList ,
    totalCount: state.entire.totalCount,
    isLoading: state.entire.isLoading
   }),shallowEqual)
   const navigate = useNavigate();
   const dispatch = useDispatch();
   const itemClickHandle = useCallback((item) =>{
    console.log(item);
     dispatch(changeDetailInfoAction(item))
     navigate("/house")
   },[navigate,dispatch])
   
    
  return (
    <RoomsWrapper>
      <h2 className="title">{totalCount && totalCount + '多'}处住宿</h2>
      <div className="list">
      {
        roomList && roomList.map(item => {
          return (<RoomItem itemData={item} itemWidth="20%" key={item._id} itemClick={itemClickHandle}></RoomItem> )
        })
      }
      </div>
      {isLoading && (<div className="cover">loading...</div>)}
      
    </RoomsWrapper>
  );
});

export default EntireRooms;
