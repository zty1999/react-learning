import { memo } from "react";
import Pagination from '@mui/material/Pagination';
import { PaginationWrapper } from "./style";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { fetchEntireRoomListAction } from "@airbnb/redux/modules/entire/actionCreators";


const EntirePagination = memo(() => {
    /** 从redux中获取数据 */
    const { totalCount,currentPage } = useSelector((state:any)=>({
      totalCount:state.entire.totalCount,
      currentPage:state.entire.currentPage
    }),shallowEqual)
  
    /** 派发异步的事件: 发送网络请求 */
    const totalPage = Math.ceil(totalCount / 20);
    const startCount = currentPage * 20 + 1;
    const endCount = (currentPage + 1) * 20;

    /** 事件处理的逻辑 **/
    const dispatch = useDispatch()
    const handleChange = (event: React.ChangeEvent<unknown>, value: number) => {
      // 回到顶部
      window.scrollTo(0,0)
      dispatch(fetchEntireRoomListAction(value - 1) as any)
    };
  return (
    <PaginationWrapper>
      {
        !!totalCount && 
        (<div className="info">
          <Pagination count={totalPage} onChange={handleChange} />
          <p className="desc">第{startCount}-{endCount}个房源，共超过{totalCount}个</p>
        </div>)
      }
    </PaginationWrapper>
  );
});

export default EntirePagination;
