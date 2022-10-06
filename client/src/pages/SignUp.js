import '../styles/Sign.css';

import { useNavigate } from 'react-router-dom';
import React, {useState} from "react";
import axios from "axios";

function SignUpPage(){

    // const sexlist = ["여자","남자"];
    // const rolelist = ["컴퓨터","뭐뭐","몰라"]
    let from = useNavigate();

    const [ID,setID] = useState('');
    const [Password,setPassword] = useState('');
    const [ConfirmPassword,setConfirmPassword] = useState('');
    const [Name,setName] = useState('');
    const [Nickname,setNickname] = useState('');
    // const [Sex,setSex] = useState('');
    const [Email,setEmail] = useState('');
    const [Phone,setPhone] = useState('');
    // const [Role,setRole] = useState('');

    const onIDHandler = (event) =>{ setID(event.currentTarget.value);};
    const onPasswordHandler = (event) =>{ setPassword(event.currentTarget.value);};
    const onConfirmPassword = (event) =>{ setConfirmPassword(event.currentTarget.value);};
    const onNameHandler = (event) =>{ setName(event.currentTarget.value);};
    const onNicknameHandler = (event) =>{ setNickname(event.currentTarget.value);};
    // const onSexHandler = (event) =>{ setSex(event.target.value);};
    const onEmailHandler = (event) =>{ setEmail(event.currentTarget.value);};
    const onPhoneHandler = (event) =>{ setPhone(event.currentTarget.value);};
    // const onRoleHandler = (event) =>{ setRole(event.target.value);};

    const onSubmitHandler=(event)=>{
        event.preventDefault();
        if (Password!==ConfirmPassword){
            alert('비밀번호가 일치하지 않습니다.');
        }
        let body={
            id :ID,
            password:Password,
            name:Name,
            nickname:Nickname,
            // sex:Sex,
            email:Email,
            phone:Phone,
            login:false,
            // role:Role,
        };

        axios
        .post("http://localhost:5001/auth/register",body)
        .then((res) =>{
            if (res.data.success === false){
                alert("회원가입에 실패하였습니다.");
            }
            if (res.data.success === true){
                alert("회원가입에 성공하였습니다.");
                from('/signin');
            }
        })
        .catch(err=>{
            console.log(err);
        })
    };

    return(
        <div
      className="background"
      style={{
        backgroundImage: "url(./bgimg5.png)",
        backgroundSize: "contain",
        width: "100%",
        height: "auto",
        backgroundRepeat: "repeat-y",
      }}
    >
        <form class="SignForm" onSubmit={onSubmitHandler}>
        <h2 class="SignUpHeader">Inpporter Sign Up</h2>
            <div class="SignContent">
                <label>ID</label><input type="text" value={ID} onChange={onIDHandler} placeholder="ID"/>                  
            </div>
            <div class="SignContent">
                <label>비밀번호</label><input type="password" value={Password} onChange={onPasswordHandler} placeholder="비밀번호"/>                  
            </div>
            <div class="SignContent">
                <label>비밀번호 확인</label><input type="password" value={ConfirmPassword} onChange={onConfirmPassword} placeholder="비밀번호 확인" />                  
            </div>
            <div class="SignContent">
                <label>이름</label><input type="text" value={Name} onChange={onNameHandler} placeholder="이름"/>                  
            </div>
            <div class="SignContent">
                <label>닉네임</label><input type="text" value={Nickname} onChange={onNicknameHandler} placeholder="닉네임"/>                  
            </div>
            {/* <div class="SignContent">
            <label>사용자 성별</label>
                <select class="gender" value={Sex} onchange={onSexHandler} >
                    {sexlist.map((item)=>(
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>                 
            </div> */}
            <div class="SignContent">
                <label>이메일</label><input type="email" value={Email} onChange={onEmailHandler} placeholder="이메일"/>                  
            </div>
            <div class="SignContent">
                <label>전화번호</label><input type="text" value={Phone} onChange={onPhoneHandler} placeholder="전화번호"/>                  
            </div>
            {/* <div class="SignContent">
            <label>분야</label>
                <select class="role" value={Role} onchange={onRoleHandler} >
                    {rolelist.map((item)=>(
                        <option value={item} key={item}>
                            {item}
                        </option>
                    ))}
                </select>                 
            </div> */}
            <div class="Btns">
                <button type="submit" id="SignUpSubmit" class="Btn">회원가입</button>
            </div>       
    </form>
    </div>

    );
};
export default SignUpPage;
