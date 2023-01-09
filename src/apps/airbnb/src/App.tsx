import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { shallowEqual, useSelector } from "react-redux";
import { useLogLife } from "./hooks";



function App() {
  useLogLife({name:'app'})
  const { menus } = useSelector((state:any)=>{
    return {
      menus: state.menu.menus
    }
  },shallowEqual)

  return (
    <div className="App">
      {menus}
        {useRoutes(routes)}
    </div>
  );
}

export default App;
