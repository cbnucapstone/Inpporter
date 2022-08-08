// reducers/index.js

/** root reducer */
import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import User from "./user";

// 여러 reducer를 사용하는 경우 reducer를 하나로 묶어주는 메소드입니다.
// store에 저장되는 리듀서는 오직 1개입니다.

const persistConfig = {
  key:"root",
  storage,
};

const rootReducer = combineReducers({
  User
});

export default persistReducer(persistConfig,rootReducer);