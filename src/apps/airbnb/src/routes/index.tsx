import React from "react"
import { Navigate } from "react-router-dom";


const Home = React.lazy(() => import("@airbnb/pages/home"));
const Entire = React.lazy(() => import("@airbnb/pages/entire"));
const House = React.lazy(() => import("@airbnb/pages/house"));


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
  
];

