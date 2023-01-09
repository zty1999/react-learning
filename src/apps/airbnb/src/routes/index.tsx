import React from "react"
import { Navigate } from "react-router-dom";


const Home = React.lazy(() => import("src/apps/airbnb/src/pages/home"));
const House = React.lazy(() => import("../pages/house"));
// const Home = React.lazy(() => import("@airbnb/pages/home"));
// const House = React.lazy(() => import("@airbnb/pages/house"));
console.log((window as any)); 


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
    path: "/house",
    element: <House />,
  },
  
];

