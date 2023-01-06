import { Button, Space } from "antd-mobile";
import React, { Component } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import { Map } from "react-amap";
import "./index.scss";
// const AMAP_KEY = "";
// const VERSION = "";
window["_AMapSecurityConfig"] = {
  securityJsCode: "683e8bd32b41ba9f78be4bc8e93fce24",
};
class MapComponent extends React.Component {
  map: any;
  constructor(props) {
    super(props);
    this.map = {};
  }
  onComplete = () => {
    console.log("onComplete");
  };
  onError = () => {
    console.log("onError");
  };
  // 2.dom渲染成功后进行map对象的创建
  componentDidMount() {
    AMapLoader.load({
      key: "3208d381736af0804d8b356b7eba5721", // 申请好的Web端开发者Key，首次调用 load 时必填
      version: "2.0", // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.ToolBar",
        "AMap.Driving",
        "AMap.CitySearch",
        "AMap.Geolocation",
        "AMap.ControlBar",
      ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        this.map = new AMap.Map("container", {
          //设置地图容器id
          viewMode: "3D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
          zoom: 13, //初始化地图级别  缩放 值越大地图放大比例越大
          rotateEnable: true,
          pitchEnable: true,
          pitch: 44,
          rotation: -15,
          zooms: [2, 20],
          // center: [116.397428, 39.90923], //初始化地图中心点位置
        });
        let trafficLayer = new AMap.TileLayer.Traffic({
          zIndex: 200,
        });
        this.map.add(trafficLayer); //添加图层到地图
        const controlBar = new AMap.ControlBar({
          position: {
            right: "10px",
            top: "10px",
          },
        });
        controlBar.addTo(this.map); //添加方向盘到地图

        const citySearch = new AMap.CitySearch();
        // controlBar.addTo(this.map); //添加方向盘到地图
        citySearch.getLocalCity(function (status, result) {
          console.log(status, result);
          if (status === "complete" && result.info === "OK") {
            // 查询成功，result即为当前所在城市信息
            console.log("plugin", result);
          }
        });
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

        // const geolocation = new AMap.Geolocation({
        //   enableHighAccuracy: true, //是否使用高精度定位，默认:true
        //   timeout: 10000, //超过10秒后停止定位，默认：无穷大
        //   maximumAge: 0, //定位结果缓存0毫秒，默认：0
        //   convert: true, //自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        //   showButton: true, //显示定位按钮，默认：true
        //   buttonPosition: "LB", //定位按钮停靠位置，默认：'LB'，左下角
        //   buttonOffset: new AMap.Pixel(10, 20), //定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        //   showMarker: true, //定位成功后在定位到的位置显示点标记，默认：true
        //   showCircle: true, //定位成功后用圆圈表示定位精度范围，默认：true
        //   panToLocation: true, //定位成功后将定位到的位置作为地图中心点，默认：true
        //   zoomToAccuracy: true, //定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
        // });
        // console.log(geolocation);
        // // this.map.addControl(geolocation);
        // geolocation.addTo(this.map);
        // let position = geolocation.getCurrentPosition();
        // console.log(position);

        // AMap.event.addListener(geolocation, "complete", this.onComplete); //返回定位信息
        // AMap.event.addListener(geolocation, "error", this.onError); //返回定位出错信息
      })
      .catch((e) => {
        console.log(e);
      });
  }
  componentWillUnmount() {
    this.map = null;
  }
  render() {
    // 1.初始化创建地图容器,div标签作为地图容器，同时为该div指定id属性；
    return (
      <div className="home_div">
        <div className="map-title">
          <h3>JSAPI React地图组件示例</h3>
        </div>
        <div id="container" className="map"></div>
      </div>
    );
  }
}
//导出地图组建类
export default MapComponent;
