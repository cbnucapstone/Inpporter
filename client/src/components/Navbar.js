import { Link } from "react-router-dom";
import "../styles/Navbar.css";

import { store } from "../reducer/store";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const login = useSelector((state) => state.User.login);
  const navigate = useNavigate();

  const clickLogout = () => {
    store.dispatch({ type: "logout" });
    alert("로그아웃 되었습니다.");
    navigate("/");
  };

  const first = (
    <div className="navi-two">
      <Link to="/signin" className="nav-right" id="signin">
        Sign In
      </Link>
      <Link to="/signup" className="nav-right" id="signup">
        Sign Up
      </Link>
    </div>
  );

  const second = (
    <div className="navi-two">
      <h2
        style={{ cursor: "pointer" }}
        className="nav-right"
        id="signin"
        onClick={() => {
          clickLogout();
        }}
      >
        Logout
      </h2>
    </div>
  );

  return (
    <div>
      <header>
        <div className="navbar">
          <span className="navbar-logo">
            <Link to="/">
              <img src="./logo1.png" id="logo-link" alt="image error" />
            </Link>
          </span>
          <div className="navi-one">
            {login ? (
              <Link to="/selectquestion" className="nav-left">
                면접 연습하기
              </Link>
            ) : (
              <Link to="/signin" className="nav-left">
                면접 연습하기
              </Link>
            )}
            {login ? (
              <Link to="/question" className="nav-left">
                면접 질문 리스트
              </Link>
            ) : (
              <Link to="/signin" className="nav-left">
                면접 질문 리스트
              </Link>
            )}
            {login ? (
              <Link to="/resultList" className="nav-left">
                면접 분석 결과
              </Link>
            ) : (
              <Link to="/signin" className="nav-left">
                면접 분석 결과
              </Link>
            )}
          </div>
          {login ? second : first}
        </div>
      </header>
    </div>
  );
}

export default Navbar;
