import * as actionTypes from "../../constants";
const initialState = {
  name: 'test',
  counter: 100
}
// reducer(store中目前保存的state,传入的action)
export function globalReducer(state = initialState, action) {
  console.log(state, action);
  // 有数据更新返回新的 state 无 返回之前的state
  switch (action.type) {
    case actionTypes.CHANGE_NAME:
      return { ...state, name: action.name }

    default:
      return state;
  }
}

