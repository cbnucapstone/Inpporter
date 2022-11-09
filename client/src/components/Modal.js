import React from "react";
import { Link } from "react-router-dom";
import "../styles/modal.css";

const Modal = (props) => {
  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const { open_popup, close_popup, header_popup, cate_popup } = props;

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open_popup ? "openpopup popup" : "popup"}>
      {open_popup ? (
        <section>
          <header>
            {header_popup}
            <button className="close" onClick={close_popup}>
              &times;
            </button>
          </header>
          <main>{props.children}</main>
          <footer>
            {header_popup === "Error" ? (
              <button className="close" onClick={close_popup}>
                close
              </button>
            ) : (
              <Link
                to="/voicerecord"
                state={{ question: header_popup, category: cate_popup }}
              >
                <button className="close">연습하기</button>
              </Link>
            )}
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;
