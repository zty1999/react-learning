import { Button, Space } from "antd-mobile";
import React, { Component, useEffect } from "react";
import AMapLoader from "@amap/amap-jsapi-loader";
import PropTypes from "prop-types";
import { Map } from "react-amap";
import "./index.scss";
const AMAP_KEY = "3208d381736af0804d8b356b7eba5721";
const AMAP_VERSION = "2.0";
interface MarkerCluster {
  weight: number;
  lnglat: string[];
  label: string;
}
// 添加属性校验
MapComponent.propTypes = {
  center: PropTypes.object, // 中心点
  controlBar: PropTypes.bool, // 实时路况图层
  trafficLayer: PropTypes.bool, // 方向盘
  markerClusters: PropTypes.arrayOf(PropTypes.object), // 点聚合
};
// 指定 props 的默认值：
MapComponent.defaultProps = {
  // markerClusters: [],
};

// 你可以指定一个自定义验证器。它在验证失败时应返回一个 Error 对象。
// 请不要使用 `console.warn` 或抛出异常，因为这在 `oneOfType` 中不会起作用。
const customProp = function (props, propName, componentName) {
  if (!/matchme/.test(props[propName])) {
    return new Error(
      "Invalid prop `" +
        propName +
        "` supplied to" +
        " `" +
        componentName +
        "`. Validation failed."
    );
  }
};

function MapComponent(props) {
  let {
    center,
    ToolBar,
    Scale,
    HawkEye,
    Geolocation,
    controlBar,
    trafficLayer,
    marker,
    markers,
    markerClusters,
  } = props;

  let map: any = {};
  const onComplete = () => {
    console.log("onComplete");
  };
  const onError = () => {
    console.log("onError");
  };
  // 2.dom渲染成功后进行map对象的创建
  useEffect(() => {
    AMapLoader.load({
      key: AMAP_KEY, // 申请好的Web端开发者Key，首次调用 load 时必填
      version: AMAP_VERSION, // 指定要加载的 JSAPI 的版本，缺省时默认为 1.4.15
      plugins: [
        "AMap.ToolBar", // 工具条控件，工具条控件集成了缩放、平移、定位等功能按钮在内的组合控件
        "AMap.Driving",
        "AMap.CitySearch",
        "AMap.Geolocation",
        "AMap.ControlBar",
        "AMap.Scale", // 比例尺控件，展示地图在当前层级和纬度下的比例尺
        "AMap.HawkEye", // 鹰眼控件，在地图右下角显示地图的缩略图
        "AMap.Geolocation", // 定位控件，用来获取和展示用户主机所在的经纬度位置
        "AMap.Marker", // 覆盖物(标记点)
        "AMap.MarkerCluster", // 点聚合
      ], // 需要使用的的插件列表，如比例尺'AMap.Scale'等
    })
      .then((AMap) => {
        map = new AMap.Map("container", {
          //设置地图容器id
          viewMode: "3D", // 默认使用 2D 模式，如果希望使用带有俯仰角的 3D 模式，请设置 viewMode: '3D'
          zoom: 13, //初始化地图级别  缩放 值越大地图放大比例越大
          rotateEnable: true,
          pitchEnable: true,
          pitch: 44,
          rotation: -15,
          zooms: [2, 20],
          center: center || null, //初始化地图中心点位置
        });

        // 实时路况图层
        if (trafficLayer) {
          addTrafficLayer(AMap, map);
        }

        if (ToolBar) {
          addToolBar(AMap, map);
        }

        if (Scale) {
          addScale(AMap, map);
        }
        if (HawkEye) {
          addHawkEye(AMap, map);
        }
        if (Geolocation) {
          addGeolocation(AMap, map);
        }
        // 方向盘
        if (controlBar) {
          addControlBar(AMap, map);
        }

        // 覆盖物 标记点
        if (marker) {
          // 构造点标记
          const marker = new AMap.Marker({
            icon: "https://webapi.amap.com/theme/v1.3/markers/n/mark_b.png",
            position: [114.086379, 22.538634],
          });
          map.add(marker);
        }
        // 多个标记
        if (markers) {
          markers.map((item) => new AMap.Marker(item));
          map.add(markers);
        }
        if (markerClusters) {
          // MarkerCluster(map,markers,paramater)
          // markers:[{{ weight?: 权重值(以权重高的点为中心进行聚合), lnglat: ["经度", "纬度"] }}]
          const markerCluster = new AMap.MarkerCluster(map, markerClusters, {
            // 聚合网格像素大小
            gridSize: 80,
            maxZoom: 14,
            renderMarker(ctx) {
              console.log(ctx);
              let { marker, data } = ctx;
              if (Array.isArray(data) && data[0]) {
                var { weight, lnglat, label } = data[0];
                // var content = `<img style="transform: scale(1) rotate(${
                //   360 - Number(orientation)
                // }deg);" src='${car}' />`;
                // marker.setContent(content);
                marker.setLabel({
                  direction: "bottom",
                  //设置文本标注偏移量
                  // offset: new AMap.Pixel(-4, 0),
                  //设置文本标注内容
                  content: `<div className="markerText"> ${label}</div>`,
                });
                marker.setOffset(new AMap.Pixel(-18, -10));
                marker.on("click", ({ lnglat }) => {
                  map.setZoom(13); //设置地图层级
                  map.setCenter(lnglat);
                });
              }
            },
          });
          map.add(markerCluster);
        }

        //为地图注册click事件获取鼠标点击出的经纬度坐标
        map.on("click", function (e) {
          let lnglat = e.lnglat.getLng() + "," + e.lnglat.getLat();
          console.log(lnglat);
        });
      })
      .catch((e) => {
        console.log(e);
      });
    return () => {
      map = null;
    };
  });
  const addToolBar = (AMap, map) => {
    console.log("addToolBar");
    let toolBar = new AMap.ToolBar({
      position: {
        top: "110px",
        right: "10px",
      },
    });
    console.log(toolBar);
    toolBar.addTo(map);
  };
  const addScale = (AMap, map) => {
    console.log("addScale");
    let scale = new AMap.Scale();
    console.log(scale);
    scale.addTo(map);
  };
  const addHawkEye = (AMap, map) => {
    console.log("addHawkEye");
    let hawkEye = new AMap.HawkEye({ isOpen: true });
    console.log(hawkEye);
    hawkEye.addTo(map);
  };
  const addGeolocation = (AMap, map) => {
    console.log("addGeolocation");
    let geolocation = new AMap.Geolocation();
    console.log(geolocation);
    geolocation.addTo(map);
  };
  const addTrafficLayer = (AMap, map) => {
    console.log("addTrafficLayer");
    let trafficLayer = new AMap.TileLayer.Traffic({
      zIndex: 200,
    });
    map.add(trafficLayer); //添加图层到地图
  };
  const addControlBar = (AMap, map) => {
    console.log("addControlBar");
    const ControlBar = new AMap.ControlBar({
      position: {
        right: "10px",
        top: "10px",
      },
    });
    ControlBar.addTo(map); //添加方向盘到地图
  };

  const CitySearch = (AMap) => {
    const citySearch = new AMap.CitySearch();
    // controlBar.addTo(map); //添加方向盘到地图
    citySearch.getLocalCity(function (status, result) {
      if (status === "complete" && result.info === "OK") {
        // 查询成功，result即为当前所在城市信息
        console.log("plugin", result);
      }
    });
  };
  const geolocation = () => {
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
  };

  // 1.初始化创建地图容器,div标签作为地图容器，同时为该div指定id属性；
  return (
    <div className="home_div">
      <div className="map-title"></div>
      <div id="container" className="map"></div>
    </div>
  );
}

//导出地图组件
export default MapComponent;
