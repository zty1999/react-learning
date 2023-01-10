import { memo, useCallback, useContext, useMemo, useState } from "react";
import { useEffect } from "react";
import { useSelector,useDispatch, shallowEqual } from "react-redux";
import { ThemeContext } from "../../context";
import { useLogLife } from "../../hooks";
import { useScrollPosition } from "../../hooks/useScrollPosition";
import { changeAuth } from "../../redux/modules/auth";
import { USERS } from "../../faker/userArray";
import hyRequest from "@airbnb/services";

 const House = memo(
  () => {
    // useEffect(回调函数,state 值发生变化时重新执行) 在执行完当前组件渲染后要执行的副作用代码
    // 回调函数监听事件 在组件渲染完成后自动执行 state可以传入空数组，不被其它值影响
    // 回调函数返回值:返回一个回调函数取消监听 清除副作用 => 组件被重新渲染或组件卸载时执行
    // 优点：集中处理单一逻辑代码  增加代码内聚性
    useEffect(() => {
      return () => {};
    }, []);

    const { auth } = useSelector((state:any)=>{
      return {
        auth: state.auth.auth
      }
    },shallowEqual)

    const dispatch = useDispatch()

    useLogLife({name:'house'})
    const position = useScrollPosition()
    console.log(position);
    
    const theme = useContext(ThemeContext)

    console.log(USERS);
    
    const [highscore,setHighScore] = useState({} as any)

    useEffect(()=>{
      hyRequest.get({url:"/home/highscore"}).then(res =>{
        console.log(res);
        setHighScore(res)
        console.log(highscore);
        
      })
    },[])
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
        <header>房屋详情{theme}{ auth.map(item =>( item.time))}</header>
        <button onClick={e => dispatch(changeAuth([{time:new Date() + ''}]))}>测试 useSelector</button>
        <h2>{highscore.title}</h2>
        <ul>
          {
            USERS.map((item,index) => <li key={index}>{index} <br /> {item.username}</li>)
          }
        </ul>
      </>
    );
  }
);

export default House;