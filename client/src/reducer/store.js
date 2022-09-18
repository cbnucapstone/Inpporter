// 전역으로 관리하는 state를 담는 곳

import { createStore } from "redux";
import rootReducer from "./index";
import { persistStore } from "redux-persist";

export const store = createStore(rootReducer);
export const persistor = persistStore(store);

export default { store, persistor };
