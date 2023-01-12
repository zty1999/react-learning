import PropTypes from 'prop-types'
import React, { memo, useCallback } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import { changeDetailInfoAction } from '@/apps/airbnb/src/redux/modules/detail'


import SectionHeader from '@airbnb/components/section-header'
import { SectionV3Wrapper } from './style'
import RoomItem from '@airbnb/components/room-item'
import ScrollView from '@airbnb/base-ui/scroll-view'
import SectionFooter from '@airbnb/components/section-footer'


const HomeSectionV3 = memo((props:any) => {
  const { infoData } = props
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const itemClickHandle = useCallback((item) =>{
    dispatch(changeDetailInfoAction(item))
    navigate("/house")
  },[navigate,dispatch])
  return (
    <SectionV3Wrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle}/>
      <div className='room-list'>
        <ScrollView>
          {
            infoData.list.map(item => {
              return <RoomItem itemData={item} itemWidth="20%" key={item._id} itemClick={itemClickHandle}/>
            })
          }
        </ScrollView>
      </div>
      <SectionFooter name="plus"/>
    </SectionV3Wrapper>
  )
})

// HomeSectionV3.propTypes = {
//   infoData: PropTypes.object
// }

export default HomeSectionV3