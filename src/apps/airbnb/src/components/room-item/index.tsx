import PropTypes from 'prop-types'
import React, { memo } from 'react'
import { Rating } from '@mui/material'
import { ItemWrapper,BottomExtra } from './style'

const RoomItem = memo((props:any) => {
  const { itemData, itemWidth = "25%" } = props

  return (
    <ItemWrapper 
      verifyColor={itemData?.verify_info?.text_color || "#39576a"}
      itemWidth={itemWidth}
    >
      <div className='inner'>
        <div className='cover'>
          <img src={itemData.picture_url} alt="" />
        </div>
        <div className='desc'>
          {itemData.verify_info.messages.join(" · ")}
        </div>
        <div className='name'>{itemData.name}</div>
        <div className='price'>¥{itemData.price}/晚</div>

        <div className='bottom'>
          <Rating 
            name="readOnly"
            value={itemData.star_rating ?? 5}
            precision={0.1}
            readOnly 
            sx={{ fontSize: "12px", color: "#00848A", marginRight: "-1px" }}
          />
          <span className='count'>{itemData.reviews_count}</span>
          {
            itemData.bottom_info && 
            <BottomExtra className='extra' 
              verifyColor={itemData?.bottom_info?.content_color || "#39576a"} 
              fontSize={itemData?.bottom_info?.font_size || "10"} 
              viewType={itemData?.bottom_info?.visibility || "LIST_VIEW"}>
                ·{itemData.bottom_info?.content}
            </BottomExtra>
          }
        </div>
      </div>
    </ItemWrapper>
  )
})

// RoomItem.propTypes = {
//   itemData: PropTypes.object
// }

export default RoomItem