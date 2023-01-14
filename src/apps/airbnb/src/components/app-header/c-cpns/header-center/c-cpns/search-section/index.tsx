import IconSearchBar from '@airbnb/assets/svg/icon-search-bar'
import classNames from 'classnames';
import React, { memo, useState } from 'react'
import { SectionWrapper } from './style'

const SearchSection = memo((props:any) => {
  const { searchInfos,tabClick} = props;
  const [currentIndex,setCurrentIndex] = useState(0)
  function itemClickHandle(index){
    setCurrentIndex(index)
    if(tabClick)tabClick(index);
  }
  return (
    <SectionWrapper>
      {
        searchInfos.map((item,index) =>{
          return (
            <div className="section-item" key={item.title} >
              <div className="info">
                <div className="title">{item.title}</div>
                <div className="desc">{item.desc}</div>
              </div>
              { index !== searchInfos.length -1 && <div className="divider"></div>}
            </div>
          )
        })
      }
    </SectionWrapper>
  )
})

export default SearchSection