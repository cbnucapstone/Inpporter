import '../styles/Sign.css';
import { Link } from 'react-router-dom';

function SignUp(){
    return(
        <div className="SignUp"  style={{ backgroundImage: "url(./background-img.jpg)"}}>
            <form class="SignForm">
                <h2 class="SignUpHeader">Inpporter Sign Up</h2>
                    <div class="SignContent">
                        <label>NAME</label><input type="text" placeholder="이름" name='name'/>                  
                    </div>
                    <div class="SignContent">
                        <label>ID</label><input type="text" placeholder="아이디" name='id'/>                  
                    </div>
                    <div class="SignContent">
                        <label>PW</label><input type="password" placeholder="비밀번호" name='pw'/>                  
                    </div>
                    <div class="SignContent">
                        <label>PW Check</label><input type="password" placeholder="비밀번호 확인" name='pwcheck'/>                  
                    </div>
                    <div class="SignContent">
                        <label>NickName</label><input type="text" placeholder="사용할 별명 입력" name='nickname'/>                  
                    </div>
                    <div class="SignContent">
                        <label>E-Mail</label><input type="email" placeholder="사용자 이메일" name='email'/>                  
                    </div>
                    <div class="SignContent">
                        <label>Phone Number</label><input type="text" placeholder="01012345678" name='phonenum'/>                  
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
        </div>
    );
}
export default SignUp;
