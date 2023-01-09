
import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./modules/auth";
import menuReducer from "./modules/menu";

const store = configureStore({
    reducer: {
        auth:authReducer,
        menu:menuReducer
    }
})

// 对每次派发的 action 进行拦截，进行日志打印
function log(store){
    const next = store.dispatch;
    function logAndDispatch(action){
        console.log('当前派发的action:',action);
        // 真正派发的代码：使用之前的 dispatch 进行派发
        next(action)
    }
    // monkey patch: 猴补丁 => 篡改现有的代码，对整体的执行逻辑进行修改
    store.dispatch = logAndDispatch;
}

log(store)

export default store;