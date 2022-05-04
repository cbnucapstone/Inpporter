import '../styles/Sign.css';
import { Link } from 'react-router-dom';


const SignInPage = ( { history } ) => {
    return(
        <form class="SignForm">
            <h2 class="SignInHeader">Inpporter Sign In</h2>
                <div class="SignContent">
                    <label>이메일</label><input type="email" id="inputemail" placeholder="이메일 주소" name='email'/>                  
                </div>
                <div class="SignContent">
                    <label>비밀번호</label><input type="password" id="inputpw" placeholder="비밀번호" name='password'/>                  
                </div>
                <div class="Btns">
                    <button type="button" id="SignInBtn" class="Btn">로그인</button>
                </div> 
                <div class="Btns">
                    <button type="button" id="SingUpBtn" class="Btn" onClick={ () => {history.push("/signup")}}>회원가입</button> 
                </div>         
        </form>
    );
}
export default SignInPage;
