import React, { Suspense, lazy, Profiler } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  Routes,
  Route,
} from "react-router-dom";

// 导入样式文件
import "./index.scss";
import NavHeader from "src/components/NavHeader";

function Home() {
  // state = {
  //   // 默认选中的TabBar菜单项
  //   // selectedTab: this.props.location.pathname,
  // };

  return (
    <div className="search">
      <NavHeader title="搜索"></NavHeader>
    </div>
  );
}
export default Home;
