import React from "react";
import { useNavigate } from "react-router-dom";

import { NavBar, List, Toast } from "antd-mobile";
import "./index.scss";

import area from "src/utils/area.js";
import { makePy } from "src/utils/zntofirstLetter.js";
import { getCurrentCity } from "src/utils/geoPosition.js";
import { useEffect, useState } from "react";

// react-virtualized
// Most of react-virtualized's styles are functional (eg position, size).
// Functional styles are applied directly to DOM elements.
// The Table component ships with a few presentational styles as well.
// They are optional, but if you want them you will need to also import the CSS file.
// This only needs to be done once; probably during your application's bootstrapping process.
import "react-virtualized/styles.css";
// But if you only use a few react-virtualized components,
// And you're concerned about increasing your application's bundle size,
// You can directly import only the components you need, like so:
// import AutoSizer from "react-virtualized/dist/commonjs/AutoSizer";
// import { List as VirList } from "react-virtualized/dist/commonjs/List";

function CityList(props) {
  console.log(props);
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  // 有房源的城市
  const HOUSE_CITY = ["北京市", "上海市", "广州市", "深圳市"];
  // // 创建ref对象
  // const VirListComponent = React.createRef();

  // // 当前城市
  // const [curCity, setCurCity] = useState("");
  // useEffect(() => {
  //   // 获取当前城市
  //   const getCurCity = async () => {
  //     const city = await getCurrentCity();
  //     setCurCity(city);
  //   };
  //   getCurCity();
  // }, [curCity]); // 这里无需动态更新，所以用 curCity 进行判断

  // 城市列表
  const [cityObj, setCityObj] = useState({});
  const [letterArr, setLetterArr] = useState<string[]>([]);
  useEffect(() => {
    const getCityList = async () => {
      let { cityObj, letterArr } = await formatCityData(area);
      setCityObj(cityObj);
      setLetterArr(letterArr);
    };
    getCityList();
  }, []); // 这里无需动态更新

  // 城市列表数组 转 首字母为键进行分类的数组对象
  // [{id,title,children},...] => {"a":{id,title,children},"b":...}
  // ["a","b","c"]
  const formatCityData = async (list) => {
    // 以首字母分类的城市数组对象
    const cityObj = {};

    area.slice(0, 4);
    list.map((item) => {
      // 获取城市名称首字母
      let strFirst = item.title.substr(0, 1);
      let letter = makePy(strFirst)[0];
      cityObj[letter] ? cityObj[letter].push(item) : (cityObj[letter] = [item]);
    });
    // 有序字母数组
    const letterArr = Object.keys(cityObj).sort();

    console.log(cityObj);
    console.log(letterArr);

    // 热门城市
    cityObj["hot"] = [...area.slice(0, 4)];
    letterArr.unshift("hot");

    // 当前城市
    const city = await getCurrentCity();
    cityObj["#"] = [{ id: "#", title: city, children: [] }];
    letterArr.unshift("#");

    return {
      cityObj,
      letterArr,
    };
  };

  // 格式化列表 label
  const formatLabel = (letter) => {
    switch (letter) {
      case "#":
        return "当前城市";
      case "hot":
        return "热门城市";
      default:
        return letter.toUpperCase();
    }
  };

  // 虚拟列表 渲染行
  function rowRenderer({
    key, // Unique key within array of rows
    index, // 索引号
    isScrolling, // 当前项是否正在滚动中
    isVisible, // 当前项在 List 中是否可见
    style, //  注意：重点属性，一定要给每一个行数据添加该样式！作用：指定每一行的位置
  }) {
    // 获取每一行的字母索引
    const letter = letterArr[index];
    return (
      <List header={formatLabel(letter)} key={key} style={style}>
        {cityObj[letter].map((item, index) => (
          <List.Item
            key={index}
            arrow={false}
            onClick={() => changeCity({ city: item.title, cityId: item.id })}
          >
            {item.title}
          </List.Item>
        ))}
      </List>
    );
  }
  // 动态计算每一行高度
  const getRowHeight = ({ index }) => {
    // 索引标题高度 + 城市数量 * 城市名称的高度
    // TITLE_HEIGHT + cityList[cityIndex[index]].length * NAME_HEIGHT
    return 36 + cityObj[letterArr[index]].length * 50.5;
  };
  // 用于获取List组件中渲染行的信息
  const onRowsRendered = ({ startIndex }) => {
    console.log("startIndex：", startIndex);
    if (scrollToIndex !== startIndex) {
      setScrollToIndex(startIndex);
    }
  };
  // 点击列表项切换城市 返回上一页
  const changeCity = ({ city, cityId }) => {
    console.log(city, cityId);

    if (HOUSE_CITY.indexOf(city) > -1) {
      // 有房源
      localStorage.setItem("curCity", JSON.stringify({ city, cityId }));
      navigate(-1);
    } else {
      Toast.show({
        content: "该城市暂无房源数据",
        duration: 1000,
        afterClose: () => {
          console.log("after");
        },
      });
    }
  };

  const [scrollToIndex, setScrollToIndex] = useState<number>(0);

  // 渲染右侧索引列表
  const renderCityIndex = () => {
    const formatIndex = (index) => {
      switch (index) {
        case "hot":
          return "热";
        default:
          return index;
      }
    };
    return letterArr.map((item, index) => (
      <li
        key={index}
        className="city-index-item"
        onClick={() => {
          console.log("当前索引号：", index);
          setScrollToIndex(index);
        }}
      >
        <span className={scrollToIndex === index ? "index-active" : ""}>
          {formatIndex(item)}
        </span>
      </li>
    ));
  };

  const renderList = () => {
    {
      /* <div className="list">
        <List header="当前定位">
          <List.Item>{curCity}</List.Item>
        </List>
        <List header="热门城市">
          {area.slice(0, 4).map((item, index) => (
            <List.Item key={index}>{item.title}</List.Item>
          ))}
        </List>
        {letterArr.map((letter) => (
          <List header={letter} key={letter}>
            {cityObj[letter].map((item, index) => (
              <List.Item key={index}>{item.title}</List.Item>
            ))}
          </List>
        ))}
      </div> */
    }
    return null;
    // <AutoSizer>
    //     {/* // 虚拟滚动 // AutoSizer组件装饰一个 React
    //     元素并自动管理width和height属性，以便装饰元素填充可用空间
    //     https://github.com/bvaughn/react-virtualized/blob/HEAD/docs/usingAutoSizer.md */}
    //     {({ width, height }) => (
    //       // 通过 render-props 模式，获取到 AutoSizer 组件暴露的 width 和 height 属性。
    //       // react-virtualized:List https://github.com/bvaughn/react-virtualized/blob/master/docs/List.md
    //       <VirList
    //         // ref={VirListComponent}
    //         rowHeight={getRowHeight}
    //         rowRenderer={rowRenderer}
    //         // className={styles.List}
    //         // overscanRowCount={overscanRowCount}
    //         width={width}
    //         height={height}
    //         rowCount={letterArr.length}
    //         // rowHeight={
    //         //   useDynamicRowHeight ? this._getRowHeight : listRowHeight
    //         // }
    //         // noRowsRenderer={this._noRowsRenderer}
    //         onRowsRendered={onRowsRendered}
    //         scrollToIndex={scrollToIndex}
    //         scrollToAlignment="start"
    //       />
    //     )}
    //   </AutoSizer>
  };
  return (
    <div className="citylist">
      <NavBar onBack={back}>城市选择</NavBar>
      {/* 城市列表 */}
      {renderList()}
      {/* 右侧索引列表 */}
      <ul className="city-index">{renderCityIndex()}</ul>
    </div>
  );
}

export default CityList;
