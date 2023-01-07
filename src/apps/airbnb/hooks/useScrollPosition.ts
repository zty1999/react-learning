import { useEffect, useState } from "react";

// 获取页面滚动位置
export const useScrollPosition = () => {
	
    const [scrollPosition,setScrollPosition]=useState({scrollX:0,scrollY:0})
    useEffect(() => {
      const handleScroll = () => {
        setScrollPosition({
            scrollX:window.scrollX,
            scrollY:window.scrollY,
        });
      }
        document.addEventListener("scroll",handleScroll)
      return () => {
        document.removeEventListener("scroll",handleScroll)
      }
    }, [])
    return scrollPosition;
};
