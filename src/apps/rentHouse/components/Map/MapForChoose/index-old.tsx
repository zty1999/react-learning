import { Button, Space } from "antd-mobile";
import React, { Component } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
// // import { Map } from "react-amap";
import "./index.scss";
// const AMAP_KEY = "";
// const VERSION = "";
// const AMap = window["AMap"];
// // let mapObj = new AMap.Map("container");
// // console.log("new AMap", new AMap.CitySearch());

// // let geolocation;
// // mapObj.plugin(["AMap.CitySearch"], function () {
// //   //实例化公交线路查询类
// // });
// // mapObj.plugin("AMap.Geolocation", function () {
// //   geolocation = new AMap.Geolocation({
// //     enableHighAccuracy: true, //是否使用高精度定位，默认:true
// //     timeout: 10000, //超过10秒后停止定位，默认：无穷大
// //     maximumAge: 0, //定位结果缓存0毫秒，默认：0
// //     convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
// //     showButton: true, //显示定位按钮，默认：true
// //     buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
// //     buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
// //     showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
// //     showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
// //     panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
// //     zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
// //   });
// //   mapObj.addControl(geolocation);
// //   geolocation.getCurrentPosition();
// //   AMap.event.addListener(geolocation, "complete", onComplete); //返回定位信息
// //   AMap.event.addListener(geolocation, "error", onError); //返回定位出错信息
// // });
// function getMap() {
//   const map = new AMap.Map("container", {
//     zoom: 12,
//     center: [116.39, 39.9],
//   });
//   const citySearch = new AMap.CitySearch();
//   // map.plugin(citySearch);
//   console.log("citySearch", citySearch);
//   // 插件 CitySearch getLocalCity 方法 获取当前城市信息
//   citySearch.getLocalCity(function (status, result) {
//     if (status === "complete" && result.info === "OK") {
//       // 查询成功，result即为当前所在城市信息
//       console.log(result);
//     }
//   });
//   return null;
// }
// function onComplete() {
//   console.log("onComplete");
// }
// function onError() {
//   console.log("onError");
// }
// function MapForChoose() {
//   return (
//     <div className="map-choose">
//       <div id="container" className="container">
//         {/* <Map amapkey={AMAP_KEY} version={VERSION} /> */}
//       </div>
//       {getMap()}
//     </div>
//   );
// }

// export default MapForChoose;

class MapComponent extends React.Component {
  map: any;
  constructor(props) {
    super(props);
    this.map = {};
  }
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    AMapLoader.load({
      key: "203a243191cdcc800d2aa9fd48eca003", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.ToolBar",
        "AMap.Driving",
        "AMap.CitySearch",
        "AMap.Geolocation",
      ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        this.map = new AMap.Map(
          "container"
          // , {
          //   //设置地图容器id
          //   viewMode: "3D", //是否为3D地图模式
          //   zoom: 5, //初始化地图级别
          //   center: [105.602725, 37.076636], //初始化地图中心点位置
          // }
        );
        console.log(AMap);

        // const citySearch = new AMap.CitySearch();
        // console.log(citySearch);

        // citySearch.getLocalCity(function (status, result) {
        //   if (status === "complete" && result.info === "OK") {
        //     // 查询成功，result即为当前所在城市信息
        //     console.log(result);
        //   }
        // });

        // AMap.plugin("AMap.CitySearch", function () {
        //   console.log("AMap.CitySearch");

        //   let cityInfo = new AMap.CitySearch();
        //   console.log(cityInfo);
        //   console.log(cityInfo.prototype.getLocalCity());
        //   cityInfo.getLocalCity(function (status, result) {
        //     if (status === "complete" && result.info === "OK") {
        //       // 查询成功，result即为当前所在城市信息
        //       console.log("plugin", result);
        //     }
        //   });
        // });

        AMap.plugin("AMap.Geolocation", function () {
          console.log("AMap.Geolocation");
          let geolocation = new AMap.Geolocation();
          let position = geolocation.getCurrentPosition();
          console.log(position);
        });
      })
      .catch((e) => {
        console.log(e);
      });
  }
  render() {
    // 1.初始化创建地图容器,div标签作为地图容器，同时为该div指定id属性；
    return (
      <div className="home_div">
        <div className="map-title">
          <h3>JSAPI React地图组件示例</h3>
        </div>
        <div id="container" className="map" style={{ height: "800px" }}></div>
      </div>
    );
  }
}
//导出地图组建类
export default MapComponent;
