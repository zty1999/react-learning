import { memo, useEffect } from "react";

import { EntireWrapper } from "./style";

import EntireFilter from "./components/entire-filter";
import EntireRooms from "./components/entire-rooms";
import EntirePagination from "./components/entire-pagination";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntireRoomListAction } from "../../redux/modules/entire/actionCreators";


const Entire = memo(() => {
    /** 从redux中获取数据 */
  //  const {} = useSelector(() => {
  //   return {

  //   }
  //  })
  
    /** 派发异步的事件: 发送网络请求 */
    const dispatch = useDispatch()
    useEffect(() =>{
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
