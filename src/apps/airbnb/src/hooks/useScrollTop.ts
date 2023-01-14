import { useEffect } from "react";
import { useLocation } from "react-router-dom";


// 回到顶部
export const useScrollTop = () => {
	
  const location = useLocation()
  useEffect(()=>{
    // 页面切换 回到顶部
    window.scrollTo(0,0)
  },[location])
};