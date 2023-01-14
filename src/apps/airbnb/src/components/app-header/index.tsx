import classNames from "classnames";
import React, { memo, useEffect, useMemo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { ThemeProvider } from "styled-components";
import {throttle } from "underscore"


import { useScrollStatus } from "@airbnb/hooks/useScrollStatus";
import { useLogLife } from "@airbnb/hooks";
import { changeSearchStatusAction } from "@airbnb/redux/modules/main";
import { useScrollPosition } from "@airbnb/hooks/useScrollPosition";

import HeaderCenter from "./c-cpns/header-center";
import HeaderLeft from "./c-cpns/header-left";
import HeaderRight from "./c-cpns/header-right";
import { HeaderWrapper, SearchAreaWrapper } from "./style";

const AppHeader = memo(() => {
  useLogLife({name:'app-header'})
  /** 定义组件内部的状态 */
  // const [isSearch,setIsSearch] = useState(false)


  /** 监听滚动 搜索状态开启且滚动距离大于时 30 关闭搜索状态 组件会在滚动过程中一直重新渲染 */
  // const { scrollY } = useScrollPosition();
  // let prevY = useRef(0)
  // if(!isSearch) prevY.current = scrollY;
  // if(Math.abs(scrollY - prevY.current) > 30 && isSearch){
  //   setIsSearch(false)
  // }
  useScrollStatus();

  
 
  /** 从redux中获取数据 */
  const { headerConfig,isSearch } = useSelector(
    (state: any) => ({
      headerConfig: state.main.headerConfig,
      isSearch: state.main.isSearch,
    }),
    shallowEqual
  );
  const dispatch = useDispatch()
  const { isFixed,topAlpha,isHome } = headerConfig;

  // 当前页面为首页且页面滚动位置为0时 透明状态设为 true
  let isAlpha = () =>  {
    // console.log(isHome ,topAlpha && window.scrollY === 0);
    
    if( window.scrollY === 0){
      if(isHome ){
        console.log(isHome);
        
        // 搜索状态置为 true
        dispatch(changeSearchStatusAction(true) as any)
        // 透明状态设为 true
        return true;
      }else {
        dispatch(changeSearchStatusAction(false) as any)
      }
    }
    else {// 不满足条件 透明状态置为 false
      
      return false;
    }
  };
  useEffect(() => {
    console.log('头部组件渲染');
    
    // 监听页面滚动
    const handleScroll = throttle(() => {
      // console.log('scroll',isHome,topAlpha,window.scrollY);
      
      isAlpha()
    },100)
      document.addEventListener("scroll",handleScroll)
    return () => {
      document.removeEventListener("scroll",handleScroll)
    }
  }, [headerConfig,isHome,topAlpha])

  return (
    <ThemeProvider theme={{isAlpha:isAlpha()}}> 
          <HeaderWrapper isFixed={isFixed} isAlpha={isAlpha()} className={classNames({fixed:isFixed})}>
      <div className="content">
        <div className="top">
          <HeaderLeft />
          {/* <HeaderCenter isSearch={isSearch} searchBarClick={(e) => setIsSearch(true)} /> */}
          <HeaderCenter  searchBarClick={(e) => dispatch(changeSearchStatusAction(true) as any)} />
          <HeaderRight />
        </div>
        <SearchAreaWrapper>
        </SearchAreaWrapper>
      </div>
      {/* { isSearch && <div className="cover" onClick={(e) => setIsSearch(false)}></div>} */}
      { isSearch && !isAlpha() && <div className="cover" onClick={(e) => dispatch(changeSearchStatusAction(false) as any)}></div>}

    </HeaderWrapper>
    </ThemeProvider>
  ); 
});

export default AppHeader;
