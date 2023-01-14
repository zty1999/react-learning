import { memo, useCallback, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { useSelector, useDispatch, shallowEqual } from "react-redux";

import PictureBrowser from "@airbnb/base-ui/picture-browser";
import { DetailPicturesWrapper } from "./style";
import Button from '@mui/material/Button';
const DetailPictures = memo((props:any) => {
  const { detailInfo } = useSelector((state: any) => {
    return {
      detailInfo: state.detail.detailInfo,
    };
  }, shallowEqual);
  // const { pictureUrls} = props;
  const [showBrowser, setShowBrowser] = useState(false);

  return (
    <DetailPicturesWrapper>
      <div className="pictures">
        <div className="left">
          <div className="item" onClick={() => setShowBrowser(true)}>
            <img src={detailInfo?.picture_urls?.[0]} alt="" />
            <div className="cover"></div>
          </div>
        </div>
        <div className="right">
          {detailInfo?.picture_urls?.slice(1, 5).map((item) => {
            return (
              <div className="item" key={item} onClick={() => setShowBrowser(true)}>
                <img src={item} alt="" />
                <div className="cover"></div>
              </div>
            );
          })}
        </div>
      </div>
      <Button variant="contained" className="show-pictures-btn" onClick={(e) => setShowBrowser(true)}>
        浏览图片  
      </Button>
      {showBrowser && <PictureBrowser pictureUrls={detailInfo.picture_urls} closeClick={() => setShowBrowser(false)} />}
    </DetailPicturesWrapper>
  );
});

export default DetailPictures;
