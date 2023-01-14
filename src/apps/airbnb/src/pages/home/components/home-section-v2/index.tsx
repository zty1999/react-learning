import PropTypes from 'prop-types'
import React, { memo, useState, useCallback } from 'react'

import SectionHeader from '@airbnb/components/section-header'
import SectionRooms from '@airbnb/components/section-rooms'
import SectionTabs from '@airbnb/components/section-tabs'
import { SectionV2Wrapper } from './style'
import SectionFooter from '@airbnb/components/section-footer'

interface list {

}
const HomeSectionV2 = memo((props:any) => {
  /** 从props获取数据 */
  const { infoData } = props
  console.log(infoData);
  
  /** 定义内部的state */
  const initialName = Object.keys(infoData.dest_list)[0]
  const [name, setName] = useState(initialName)
  const tabNames = infoData.dest_address?.map(item => item.name)
  // useEffect(() => {
  //   setName("xxxxx")
  // }, [infoData])

  /** 事件处理函数 */
  const tabClickHandle = useCallback(function (index, name) {
    setName(name)
  }, [])

  return (
    <>
    {
      infoData &&
      <SectionV2Wrapper>
        <SectionHeader title={infoData.title} subtitle={infoData.subtitle}/>
        <SectionTabs tabNames={tabNames} tabClick={tabClickHandle}/>
        <SectionRooms roomList={infoData.dest_list?.[name]} itemWidth="33.33333%"/>
        <SectionFooter name={name}/>
      </SectionV2Wrapper>
    }
    </>
  )
})

// HomeSectionV2.propTypes = {
//   infoData: PropTypes.object
// }

export default HomeSectionV2