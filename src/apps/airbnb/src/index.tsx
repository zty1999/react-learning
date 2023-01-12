import React, { Suspense } from "react";
import ReactDOM from "react-dom/client";
import "normalize.css";
import 'antd/dist/reset.css';
import "./assets/css/index.less";
import App from "./App";
import { HashRouter } from "react-router-dom";
import store from "./redux";
import { SizeContext } from "./context";
import { Provider } from "react-redux";
import { ThemeProvider } from "styled-components";
import theme from '@airbnb/assets/theme'
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
        <ThemeProvider theme={theme}>
          <SizeContext.Provider value={"small"}>
            <Provider store={store as any}>
              <App />
            </Provider>
          </SizeContext.Provider>
        </ThemeProvider>
    </HashRouter>
  </Suspense>
  // </React.StrictMode>
);
