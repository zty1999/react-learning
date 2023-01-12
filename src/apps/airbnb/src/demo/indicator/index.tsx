import React, { memo, useState } from 'react'
import Indicator from '@airbnb/base-ui/indicator'
import { DemoWrapper } from "./style"
const IndicatorDemo = memo(() => {
  const names = new Array(20).fill('').map((item,index) => index)
  console.log(names);
  
  const [selectIndex,setSelectIndex] = useState(0)
  const toggleClickHandle = (isNext = true) =>{
    let newIndex = isNext ? selectIndex + 1: selectIndex - 1;
    if(newIndex < 0)   newIndex = names.length - 1;
    if(newIndex > names.length - 1) newIndex = 0;
    setSelectIndex(newIndex)
    console.log(newIndex);
  }
  return (
    <DemoWrapper>
      <div>IndicatorDemo</div>
      <div className="control">
        {selectIndex}
        <button onClick={e => toggleClickHandle(false)}>上一个</button>
        <button onClick={e => toggleClickHandle(true)}>下一个</button>
      </div>
      <div className="list">
        <Indicator selectIndex={selectIndex}>
          {
            names.map((item,index) => {
              return (<span className='list-item' key={index}>{item}</span>)
            })
          }
        </Indicator>
      </div>
    </DemoWrapper>
  )
})

export default IndicatorDemo