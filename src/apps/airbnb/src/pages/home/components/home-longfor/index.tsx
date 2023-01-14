import ScrollView from '@airbnb/base-ui/scroll-view'
import LongforItem from '@/apps/airbnb/src/components/longfor-item'
import SectionHeader from '@airbnb/components/section-header'
import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { LongforWrapper } from './style'

const HomeLongfor = memo((props:any) => {
  const { infoData } = props

  return (
    <LongforWrapper>
      <SectionHeader title={infoData.title} subtitle={infoData.subtitle}/>
      <div className='longfor-list'>
        <ScrollView>
          {
            infoData.list.map(item => {
              return <LongforItem itemData={item._id} key={item.city}/>
            })
          }
        </ScrollView>
      </div>
    </LongforWrapper>
  )
})

// HomeLongfor.propTypes = {
//   infoData: PropTypes.object
// }

export default HomeLongfor