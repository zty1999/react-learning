import React from "react";

export const ThemeContext = React.createContext("light");
export const SizeContext = React.createContext("middle");
export const UserContext = React.createContext({ username: "", type: "" });