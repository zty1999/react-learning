import React from "react";
import logo from "./logo.svg";
import "./App.css";
import { useRoutes } from "react-router-dom";
import { routes } from "./routes";
import { SizeContext, ThemeContext } from "./context";



function App() {
  return (
    <div className="App">
      <ThemeContext.Provider value={"dark"}>
        <SizeContext.Provider value={"small"}>
        {useRoutes(routes)}
        </SizeContext.Provider>
      </ThemeContext.Provider>
      
    </div>
  );
}

export default App;
