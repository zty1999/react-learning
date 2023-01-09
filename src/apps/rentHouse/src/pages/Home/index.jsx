import React, { Suspense, lazy, Profiler } from "react";
import {
  useNavigate,
  useLocation,
  Link,
  Routes,
  Route,
} from "react-router-dom";
// 导入组件
import { TabBar } from "antd-mobile";

// 导入样式文件
// import "./index.scss";

// const Index = lazy(() => import("../../pages/Index/index"));
// const List = lazy(() => import("../../pages/List/index"));
// const News = lazy(() => import("../../pages/News/index"));
// const Profile = lazy(() => import("../../pages/Profile"));

const tabs = [
  { title: "首页", icon: "", description: "", key: "/main" },
  { title: "找房", icon: "", description: "", key: "/main/map" },
  { title: "资讯", icon: "", description: "", key: "/main/news" },
  { title: "我的", icon: "", description: "", key: "/main/profile" },
];

function Home() {
  // state = {
  //   // 默认选中的TabBar菜单项
  //   // selectedTab: this.props.location.pathname,
  // };
  const pathname = useLocation().pathname;
  const navigate = useNavigate();

  // 渲染tabItem
  function renderTabBarItem() {
    return tabs.map((item) => (
      <TabBar.Item
        key={item.key}
        icon={item.icon}
        title={item.title}
      ></TabBar.Item>
    ));
  }
  // 底部栏切换
  function setRouteActive(value) {
    navigate(value);
  }
  return (
    <div className="home">
      {/* <Routes>
        <Route path="/" element={<Index />} />
        <Route path="/list" element={<List />} />
        <Route path="/news" element={<News />} />
        <Route path="/profile" element={<Profile />} />
      </Routes> */}
      <TabBar
        className="tabs"
        defaultActiveKey={"home"}
        safeArea={true}
        activeKey={pathname}
        onChange={(value) => setRouteActive(value)}
      >
        {renderTabBarItem()}
      </TabBar>
    </div>
  );
}
export default Home;
