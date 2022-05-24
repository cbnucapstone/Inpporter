import axios from 'axios';
import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {

  axios
  .get("http://localhost:5000/auth")
  .then((res) =>{
    console.log(res)
  })

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
          <div className="navi-two">
            <Link to="signin" className="nav-right" id="signin">
              Sign In
            </Link>
            <Link to="signup" className="nav-right" id="signup">
              Sign Up
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
}

export default Navbar;