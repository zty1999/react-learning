import { memo, useCallback, useContext, useMemo } from "react";
import { useEffect } from "react";
import { ThemeContext } from "../../context";
import { useLogLife } from "../../hooks";
import { useScrollPosition } from "../../hooks/useScrollPosition";

export const Home = memo(
  () => {
    // useEffect(回调函数,state 值发生变化时重新执行) 在执行完当前组件渲染后要执行的副作用代码
    // 回调函数监听事件 在组件渲染完成后自动执行 state可以传入空数组，不被其它值影响
    // 回调函数返回值:返回一个回调函数取消监听 清除副作用 => 组件被重新渲染或组件卸载时执行
    // 优点：集中处理单一逻辑代码  增加代码内聚性
    useEffect(() => {
      return () => {};
    }, []);
  
    useLogLife()
    const position = useScrollPosition()
    console.log(position);
    
    const theme = useContext(ThemeContext)


    // const memoizedCallback = useCallback(
    //   () => {
    //     // doSomething(a, b);
    //   },[]);
    // const result = useMemo(
    //   () => {
    //     return 50
    //   },[]);
    return (
      <>
        <header>首页{theme}</header>
      </>
    );
  }
);
