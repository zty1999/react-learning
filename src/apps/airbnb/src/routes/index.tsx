import React from "react"
import { Navigate } from "react-router-dom";


const Home = React.lazy(() => import("@airbnb/pages/home"));
const Entire = React.lazy(() => import("@airbnb/pages/entire"));
const House = React.lazy(() => import("@airbnb/pages/house"));


// require.context(directory, useSubdirectories, regExp)
// require.context('./components/', true, /\.js$/)
const DEMOS = require['context']('../demo/',true,/\.tsx$/);
// console.log(DEMOS);
const demoRoutes: any[] = [];
// console.log(DEMOS.keys(),Object.keys(DEMOS));
DEMOS.keys().forEach((key) => {
  // key => ./indicator/index.tsx
  // DEMOS.resolve(key) => ./src/apps/airbnb/src/demo/indicator/index.tsx
  let pathname = key.match(/\/.*?\/index\.tsx$/)[0];// => /${demoname}/index.tsx
  pathname = pathname.replace(/\/index\.tsx$/,'')// => /${demoname}
  // pathname = pathname.replace(/\//,'')// => ${demoname}
  let elementPath = DEMOS.resolve(key).replace(/\.\//,'').replace(/src\//,'').replace(/\/index\.tsx$/,'')
  console.log('demo',pathname,elementPath); // => apps/airbnb/src/demo/${demoname} 

  // 相同路径 静态导入可以  动态导入报错 'src/apps/airbnb/src/demo/indicator'
  // 解决： 动态导入的路径 首尾使用静态字符 才能正确导入
  const Demo = React.lazy(() => import('src/' + elementPath + '/index'));
  demoRoutes.push({
    path: pathname,
    element: <Demo />
  })
});

export const routes = [
  {
    path: "/",
    element: <Navigate to="/home" />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/entire",
    element: <Entire />,
  },
  {
    path: "/house",
    element: <House />,
  },
  ...demoRoutes
];

console.log(routes);
