import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import { userReducer } from './modules/user/reducer';
import { globalReducer } from './modules/global/reducer';

// 合并reducer
const reducer = combineReducers({
  user: userReducer,
  global: globalReducer
})
// 开启 redux-devtools
const composeEnhacers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({ trace: true }) || compose;
// applyMiddleware 应用中间件函数    
// 正常情况下 store.dispatch(object)  redux-thunk  使 dispatch 可以派发函数
export const store = createStore(reducer, composeEnhacers(applyMiddleware(thunk)))



/* 使用 */
// // subscribe()返回 unsubscribe 取消订阅函数，调用该函数 取消订阅
// const unsubscribe = store.subscribe(() => {
//   console.log("订阅数据的变化：", store.getState());
// })
// // 派发action方法
// store.dispatch(nameAction)
// unsubscribe()

