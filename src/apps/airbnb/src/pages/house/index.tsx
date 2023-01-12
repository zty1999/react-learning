import { memo, useCallback, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch, shallowEqual } from "react-redux";
import { useLogLife } from "@airbnb/hooks";
import DetailPictures from "./components/detail-pictures";

import {HouseWrapper} from "./style";

 const House = memo(
  () => {

    const { detailInfo } = useSelector((state:any)=>{
      return {
        detailInfo: state.detail.detailInfo
      }
    },shallowEqual)


    useLogLife({name:'house'})
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
        <header>{detailInfo.name}</header>
        <DetailPictures/>
      </HouseWrapper>
    );
  }
);

export default House;