import React, { lazy } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { BrowserRouter as Router, createBrowserRouter, Routes, Route, RouterProvider } from 'react-router-dom';

// redux
import { Provider } from "react-redux"
import {store} from 'src/redux';

import './index.css';
// 导入字体图标库的样式文件
import './assets/fonts/iconfont.css'

// 自定义主题
// import { ConfigProvider } from 'antd';



// window["_AMapSecurityConfig"] = {
//   securityJsCode: "683e8bd32b41ba9f78be4bc8e93fce24",
// };

function test(){
  console.log('enabled root');
}
test()
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
        {/* <ConfigProvider
      theme={{
        token: {
          colorPrimary: '#00b96b',
        },
      }}
    > */}
    <Provider store={store}>
    <App />

    </Provider>
  {/* </ConfigProvider> */}
    
    {/* <RouterProvider router={router} fallbackElement={<div>Loading...</div>}></RouterProvider> */}
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

















// const Home = lazy(() => import('src/pages/Home'));
// const Index = lazy(() => import("src/pages/Index"));
// const Map = lazy(() => import("src/pages/Map"));
// const News = lazy(() => import("src/pages/News"));
// const Profile = lazy(() => import("src/pages/Profile"));

// const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     // loader: rootLoader,
//     children: [
//       {
//         // when the URL matches this segment
//         path: "main",
//         // it renders this element
//         element: <Home />,
//         loader: async () => {
//           return '';
//         },
//         // // performing this mutation when data is submitted to it
//         // action: async ({ request }) => {
//         //   return updateFakeTeam(await request.formData());
//         // },

//         //        // and renders this element in case something went wrong
//         // errorElement: <ErrorBoundary />,
//         children: [
//           {
//             path: "index",
//             element: <Index />,
//           },
//           {
//             path: "map",
//             element: <Map />,
//           },
//           {
//             path: "news",
//             element: <News />,
//           },
//           {
//             path: "profile",
//             element: <Profile />,
//           },
//         ],
//       },
//     ],
//   },
// ]);