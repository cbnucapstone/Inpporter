// 전역으로 관리하는 state를 담는 곳

import {createStore} from "redux";

export default createStore((state,action)=>{
    var User = {
        login:false,
        id:"",
    }
    if(state===undefined){
        console.log("undefined");
        User.login=false;
        User.id="";
    }
    if(action.type==="login"){
        console.log("login");
        User.login=true;
        User.id="";
    }
    if(action.type==="logout"){
        console.log("logout");
        User.login=false;
        User.id="";
    }
    return User;
})