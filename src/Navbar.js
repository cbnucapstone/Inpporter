import {Link} from 'react-router-dom';
import './Navbar.css';

function Navbar() {


  return (
    <div>
      <header>
      <hr />
        <div className="navbar">
          <span className="navbar-logo"><Link to="/"><img src="./bpLink.png" id="logo-link" alt="image error"/></Link></span>
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

      <hr id="under-line"/>
      </header>
    </div>
  );
}

export default Navbar;