import SectionFooter from '@airbnb/components/section-footer'
import SectionHeader from '@airbnb/components/section-header'
import SectionRooms from '@airbnb/components/section-rooms'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { SectionV1Wrapper } from './style'

const HomeSectionV1 = memo((props:any) => {
  const { infoData } = props
  return (
    <SectionV1Wrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle}/>
      <SectionRooms roomList={infoData.list} itemWidth="25%"/>
      <SectionFooter/>
    </SectionV1Wrapper>
  )
})

// HomeSectionV1.propTypes = {
//   infoData: PropTypes.object
// }

export default HomeSectionV1