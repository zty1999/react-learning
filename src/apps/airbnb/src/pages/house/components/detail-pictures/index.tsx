import { memo, useCallback, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch, shallowEqual } from "react-redux";

import {DetailPicturesWrapper} from "./style";

 const DetailPictures = memo(
  () => {

    const { detailInfo } = useSelector((state:any)=>{
      return {
        detailInfo: state.detail.detailInfo
      }
    },shallowEqual)


    return (
      <DetailPicturesWrapper>
       <div className="pictures">
        <div className="left">
          <div className="item">
            <img src={detailInfo?.picture_urls?.[0]} alt="" />
            <div className="cover"></div>
          </div>
        </div>
        <div className="right">
          {
            detailInfo?.picture_urls?.slice(1,5).map(item => {
              return (
                <div className="item" key={item}>
                  <img src={item} alt="" />
                  <div className="cover"></div>
                </div>
              )
            })
          }
        </div>
       </div>
      </DetailPicturesWrapper>
    );
  }
);

export default DetailPictures;