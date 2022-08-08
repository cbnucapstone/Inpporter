// // 전역으로 관리하는 state를 담는 곳

// import {createStore} from "redux";

// export default createStore((state,action)=>{
//     var User = {
//         login:false,
//         id:"",
//     }
//     if(state===undefined){
//         console.log("undefined");
//         User.login=false;
//         User.id="";
//     }
//     if(action.type==="login"){
//         console.log("login");
//         User.login=true;
//         User.id=action.id;
//     }
//     if(action.type==="logout"){
//         console.log("logout");
//         User.login=false;
//         User.id="";
//     }
//     return User;
// })

import { createStore } from "redux";
import rootReducer from "./index";
import {persistStore} from "redux-persist";

export const store = createStore(rootReducer);
export const persistor = persistStore(store);

export default { store, persistor };