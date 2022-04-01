import './Sign.css';
import { Link } from 'react-router-dom';

function SignUpPage(){
    return(
        <form class="SignForm">
            <h2 class="SignUpHeader">Inpporter Sign Up</h2>
                <div class="SignContent">
                    <label>이름</label><input type="text" id="inputname" placeholder="이름" name='name'/>                  
                </div>
                <div class="SignContent">
                    <label>이메일</label><input type="email" id="inputpw" placeholder="가입 이메일로 로그인" name='email'/>                  
                </div>
                <div class="SignContent">
                    <label>비밀번호</label><input type="password" id="inputpw" placeholder="비밀번호" name='pw'/>                  
                </div>
                <div class="SignContent">
                    <label>비밀번호 확인</label><input type="password" id="inputpw" placeholder="비밀번호 확인" name='pwcheck'/>                  
                </div>
                <div class="SignContent">
                <label>사용자 성별</label>
                    <select class="gender" >
                        <option value="1">여자</option>
                        <option value="2">남자</option>
                    </select>                 
                </div>
                <div class="Btns">
                    <button type="button" id="SignUpSubmit" class="Btn">회원가입</button>
                </div>       
        </form>
    )
}
export default SignUpPage;
