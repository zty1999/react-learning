import React, { Component, useEffect } from "react";
import PropTypes from "prop-types";
import "./index.scss";
import MapComponent from "../index";

// 添加属性校验
MapMarkPointComponent.propTypes = {};

function MapMarkPointComponent(props) {
  let {} = props;

  // dom渲染成功后进行map对象的创建
  useEffect(() => {});
  const markerClusters = [
    {
      weight: 8,
      lnglat: ["114.086279", "22.538624"],
      label: "xx区xx栋xx层xxx号",
    },
    {
      weight: 8,
      lnglat: ["114.086449", "22.538634"],
      label: "xx区xx栋xx层xxx号",
    },
    {
      weight: 8,
      lnglat: ["114.086349", "22.538614"],
      label: "xx区xx栋xx层xxx号",
    },
    {
      weight: 1,
      lnglat: ["114.062449", "22.548614"],
      label: "xx区xx栋xx层xxx号",
    },
    {
      weight: 1,
      lnglat: ["114.062349", "22.548614"],
      label: "xx区xx栋xx层xxx号",
    },
  ];
  return <MapComponent markerClusters={markerClusters} />;
}

//导出地图组件
export default MapMarkPointComponent;
