import { useEffect, useState } from "react";

// localStorage 数据存储
export const useLocalStorage = (key) => {
	
    const [data,setData]=useState(()=>{
        return JSON.parse(window.localStorage.getItem(key) || '')
    })
    useEffect(() => {
        window.localStorage.setItem(key,JSON.stringify(data))
    }, [data])
    return [data,setData];
};