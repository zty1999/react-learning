import { useContext } from "react";
import { ThemeContext,SizeContext } from "../context";

// context 共享
export const useGlobalContext = () => {
	const theme = useContext(ThemeContext)
	const size = useContext(SizeContext)
    return [theme,size];   
};