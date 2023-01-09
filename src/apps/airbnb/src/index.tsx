import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "./assets/css/index.less";
import App from "./App"; 
import { HashRouter } from "react-router-dom";
import { SizeContext, ThemeContext } from "./context";
import { Provider } from "react-redux";
import store from "./redux";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
function test() {
  console.log("enabled airbnb");
}
test();
root.render(
  // 使用严格模式 组件渲染会执行两次
  // <React.StrictMode>
  <Suspense fallback={"loading"}>
    <HashRouter>
    <ThemeContext.Provider value={"dark"}>
      <SizeContext.Provider value={"small"}>
        <Provider store={store}>
          <App />
        </Provider>
      </SizeContext.Provider>
    </ThemeContext.Provider>
  </HashRouter>
  </Suspense>
  // </React.StrictMode>
);
