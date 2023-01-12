import React, { createRef, memo, useEffect, useRef } from 'react'
import { IndicatorWrapper } from './style'

const Indicator = memo((props:any) => {
  let { selectIndex } = props;
  
  const contentRef = useRef()
  useEffect(()=> {
    console.log(selectIndex);
    
    // selectIndex = (selectIndex?selectIndex:0);
    if(typeof selectIndex != 'number'){
      throw new Error("Indicator 组件，需要提供 selectIndex ")
    }
    let contentEl = (contentRef.current as any);
    console.log(contentEl,props.children,contentEl?.children,selectIndex);
    
    // 1. 获取 selectIndex 对应的 item 元素
    const selectItemEl = contentEl?.children[selectIndex];
    const itemLeft = selectItemEl.offsetLeft;
    const itemWidth = selectItemEl.clientWidth;
   
    // 2. 获取 content 的宽度 和 content 可滚动宽度
    const contentWidth = contentEl.clientWidth;
    console.log(itemLeft,itemWidth,contentWidth);
    const contentScroll = contentEl.scrollWidth;
    // 3. 计算 selectIndex 要滚动的距离
    console.log(selectIndex,'useEffect');
    let distance = itemLeft +  itemWidth * 0.5 - contentWidth * 0.5;
    console.log(distance);
    // 4. 左右滚动到底特殊情况处理
    if(distance < 0) distance = 0; // 向左滚动 滚动到底 没有滚动距离  重置为0
    const totalDistance = contentScroll - contentWidth;
    console.log(totalDistance);
    
    if(distance > totalDistance) distance = totalDistance;// 向右滚动  滚动距离大于可滚动宽度  重置为可滚动宽度
    // 5. 修改 content 滚动距离
    console.log(distance);
    contentEl.style.transform = `translate(${-distance}px)`
    
  },[selectIndex])
  return (
    <IndicatorWrapper>
      <div className='i-content' ref={contentRef as any}>
        {props.children}
      </div>
    </IndicatorWrapper>

  )
})

export default Indicator