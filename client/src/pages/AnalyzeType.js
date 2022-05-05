import '../styles/AnalyzeType.css';
import {Link} from 'react-router-dom';


function PresentationType() {

  return (
  <div style={{paddingTop: "100px",paddingBottom: "6%", backgroundImage: "url(./background-img.jpg)", backgroundSize: "1600px 500px", backgroundRepeat: "no-repeat"}}>
    <div id="presentation-type">

     <Link to="/voicerecord"><div id="info-type-one">
          <p id="type-title"> 음성 연습하기 </p>
      <p id="type-explain"> 주어진 질문에 대해 답변하시면 AI 친구 인포터가 <br /> 안정감 있는 발표를 위한 음성 분석을 진행합니다. </p>
     </div></Link>

     <Link to="/"><div id="info-type-two">
      <p id="type-title"> 표정 연습하기 </p>
      <p id="type-explain"> 주어진 문장을 읽어주시면 AI 친구 인포터가 <br /> 자신감 있는 발표를 위한 시선 처리 분석을 진행합니다. </p>
     </div></Link>

    </div>
    </div>
  );
}

export default PresentationType;