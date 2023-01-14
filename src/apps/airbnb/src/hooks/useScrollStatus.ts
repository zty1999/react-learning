import { useEffect, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import {throttle } from "underscore"
import { changeSearchStatusAction } from "@airbnb/redux/modules/main";
/** 首页搜索状态下监听页面滚动取消搜索状态
 * 原监听方式：首页使用 usePosition 获取页面当前滚动位置进行监听判断
 * 问题：
 *    1. 由于页面滚动频繁触发，每次触发存储当前滚动位置都会使组件重新渲染（修改了state）
 *    2. 通过 throttle 节流也只能减少页面滚动频繁程度，但重新渲染次数依然过多（throttle 时间不能过长，不然页面反应迟钝，用户体验差）
 * 解决：
 *    1. 将搜索状态转移至redux中进行全局管理，当符合取消搜索状态条件时才进行state修改。
 *    2. 由于滚动位置不需要传至页面，所以监听到滚动位置后无需修改 state ，避免了每次修改 state中的滚动位置导致页面重新渲染的问题
 *  */ 
  
// 获取页面滚动位置
export const useScrollStatus = () => {
    // const [scrollPosition,setScrollPosition]=useState({scrollX:0,scrollY:0})
    const {isSearch,headerConfig} = useSelector(
      (state: any) => ({
        isSearch: state.main.isSearch,
        headerConfig: state.main.headerConfig,
      }),
      shallowEqual
    )
    const dispatch = useDispatch()
    const { isHome,topAlpha } = headerConfig;
    let prevY = useRef(0)

    useEffect(() => {
      const handleScroll = () => {
        // console.log(isSearch);
        const position =  {
          scrollX:window.scrollX,
          scrollY:window.scrollY,
        }
        // 处于搜索状态时 判断页面滚动距离大于 30 搜索状态重置为 false
        if(!isSearch) prevY.current = position.scrollY;
        if(Math.abs(position.scrollY - prevY.current) > 30 && isSearch){
          dispatch(changeSearchStatusAction(false) as any)
        }
        
        // // 当前页面为首页 且 滚动位置为0 搜索状态重置为 true
        // if(position.scrollY === 0 && isHome && !isSearch){
        //   console.log('dispatch isSearch true');
        //   dispatch(changeSearchStatusAction(true) as any)
        // }


     

        // setScrollPosition({
        //     scrollX:window.scrollX,
        //     scrollY:window.scrollY,
        // });
      }
        document.addEventListener("scroll",handleScroll)
      return () => {
        document.removeEventListener("scroll",handleScroll)
      }
    }, [isSearch])

};
