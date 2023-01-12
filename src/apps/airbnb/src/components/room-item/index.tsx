import PropTypes from "prop-types";
import React, { memo, useRef, useState } from "react";
import { Rating } from "@mui/material";
import { Carousel } from "antd";
import Indicator from "@airbnb/base-ui/indicator";
import { ItemWrapper, BottomExtra } from "./style";
import IconArrowLeft from "../../assets/svg/icon-arrow-left";
import IconArrowRight from "../../assets/svg/icon-arrow-right";
import classNames from "classnames";
import { Navigate } from "react-router-dom";

const RoomItem = memo((props: any) => {
  const { itemData, itemWidth = "25%",itemClick } = props;
  const [selectIndex, setSelectIndex] = useState(0);
  const sliderRef = useRef()
  const toggleClickHandle = (isNext = true, items) => {
    let newIndex;
    if(isNext) {
      (sliderRef.current as any).next();
      newIndex = selectIndex + 1
    }else {
      (sliderRef.current as any).prev();
      newIndex = selectIndex - 1;
    }
    if (newIndex < 0) newIndex = items.length - 1;
    if (newIndex > items.length - 1) newIndex = 0;
    setSelectIndex(newIndex);
    console.log(newIndex);
  };
  function itemClickHandle (){
    console.log(itemData);
    if(itemClick)itemClick(itemData);
  }
  const pictureEl = (
    <div className="cover">
      <img src={itemData.picture_url} alt="" />
    </div>
  );
  const sliderEl = (
    <div className="slider">
      <div className="control">
        <div
          className="btn left"
          onClick={(e) => toggleClickHandle(false, itemData?.picture_urls)}
        >
          <IconArrowLeft width="16" height="16" />
        </div>
        <div
          className="btn right"
          onClick={(e) => toggleClickHandle(true, itemData?.picture_urls)}
        >
          <IconArrowRight width="16" height="16" />
        </div>
      </div>
      <div className="indicator">
        <Indicator selectIndex={selectIndex}>
          {itemData?.picture_urls?.map((item, index) => {
            return (
              <div className="dot-item" key={item}>
                <span
                  className={classNames("dot", {
                    active: selectIndex === index,
                  })}
                ></span>
              </div>
            );
          })}
        </Indicator>
      </div>
      <Carousel dots={false} ref={sliderRef as any}>
        {itemData?.picture_urls?.map((item, index) => (
          <div className="cover" key={item}>
            <img src={item} alt="" />
          </div>
        ))}
      </Carousel>
    </div>
  );
  return (
    <ItemWrapper
      verifyColor={itemData?.verify_info?.text_color || "#39576a"}
      itemWidth={itemWidth}
      onClick={itemClickHandle}
    >
      <div className="inner">
        {!itemData.picture_urls?pictureEl:sliderEl}
        <div className="desc">{itemData.verify_info.messages.join(" · ")}</div>
        <div className="name">{itemData.name}</div>
        <div className="price">¥{itemData.price}/晚</div>

        <div className="bottom">
          <Rating
            name="readOnly"
            value={itemData.star_rating ?? 5}
            precision={0.1}
            readOnly
            sx={{ fontSize: "12px", color: "#00848A", marginRight: "-1px" }}
          />
          <span className="count">{itemData.reviews_count}</span>
          {itemData.bottom_info && (
            <BottomExtra
              className="extra"
              verifyColor={itemData?.bottom_info?.content_color || "#39576a"}
              fontSize={itemData?.bottom_info?.font_size || "10"}
              viewType={itemData?.bottom_info?.visibility || "LIST_VIEW"}
            >
              ·{itemData.bottom_info?.content}
            </BottomExtra>
          )}
        </div>
      </div>
    </ItemWrapper>
  );
});

// RoomItem.propTypes = {
//   itemData: PropTypes.object
// }

export default RoomItem;
