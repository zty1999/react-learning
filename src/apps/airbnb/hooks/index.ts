import { useEffect } from "react";

// 打印生命周期
export const useLogLife = () => {
	useEffect(() => {
        console.log("组件被创建");
        return () => {
            console.log("组件被销毁");
        }
	}, []);
};






