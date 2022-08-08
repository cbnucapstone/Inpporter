import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

import {store} from "../reducer/store";
import { useEffect } from 'react';
import {useSelector} from 'react-redux';

function Navbar() {

  const login = useSelector(state=>state.User.login);
  console.log(login);

  const clickLogout = () => {
    store.dispatch({type:"logout"});
    alert("로그아웃 되었습니다.");
  }
  
  const first = (
    <div className="navi-two">
    <Link to="signin" className="nav-right" id="signin">
      Sign In
    </Link>
    <Link to="signup" className="nav-right" id="signup">
      Sign Up
    </Link>
  </div>
  )

  const second = (
    <div className="navi-two">
    <h2 style={{cursor:"pointer"}} className="nav-right" id="signin" onClick={()=> {clickLogout()}}>
      Logout
    </h2>
  </div>
  )

  return (
    <div>
      <header>
        <div className="navbar">
          <span className="navbar-logo"><Link to="/"><img src="./logo1.png" id="logo-link" alt="image error"/></Link></span>
          <div className="navi-one">
            <Link to="analyzetype" className="nav-left">
              면접 연습하기
            </Link>
            <Link to="question" className="nav-left">
              면접 질문 리스트
            </Link>
            <Link to="result" className="nav-left">
              면접 분석 결과
             </Link>
          </div>
          {login?second:first}
        </div>
      </header>
    </div>
  );
}

export default Navbar;