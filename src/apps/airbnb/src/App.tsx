import React, { useEffect } from "react";
import "./App.css";
import { useLocation, useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useLogLife } from "./hooks";

import AppHeader from "@airbnb/components/app-header";  
import AppFooter from "@airbnb/components/app-footer";  
import { useScrollTop } from "./hooks/useScrollTop";


function App() {
  useLogLife({name:'app'})
  useScrollTop()
  

  return (
    <div className="App">
      <AppHeader/>
        {useRoutes(routes)}
      <AppFooter/>
    </div>
  );
}

export default App;
