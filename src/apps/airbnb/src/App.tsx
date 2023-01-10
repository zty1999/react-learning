import React from "react";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { useLogLife } from "./hooks";

import AppHeader from "@airbnb/components/app-header";  
import AppFooter from "@airbnb/components/app-footer";  


function App() {
  useLogLife({name:'app'})

  return (
    <div className="App">
      <AppHeader/>
        {useRoutes(routes)}
      <AppFooter/>
    </div>
  );
}

export default App;
