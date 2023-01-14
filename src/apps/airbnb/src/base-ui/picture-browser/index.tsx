import React, { createRef, memo, useEffect, useRef, useState } from 'react'
import { CSSTransition,SwitchTransition } from "react-transition-group"

import Indicator from '@airbnb/base-ui/indicator';
import IconClose from '@airbnb/assets/svg/icon-close';
import IconArrowLeft from "@airbnb/assets/svg/icon-arrow-left";
import IconArrowRight from "@airbnb/assets/svg/icon-arrow-right";
import IconTriangleArrowBottom from '@airbnb/assets/svg/icon-triangle-arrow-bottom';
import IconTriangleArrowTop from '@airbnb/assets/svg/icon-triangle-arrow-top';

import { PictureBrowserWrapper } from './style'
import classNames from 'classnames';

const PictureBrowser = memo((props:any) => {
  let { pictureUrls,closeClick } = props;
  const [currentIndex,setCurrentIndex] = useState(0)
  const [isNext,setIsNext] = useState(true)
  const [showPreview,setShowPreview] = useState(true)

  // 当图片浏览器展示出来时，滚动功能消失
  useEffect(() => {
    document.body.style.overflow = "hidden"
    return () => {
      document.body.style.overflow = "auto"
    }
  },[])
  const closeBtnClickHandle = () => {
    if(closeClick) closeClick()
  }
  const toggleClickHandle = (isNext = true) => {
    let newIndex = (isNext?currentIndex + 1:currentIndex - 1);
    if (newIndex < 0) newIndex = pictureUrls.length - 1;
    if (newIndex > pictureUrls.length - 1) newIndex = 0;
    setCurrentIndex(newIndex);
    setIsNext(isNext)
  };
  function bottomItemClickHandle(index){
    setIsNext(index > currentIndex? true:false)
    setCurrentIndex(index)
  }
  return (
    <PictureBrowserWrapper isNext={isNext} showPreview={showPreview}>
      <div className="top">
        <div className="close-btn" onClick={closeBtnClickHandle}>
          <IconClose width="25" height="25" />
        </div>
      </div>
      <div className="slider">
        <div className="control">
          <div className="btn left" onClick={(e) => toggleClickHandle(false)}>
            <IconArrowLeft width="60" height="60" />
          </div>
          <div className="btn right" onClick={(e) => toggleClickHandle(true)}>
            <IconArrowRight width="60" height="60" />
          </div>
        </div>
        <div className="picture">
          <SwitchTransition mode='out-in'>
              <CSSTransition key={pictureUrls[currentIndex]} classNames="fade"
                timeout={150} >
                <img src={pictureUrls[currentIndex]} alt="" />
              </CSSTransition>
          </SwitchTransition>
        </div>
      </div>
      <div className="preview">
        <div className="info">
          <div className="desc">
            <div className="count">
              <span>{currentIndex}/{pictureUrls.length}</span>
              <span>room apartment图片{currentIndex}</span>
            </div>
            <div className="toggle" onClick={e => setShowPreview(!showPreview)}>
              <span>{showPreview?'隐藏':'显示'}照片列表</span>
              {showPreview ? <IconTriangleArrowBottom/>:<IconTriangleArrowTop/>}
            </div>
          </div>
        </div>
        <div className="list">
          <Indicator selectIndex={currentIndex}>
            {
              pictureUrls.map((item,index) =>{
                return (
                  <div key={item} className={classNames("item", {
                    active: currentIndex === index,
                  })} onClick={e => bottomItemClickHandle(index)}>
                    <img src={item} alt="" />
                  </div>
                )
              })
            }
          </Indicator>
        </div>
      </div>
    </PictureBrowserWrapper>

  )
})

export default PictureBrowser