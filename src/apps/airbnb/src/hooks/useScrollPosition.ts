import { useEffect, useState } from "react";
import {throttle } from "underscore"
// 获取页面滚动位置
export const useScrollPosition = () => {
	
    const [scrollPosition,setScrollPosition]=useState({scrollX:0,scrollY:0})
    useEffect(() => {
      const handleScroll = throttle(() => {
        setScrollPosition({
            scrollX:window.scrollX,
            scrollY:window.scrollY,
        });
      },100)
        document.addEventListener("scroll",handleScroll)
      return () => {
        document.removeEventListener("scroll",handleScroll)
      }
    }, [])
    return scrollPosition;
};
