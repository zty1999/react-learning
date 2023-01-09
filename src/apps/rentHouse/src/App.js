import "./App.css";
import React, { Suspense, lazy, Profiler } from "react";
import {
  // BrowserRouter as Router,
  HashRouter as Router,
  Routes,
  Route,
  redirect,
} from "react-router-dom";
// redux
// import { connect } from "react-redux";
// import { nameAction } from "./redux/modules/user/action";
const Home = lazy(() => import("./pages/Home"));
// const Search = lazy(() => import("./pages/Search"));
// const CityList = lazy(() => import("./pages/CityList"));
// const Map = lazy(() => import("./pages/Map"));

function App(props) {
  // const { name, changeName } = props;
  // changeName();
  return (
    <>
      {/* {name} */}
      <div>
        {/* 默认路由匹配时，跳转到 /home 实现路由重定向到首页 <Route path="/" exact render={() => <redirect to="/main" />} /> */}
        {/* <Router>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            
            <Route path="/" exact render={() => <redirect to="/main" />} />
            <Route path="/main/*" element={<Home />}></Route>
            
            <Route path="/search" element={<Search />}></Route>
            <Route path="/citylist" element={<CityList />}></Route>
            <Route path="/map" element={<Map />}></Route>
          </Routes>
        </Suspense>
      </Router> */}
      </div>
    </>
  );
}

const mapStateToProps = (state) => ({
  name: state.name,
});
const mapDispatchToProps = (dispatch) => ({
  // changeName: () => {
  //   dispatch(nameAction);
  // },
});
// connect(要映射到app组件中的数据,组件中可派发的action函数)
// export default connect(mapStateToProps, mapDispatchToProps)(App);
export default App;
