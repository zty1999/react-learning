import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeDetailInfoAction } from '@/apps/airbnb/src/redux/modules/detail'

import RoomItem from '../room-item'
import { RoomsWrapper } from './style'

const SectionRooms = memo((props:any) => {
  const { roomList = [], itemWidth } = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemClickHandle = useCallback((itemData) =>{
    console.log(itemData);
    
    dispatch(changeDetailInfoAction(itemData))
    navigate("/house")
  },[navigate,dispatch])
  return (
    <RoomsWrapper>
      {
        roomList.slice(0, 8)?.map(item => {
          return <RoomItem itemData={item} itemWidth={itemWidth} key={item._id} itemClick={itemClickHandle}/>
        })
      }
    </RoomsWrapper>
  )
})

// SectionRooms.propTypes = {
//   roomList: PropTypes.array
// }

export default SectionRooms