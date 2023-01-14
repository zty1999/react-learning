import { memo, useEffect } from "react";

import { EntireWrapper } from "./style";

import EntireFilter from "./components/entire-filter";
import EntireRooms from "./components/entire-rooms";
import EntirePagination from "./components/entire-pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntireRoomListAction } from "@airbnb/redux/modules/entire/actionCreators";
import { changeHeaderConfigAction } from "@airbnb/redux/modules/main";


const Entire = memo(() => {
    /** 从redux中获取数据 */
  //  const {} = useSelector(() => {
  //   return {

  //   }
  //  })
  
    /** 派发异步的事件: 发送网络请求 */
    const dispatch = useDispatch()
    useEffect(() =>{
      console.log('entires 渲染');
      dispatch(changeHeaderConfigAction({isFixed:true,isHome:false,topAlpha:false}) as any)
      dispatch(fetchEntireRoomListAction() as any)
    },[])
    
  return (
    <EntireWrapper>
      <EntireFilter></EntireFilter>
      <EntireRooms></EntireRooms>
      <EntirePagination></EntirePagination>
    </EntireWrapper>
  );
});

export default Entire;
