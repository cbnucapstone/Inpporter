import '../styles/Sign.css';
import { Link } from 'react-router-dom';


const SignIn = ( { history } ) => {
    return(
        <div className="SignUp"  style={{ backgroundImage: "url(./background-img.jpg)"}}>
            <form class="SignForm">
                <h2 class="SignInHeader">Inpporter Sign In</h2>
                    <div class="SignContent">
                        <label>ID</label><input type="text" placeholder="아이디" name='id'/>                  
                    </div>
                    <div class="SignContent">
                        <label>PW</label><input type="password" placeholder="비밀번호" name='password'/>                  
                    </div>
                    <div class="Btns">
                        <button type="button" id="SignInBtn" class="Btn">로그인</button>
                    </div> 
                    <div class="Btns">
                        <Link to ="/signup">
                        <button type="button" id="SingUpBtn" class="Btn" onClick={ () => {history.push("/signup")}}>회원가입</button> 
                        </Link>
                    </div>         
            </form>
        </div>
    );
}
export default SignIn;
