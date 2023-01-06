import React from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";

import { NavBar } from "antd-mobile";

// 导入样式
import "./index.scss";

function NavHeader({ title }) {
  let navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return <NavBar onBack={back}>{title}</NavBar>;
}

// 添加属性校验
NavHeader.propTypes = {
  title: PropTypes.string.isRequired,
};

export default NavHeader;
