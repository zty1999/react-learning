import { memo, useCallback, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch, shallowEqual } from "react-redux";
import { useLogLife } from "@airbnb/hooks";
import DetailPictures from "./components/detail-pictures";

import {HouseWrapper} from "./style";
import { changeHeaderConfigAction } from "@airbnb/redux/modules/main";

 const House = memo(
  () => {
    useLogLife({name:'house'})

    const { detailInfo } = useSelector((state:any)=>{
      return {
        detailInfo: state.detail.detailInfo
      }
    },shallowEqual)



    /** 派发异步的事件: 发送网络请求 */
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(changeHeaderConfigAction({isFixed:false,isHome:false,topAlpha:false}) as any)
    }, [dispatch])


    // const position = useScrollPosition()
    // console.log(position);
    // const theme = useContext(ThemeContext)
    // console.log(theme);
    
    // const [highscore,setHighScore] = useState({} as any)

    // useEffect(()=>{
    //   hyRequest.get({url:"/home/highscore"}).then(res =>{
    //     console.log(res);
    //     setHighScore(res)
    //     console.log(highscore);
    //   })
    // },[])


    // const memoizedCallback = useCallback(
    //   () => {
    //     // doSomething(a, b);
    //   },[]);
    // const result = useMemo(
    //   () => {
    //     return 50
    //   },[]);
    return (
      <HouseWrapper>
        <DetailPictures/>
      </HouseWrapper>
    );
  }
);

export default House;