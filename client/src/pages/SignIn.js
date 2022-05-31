import '../styles/Sign.css';

import React, {useState} from "react";
import axios from "axios";

const SignInPage = ({history}) => {

    //const {from} = history.state||{from:'/'}

    const [ID,setID] = useState('');
    const [Password,setPassword] = useState('');

    const onIDHandler = (event) =>{ setID(event.currentTarget.value);};
    const onPasswordHandler = (event) =>{ setPassword(event.currentTarget.value);};

    const onSubmitHandler = (event) =>{
        event.preventDefault();
        let body = {
            id:ID,
            pw:Password,
        };
        axios
        .post("http://localhost:5001/auth/login",body)
        .then((res) =>{
            if (res.data.success === false){
                if (res.data.msg==="id not find"){
                    alert("해당하는 ID가 존재하지 않습니다.");
                }
                if (res.data.msg==="pw not correct"){
                    alert("비밀번호가 일치하지 않습니다.");
                }
            }
            if (res.data.success === true){
                alert("로그인에 성공하였습니다.");
                console.log(res.data);
            }
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return(
        <form class="SignForm" onSubmit={onSubmitHandler}>
            <h2 class="SignInHeader">Inpporter Sign In</h2>
                <div class="SignContent">
                    <label>ID</label><input type="string" placeholder="아이디" value={ID} onChange={onIDHandler}/>                  
                </div>
                <div class="SignContent">
                    <label>비밀번호</label><input type="password" placeholder="비밀번호" value={Password} onChange={onPasswordHandler}/>                  
                </div>
                <div class="Btns">
                    <button type="submit" id="SignInBtn" class="Btn">로그인</button>
                </div> 
                <div class="Btns">
                    <button type="button" id="SingUpBtn" class="Btn" onClick={ () => {history.push("/signup")}}>회원가입</button> 
                </div>         
        </form>
    );
}
export default SignInPage;
