import React from "react";

import { Space } from "antd-mobile";

import { useNavigate } from "react-router-dom";

import PropTypes from "prop-types";

// 导入样式
import styles from "./index.module.scss";

function SearchHeader({ cityName, className }) {
  let navigate = useNavigate();
  return (
    <div
      className={[styles.searchBox, styles[className] || ""].join(" ")}
      align="center"
    >
      {/* 左侧白色区域 */}
      <div className={styles.search}>
        {/* 位置 */}
        <div className={styles.location} onClick={() => navigate("/citylist")}>
          <span className="name">{cityName}</span>
          <i className="iconfont icon-arrow" />
        </div>

        {/* 搜索表单 */}
        <div className={styles.form} onClick={() => navigate("/search")}>
          <i className="iconfont icon-seach" />
          <span className="text">请输入小区或地址</span>
        </div>
      </div>
      {/* 右侧地图图标 */}
      <i className="iconfont icon-map" onClick={() => navigate("/map")} />
    </div>
  );
}

// 添加属性校验
SearchHeader.propTypes = {
  cityName: PropTypes.string.isRequired,
  className: PropTypes.string,
};

export default SearchHeader;
