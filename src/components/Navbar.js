import {Link} from 'react-router-dom';
import '../styles/Navbar.css';

function Navbar() {


  return (
    <div>
      <header>
        <div className="navbar">
          <span className="navbar-logo"><Link to="/"><img src="./logo1.png" id="logo-link" alt="image error"/></Link></span>
          <div className="navi-one">
            <Link to="analyzetype" className="nav-left">
              면접 연습하기
            </Link>
            <Link to="" className="nav-left">
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