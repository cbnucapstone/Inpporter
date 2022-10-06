import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import SelectQuestion_Modal from "../pages/SelectQuestion_Modal";
import "../styles/SelectQuestion.css";

const SelectQuestion = () => {
  const [modalOpen, setmodalOpen] = useState(true);
  const navigate = useNavigate();

  const openModal = () => {
    setmodalOpen(true);
  };
  const closeModal = () => {
    setmodalOpen(false);
    navigate("/");
  };
  return (
    <div
      className="home"
      style={{ backgroundImage: "url(./background-img.jpg)" }}
    >
      <SelectQuestion_Modal
        open={modalOpen}
        close={closeModal}
        header="연습할 질문을 선택해주세요"
      ></SelectQuestion_Modal>
    </div>
  );
};

export default SelectQuestion;
