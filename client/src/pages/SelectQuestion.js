import React,{useState} from 'react';
import Modal from '../pages/Modal.js';
import "../styles/SelectQuestion.css";

const SelectQuestion=()=>{
    const [modalOpen, setmodalOpen] = useState(false);

    const openModal=()=>{
        setmodalOpen(true);
    };
    const closeModal = ()=>{
        setmodalOpen(false);
    };
    return(
        <div className="home"  style={{ backgroundImage: "url(./background-img.jpg)"}}>
            <button onClick={openModal}>모달팝업</button>
            <Modal open={modalOpen} close={closeModal} header="연습할 질문을 선택해주세요">
                hihi
            </Modal>
        </div>
    );
}

export default SelectQuestion;