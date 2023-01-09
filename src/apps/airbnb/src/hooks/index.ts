import { useEffect } from "react";

// 打印生命周期
export const useLogLife = (info:any) => {
    
	useEffect(() => {
        const {name} = info;
        console.log(name + "组件被创建");
        return () => {
            console.log(name +"组件被销毁");
        }
	}, [info]);
};






