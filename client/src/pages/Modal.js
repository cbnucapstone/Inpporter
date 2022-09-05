import React,{useState,useEffect} from 'react';
import '../styles/modal.css';
import styled from 'styled-components';
import { useSelector } from "react-redux"; // useSelector
import axios from "axios";

const  Modal = (props) => {
  // userid 가져오기
  const userid = useSelector((state) => state.User.id);
  // console.log('Modal Page user id : '+userid);

  // 열기, 닫기, 모달 헤더 텍스트를 부모로부터 받아옴
  const [btnActive, setbtnActive] = useState("0");
  const [selected, setSelected] = useState("0");
  const { open, close, header } = props;

  // questionList
  const [questionList, setQuestionList] = useState([]); 

  // onChange 함수를 사용해 이벤트 감지. 필요한 값 받아오기
  const [checkedList, setCheckedList] = useState([]);
  const onCheckedElement = (checked, item)=>{
    if(checked){
        setCheckedList([...checkedList, item]);
    }else if(!checked){
        setCheckedList(checkedList.filter(el=>el !==item));
    }
  };

  // x 누르면 리스팅 목록에서 카테고리 삭제
  const onRemove = item =>{
    setCheckedList(checkedList.filter(el=>el !==item));
  }

  const onTry = () =>{
    if (checkedList.length === 0){
        console.log("없음");
    }else{
        for(var i=0;i<checkedList.length;i++){
            console.log(checkedList[i]);
        }
    } 
  }

  // 질문 리스트 받아오기
  useEffect(() => {
    const callApi = async () => {
      if(selected==="전체"){
        const res = await axios.get(
          `http://localhost:5001/question/${userid}`,userid);
        makeData(res.data.list);
      }else{
      const res = await axios.get(`http://localhost:5001/question/${userid}/${selected}`, userid, selected);
      makeData(res.data.list);
    }
    };

    const makeData = (items) => {
      setQuestionList(items);
    };
    
    callApi();
  }, [selected]);

  useEffect(()=>{
    if(btnActive ==="0"){
      setSelected("전체");
    }else if(btnActive ==="1"){
      setSelected("역량");
    }else if(btnActive ==="2"){
      setSelected("지원동기");
    }else if(btnActive ==="3"){
      setSelected("직무");
    }else if(btnActive ==="4"){
      setSelected("기초인성");
    }
  },[btnActive]);

  return (
    // 모달이 열릴때 openModal 클래스가 생성된다.
    <div className={open ? 'openModal modal' : 'modal'}>
      {open ? (
        <section>
          <header>
            {header}
            <button className="close" onClick={close}>
              &times;
            </button>
          </header>
          <main>
            <div className='left'>
                <button className={"leftbutton"+("0"===btnActive?"active":"")} onClick={()=>setbtnActive("0")}>전체</button>
                <button className={"leftbutton"+("1"===btnActive?"active":"")} onClick={()=>setbtnActive("1")}>역량</button>
                <button className={"leftbutton"+("2"===btnActive?"active":"")} onClick={()=>setbtnActive("2")}>지원동기</button>
                <button className={"leftbutton"+("3"===btnActive?"active":"")} onClick={()=>setbtnActive("3")}>직무</button>
                <button className={"leftbutton"+("4"===btnActive?"active":"")} onClick={()=>setbtnActive("4")}>기초 인성</button>
            </div>
            <div className='right'>
                {questionList.map(item=>{
                    return (
                        <div className="question_content" key = {item._id}>
                            <StyledLabel key={item._id}>
                                <StyledInput
                                type="checkbox"
                                value={item.text} 
                                // onChange 이벤트 발생시 check 여부와 value값 전달해 배열에 data 넣어줌
                                onChange={e=>{onCheckedElement(e.target.checked, e.target.value);}}
                                // 체크 표시 해제 시키는 로직, 배열에 data가 있으면 true, 없으면 false
                                checked = {checkedList.includes(item.text)?true:false}
                                ></StyledInput>
                                <StyledP>{item.text}</StyledP>
                            </StyledLabel>
                        </div>
                    )
                })}
            </div>
          </main>
          <footer>
            <button className="close" onClick={()=>onTry()}>
              연습하기
            </button>
          </footer>
        </section>
      ) : null}
    </div>
  );
};

export default Modal;

const StyledInput = styled.input`
  appearance: none;
  border: 1.5px solid gainsboro;
  border-radius: 0.35rem;
  width: 1.5rem;
  height: 1.5rem;

  &:checked {
    border-color: transparent;
    background-image: url("data:image/svg+xml,%3csvg viewBox='0 0 16 16' fill='white' xmlns='http://www.w3.org/2000/svg'%3e%3cpath d='M5.707 7.293a1 1 0 0 0-1.414 1.414l2 2a1 1 0 0 0 1.414 0l4-4a1 1 0 0 0-1.414-1.414L7 8.586 5.707 7.293z'/%3e%3c/svg%3e");
    background-size: 100% 100%;
    background-position: 50%;
    background-repeat: no-repeat;
    background-color: limegreen;
  }
`;

const StyledLabel = styled.label`
  display: flex;
  align-items: center;
  user-select: none;
`;

const StyledP = styled.p`
  margin-left: 0.25rem;
`;
