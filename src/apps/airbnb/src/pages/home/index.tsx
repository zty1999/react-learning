import { memo,useEffect } from "react";
import { shallowEqual, useDispatch, useSelector } from 'react-redux'


import { isEmptyObj } from '@airbnb/utils'
import { fetchHomeDataAction } from '@airbnb/redux/modules/home'

import { HomeWrapper } from "./style";

import HomeBanner from "./components/home-banner";
import HomeSectionV1 from "./components/home-section-v1";
import HomeSectionV2 from "./components/home-section-v2";
import HomeSectionV3 from "./components/home-section-v3";
import HomeLongfor from "./components/home-longfor";
import { useLogLife } from "../../hooks";
import { changeHeaderConfigAction } from "../../redux/modules/main";
const Home = memo(() => {
    /** 从redux中获取数据 */
    const { 
      goodPriceInfo, 
      highScoreInfo, 
      discountInfo, 
      recommendInfo, 
      longforInfo, 
      plusInfo 
    } = useSelector((state:any) => ({
      goodPriceInfo: state.home.goodPriceInfo,
      highScoreInfo: state.home.highScoreInfo,
      discountInfo: state.home.discountInfo,
      recommendInfo: state.home.recommendInfo,
      longforInfo: state.home.longforInfo,
      plusInfo: state.home.plusInfo
    }), shallowEqual)
  
    /** 派发异步的事件: 发送网络请求 */
    const dispatch = useDispatch()
    useEffect(() => {
      dispatch(fetchHomeDataAction() as any)
      dispatch(changeHeaderConfigAction({isFixed:true,isHome:true,topAlpha:true}) as any)
    }, [dispatch])
    useLogLife({name:'home'})

    console.log(discountInfo);
    
  return (
    <HomeWrapper>
      <HomeBanner />
      <div className="content">
      { isEmptyObj(discountInfo) && <HomeSectionV2 infoData={discountInfo}/>}
      { isEmptyObj(recommendInfo) && <HomeSectionV2 infoData={recommendInfo}/>}
      { isEmptyObj(longforInfo) && <HomeLongfor infoData={longforInfo}/> }
      { isEmptyObj(goodPriceInfo) && <HomeSectionV1 infoData={goodPriceInfo}/> }
      { isEmptyObj(highScoreInfo) && <HomeSectionV1 infoData={highScoreInfo}/> }
      { isEmptyObj(plusInfo) && <HomeSectionV3 infoData={plusInfo}/> }
      </div>
    </HomeWrapper>
  );
});

export default Home;
