import IconArrowLeft from '@airbnb/assets/svg/icon-arrow-left'
import IconArrowRight from '@airbnb/assets/svg/icon-arrow-right'
import React, { memo, useEffect, useState } from 'react'
import { useRef } from 'react'
import { ViewWrapper } from './style'

const ScrollView = memo((props:any) => {
  /** 定义内部的状态 */
  const [showLeft, setShowLeft] = useState(false)
  const [showRight, setShowRight] = useState(false)
  const [posIndex, setPosIndex] = useState(0)
  const totalDistanceRef = useRef()

  /** 组件渲染完毕, 判断是否显示右侧的按钮 */
  const scrollContentRef = useRef()
  useEffect(() => {
    if(scrollContentRef && totalDistanceRef){
      const scrollWidth = (scrollContentRef.current as any).scrollWidth // 一共可以滚动的宽度
      const clientWidth = (scrollContentRef.current as any).clientWidth // 本身占据的宽度
      const totalDistance:any = scrollWidth - clientWidth  // 可滚动距离  
      totalDistanceRef.current = totalDistance
      setShowRight(totalDistance > 0) 
    }
  }, [props.children])

  /** 事件处理的逻辑 */
  function controlClickHandle(isRight) {
    const newIndex = isRight ? posIndex + 1: posIndex - 1
    const newEl = (scrollContentRef.current as any).children[newIndex]
    const newOffsetLeft = newEl.offsetLeft;
    (scrollContentRef.current as any).style.transform = `translate(-${newOffsetLeft}px)`
    setPosIndex(newIndex)
    // 是否继续显示右侧的按钮
    setShowRight((totalDistanceRef.current as any) > newOffsetLeft)
    setShowLeft(newOffsetLeft > 0) 
  }

  return (
    <ViewWrapper>
      { showLeft && (
        <div className="control-wrapper left">
          <div className='control ' onClick={e => controlClickHandle(false)}>
            <IconArrowLeft/>
          </div>
        </div>
      ) }
      { showRight && (
        <div className="control-wrapper right">
          <div className='control ' onClick={e => controlClickHandle(true)}>
            <IconArrowRight/>
          </div>
        </div>
      ) }

      <div className='scroll'>
        <div className='scroll-content' ref={scrollContentRef as any}>
          {props.children}
        </div>
      </div>
    </ViewWrapper>
  )
})

// ScrollView.propTypes = {}

export default ScrollView


