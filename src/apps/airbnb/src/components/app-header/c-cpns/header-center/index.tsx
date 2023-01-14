import React, { memo, useRef, useState } from "react";
import { shallowEqual, useDispatch, useSelector } from "react-redux";
import { CSSTransition, TransitionGroup} from "react-transition-group"

import SearchTabs from "./c-cpns/search-tabs";
import SearchSection from "./c-cpns/search-section";
import SearchTitles from "@airbnb/assets/data/search_titles.json";
import IconSearchBar from "@airbnb/assets/svg/icon-search-bar";
import { CenterWrapper } from "./style";



const HeaderCenter = memo((props: any) => {
  const { searchBarClick } = props;
  const nodeRef = useRef(null);
  const [tabIndex, setTabIndex] = useState(0);

  const titles = SearchTitles.map((item) => item.title);

  /** 从redux中获取数据 */
  const { isSearch } = useSelector(
    (state: any) => ({
      isSearch: state.main.isSearch,
    }),
    shallowEqual
  );


  const searchBarClickHandle = () => {
    if(searchBarClick)searchBarClick()
  }
  return (
    <CenterWrapper>
      <CSSTransition nodeRef={nodeRef} in={!isSearch} className="bar" timeout={250} unmountOnExit={true}>
        <div className="search-bar" onClick={searchBarClickHandle}>
          <div className="text">搜索房源和体验</div>
          <div className="icon">
            <IconSearchBar />
          </div>
        </div>
      </CSSTransition>
      <CSSTransition in={isSearch} className="detail" timeout={250} unmountOnExit={true}>
        <div className="search-detail">
          <SearchTabs titles={titles} tabClick={() => setTabIndex} />
          <div className="infos">
            <SearchSection searchInfos={SearchTitles[tabIndex].searchInfos} />
          </div>
        </div>
      </CSSTransition>
    </CenterWrapper>
  );
});

export default HeaderCenter;
