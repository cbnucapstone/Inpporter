import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../styles/Result.css";
import ReactWordcloud from "react-wordcloud";
import { useSelector } from "react-redux";
import * as React from "react";
import Waveform from "react-audio-waveform";
import { BsFillPrinterFill } from "react-icons/bs";

import { useRef } from "react";
import ReactToPrint from "react-to-print";

// react chartjs-2
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar, Pie, Radar } from "react-chartjs-2";

let file_url;
let todayDate;
let todayyear;
let todaymonth;
let todayday;

// 질문
let select_question;
let select_category;

// word cloud
let words = [];

// 홍채 인식
let left_eye_list = [];
let right_eye_list = [];

// 표정 인식
let angry = 0;
let disgusted = 0;
let fearful = 0;
let happy = 0;
let neutral = 0;
let sad = 0;
let surprised = 0;

const options = {
  fontSizes: [25, 60],
  padding: 1,
  transitionDuration: 1000,
  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  enableTooltip: true,
  deterministic: false,
  fontFamily: "impact",
  fontStyle: "normal",
  fontWeight: "normal",
  rotations: 3,
  rotationAngles: [0, 90],
  scale: "sqrt",
  spiral: "archimedean",
};

//const size = [500, 300]; // 크기 조정

function Result() {
  let ReactDOM = require("react-dom");

  const location = useLocation();

  // 시간
  todayDate = location.state.date;
  console.log(todayDate);
  todayyear = todayDate.substring(0, 4);
  todaymonth = todayDate.substring(4, 6);
  todayday = todayDate.substring(6);

  select_question = location.state.question;
  select_category = location.state.category;
  file_url = location.state.fileurl;

  // const max1 = location.state.max;
  // const max2 = location.state.max2;
  const audioResult1 = location.state.audioResult1;
  const audioResult2 = location.state.audioResult2;
  const duration = location.state.duration;

  const transcript = location.state.script; //질문 답변

  const username = useSelector((state) => state.User.name);

  const a = location.state.word;
  words = location.state.word;

  //words 배열을 깊은복사
  var chartwords = words.slice();

  //value값 내림차순 정렬
  chartwords.sort((a, b) => {
    return b.value - a.value;
  });

  //상위 10개 자르기
  if (chartwords.length >= 10) {
    chartwords.length = 10;
  }

  //word를 단어와 갯수로 분리
  var wordlabel = [];
  for (var i = 0; i < chartwords.length; i++) {
    wordlabel[i] = chartwords[i].text;
  }

  var worddata = [];
  for (var i = 0; i < chartwords.length; i++) {
    worddata[i] = chartwords[i].value;
  }

  // chart registar
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Title,
    Tooltip,
    Legend
  );

  left_eye_list = location.state.left_eye;
  right_eye_list = location.state.right_eye;

  // const User_canvasRef = React.useRef(null);
  const Left_canvasRef = React.useRef(null);
  const Right_canvasRef = React.useRef(null);

  angry = location.state.angryvalue;
  happy = location.state.happyvalue;
  disgusted = location.state.disgustedvalue;
  neutral = location.state.neutralvalue;
  sad = location.state.sadvalue;
  surprised = location.state.surprisedvalue;
  fearful = location.state.fearfulvalue;

  //  배열 값으로 홍채 움직임 좌표 출력
  const DrawIrisResult = () => {
    const leftctx = Left_canvasRef.current.getContext("2d");
    const rightctx = Right_canvasRef.current.getContext("2d");

    Left_canvasRef.current.width = 300;
    Left_canvasRef.current.height = 300;

    Right_canvasRef.current.width = 300;
    Right_canvasRef.current.height = 300;

    // 가로 세로 선 그리기
    leftctx.strokeStyle = "#000000";
    leftctx.lineWidth = 1;
    // 세로 축
    leftctx.beginPath();
    leftctx.moveTo(0, 150);
    leftctx.lineTo(300, 150);
    leftctx.stroke();
    // 가로 축
    leftctx.beginPath();
    leftctx.moveTo(150, 0);
    leftctx.lineTo(150, 300);
    leftctx.stroke();

    // 가로 세로 선 그리기
    rightctx.strokeStyle = "#000000";
    rightctx.lineWidth = 1;
    // 세로 축
    rightctx.beginPath();
    rightctx.moveTo(0, 150);
    rightctx.lineTo(300, 150);
    rightctx.stroke();
    // 가로 축
    rightctx.beginPath();
    rightctx.moveTo(150, 0);
    rightctx.lineTo(150, 300);
    rightctx.stroke();

    leftctx.fillStyle = "rgba(237, 109, 133, 1)";
    leftctx.strokeStyle = "rgba(237, 109, 133, 1)";
    rightctx.fillStyle = "rgba(87, 160, 229, 1)";
    rightctx.strokeStyle = "rgba(87, 160, 229, 1)";
    for (let i = 1; i < left_eye_list.length; i++) {
      // console.log(left_eye_list[i].x);
      leftctx.beginPath();
      leftctx.arc(
        left_eye_list[i].x - left_eye_list[0].x + 150,
        left_eye_list[i].y - left_eye_list[0].y + 150,
        5,
        0,
        2 * Math.PI
      );
      leftctx.stroke();
      leftctx.fill();

      rightctx.beginPath();
      rightctx.arc(
        right_eye_list[i].x - right_eye_list[0].x + 150,
        right_eye_list[i].y - right_eye_list[0].y + 150,
        5,
        0,
        2 * Math.PI
      );
      rightctx.stroke();
      rightctx.fill();
    }
  };

  // face BarChart options
  const FaceBarOptions = {
    indexAxis: "y",
    maintainAspectRatio: false, //그래프 비율 유지
    responsive: false,
    elements: {
      bar: {
        borderWidth: 1,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        scaleLabel: {
          display: false,
        },
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
      },
    },
  };

  // face BarChart data
  const FaceBarData = {
    labels: ["분노", "행복", "혐오", "침착", "슬픔", "놀람", "긴장"],
    datasets: [
      {
        data: [angry, happy, disgusted, neutral, sad, surprised, fearful],
        label: "감정 지수",
        borderColor: "#FF6869",
        backgroundColor: "#FF6869",
      },
    ],
  };

  const WordPieOptions = {
    plugins: {
      title: {
        display: false,
        font: { size: 17, weight: "normal" },
        padding: {
          bottom: 20,
        },
      },
      legend: {
        display: true,
        position: "right",
        labels: {
          boxWidth: 20,
          usePointStyle: true,
          pointStyle: "circle",
        },
      },
    },
  };

  // word PieChart data
  const WordPieData = {
    labels: wordlabel,
    maintainAspectRatio: false, //그래프 비율 유지
    datasets: [
      {
        label: "단어 빈도",
        data: worddata,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(255, 159, 64)",
          "rgb(255, 205, 86)",
          "rgb(75, 192, 192)",
          "rgb(54, 162, 235)",
          "rgb(153, 102, 255)",
          "#B1B2FF",
          "#FFD1D1",
          "#C4DFAA",
          "#9ADCFF",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // face RadarChart data
  const FaceRadarData = {
    labels: ["분노", "행복", "혐오", "침착", "슬픔", "놀람", "긴장"],
    datasets: [
      {
        label: "감정 지수(%)",
        data: [angry, happy, disgusted, neutral, sad, surprised, fearful],
        backgroundColor: "rgba(255, 99, 132, 0.2)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  const VoiceBarOptions = {
    indexAxis: "x",
    maintainAspectRatio: false, //그래프 비율 유지
    responsive: true,
    maxBarThickness: 10,
    elements: {
      bar: {
        borderWidth: 0,
      },
    },
    plugins: {
      legend: {
        display: false,
        labels: {
          padding: 0,
        },
      },
      title: {
        display: false,
      },
    },
    scales: {
      xAxis: {
        scaleLabel: {
          display: false,
        },
        ticks: {
          display: false,
        },
        gridLines: {
          display: false,
        },
        grid: {
          display: false,
          drawThicks: false,
        },
      },
      yAxis: {
        grid: {
          display: false,
          drawThicks: false,
        },
        ticks: {
          stepSize: 1,
        },
        max: 5,
        min: 0,
      },
    },
  };

  const VoiceBarData = {
    labels: audioResult1,
    datasets: [
      {
        data: audioResult1,
        label: "목소리 크기",
        borderColor: "#FF6869",
        backgroundColor: "#FF6869",
        // fill: true,
      },
    ],
  };
  // DrawUserImage();

  return (
    <div id="resultdiv">
      <div id="resulttitle">
        <h2> 면접 분석 결과 </h2>
      </div>
      <div className="info">
        <div className="entity">
          {" "}
          <div className="type">이름</div>{" "}
          <div className="content">{username}</div>{" "}
        </div>
        <div className="entity">
          {" "}
          <div className="type">검사 일시</div>{" "}
          <div className="content">
            {todayyear}년 {todaymonth}월 {todayday}일
          </div>{" "}
        </div>
        <div className="entity">
          {" "}
          <div className="type">분야</div>{" "}
          <div className="content">{select_category}</div>{" "}
        </div>
      </div>
      <div className="questionArea">
        <label id="questionArea-content">{select_question}</label>
      </div>
      <hr></hr>
      {/* 면접 화면 캡쳐 이미지와 표정 */}
      <div className="vision">
        <div className="subtitle">
          <h3> Vision Analysis </h3>
        </div>
        <div className="analyzeimage">
          <div id="interviewVideo">
            <video
              id="video"
              controls="controls"
              // autoPlay="autoplay"
              loop="loop"
            >
              <source src={file_url} type="video/webm" />
              Video Error
            </video>
            {/* <img
                src={require("http://localhost:5001/uploads/5.jpg").default}
                alt="Logo"
              /> */}
            {/* <canvas ref={User_canvasRef} className="iriscanvas" /> */}
          </div>
        </div>
        <div className="Explanation">
          <p className="explanation-header">답변</p>
          <p className="explanation-contenet">{transcript}</p>
        </div>
      </div>

      {/* 분석결과출력디브 */}
      <div className="resultArea">
        <div className="hr"></div>
        {/* 표정 분석 */}
        <div id="face">
          <div className="subtitle">
            <h3> 표정 분석 </h3>
          </div>
          <div className="analyzeimage">
            <div className="leftdiv">
              <p className="graphtitle">표정 인식 결과</p>
              <Bar
                className="inner"
                options={FaceBarOptions}
                height={300}
                data={FaceBarData}
              />
            </div>
            <div className="rightdiv">
              <Radar className="inner" data={FaceRadarData} />
            </div>
          </div>
          <div className="Explanation">
            <p className="explanation-header">해석</p>
            <p className="explanation-contenet">
              위 그래프는 면접을 진행하는 동안 사용자의 <b>표정 변화</b>를
              보여주는 그래프입니다.
              <br />
              분노∙행복∙혐오∙침착∙슬픔∙놀람∙긴장 총 7가지의 표정 분석을 통해
              전반적인 얼굴 표정을 확인 할 수 있습니다.
              <br />
              그래프를 통해 표정 분석 결과를 확인하고 보완이 필요한 부분을
              추가로 연습할 수 있습니다.
            </p>
          </div>
        </div>
        {/* 시선 처리 */}
        <div className="hr"></div>
        <div id="iris">
          <div className="subtitle">
            <h3> 시선 처리 </h3>
            <button onClick={() => DrawIrisResult()}>
              시선 처리 결과 확인하기
            </button>
          </div>
          <div className="analyzeimage">
            <div className="leftdiv">
              <canvas ref={Left_canvasRef} className="iriscanvas" />
            </div>
            <div className="rightdiv">
              <canvas ref={Right_canvasRef} className="iriscanvas" />
            </div>
          </div>
          <div className="Explanation">
            <p className="explanation-header">해석</p>
            <p className="explanation-contenet">
              위 그래프는 면접을 진행하는 동안 사용자의{" "}
              <b>시선이 머무른 영역</b>을 보여주는 그래프입니다.
              <br /> 그래프는 사용자가 연습하기 버튼을 눌렀을 때 시선을 기준으로
              그려집니다.
              <br />
              왼쪽 그래프는 <b>왼쪽의 홍채의 움직임</b>, 오른쪽 그래프는{" "}
              <b>오른쪽 홍채의 움직임</b>을 나타냅니다.
              <br />
              점으로 표시된 시선 분포의 흩어짐 정도가 크다면, 시선이 여러
              방향으로 분산 됐다는 것을 의미합니다.
            </p>
          </div>
        </div>

        {/* 단어 분석 */}
        <div className="hr"></div>
        <div id="word">
          <div className="subtitle">
            <h3> 단어 분석 </h3>
          </div>
          <div className="analyzeimage">
            <div className="leftdiv">
              <p className="graphtitle">word cloud</p>
              <ReactWordcloud
                className="inner"
                options={options}
                words={words}
              />
            </div>
            <div className="rightdiv">
              <p className="graphtitle">자주 사용한 단어</p>
              <Pie
                className="inner"
                options={WordPieOptions}
                data={WordPieData}
              />
              {/* <Bar
                  options={wordChartOptions}
                  data={wordChartData}
                /> */}
            </div>
          </div>
          <div className="Explanation">
            <p className="explanation-header">해석</p>
            <p className="explanation-contenet">
              위 그래프는 면접을 진행하는 동안 <b>사용자의 사용 어휘</b>를
              보여주는 그래프입니다.
              <br />
              왼쪽 그래프는 모든 단어의 빈도를 크기로 비교할 수 있는{" "}
              <b>Word Cloud</b>, 오른쪽 그래프는{" "}
              <b>사용 빈도수가 높은 상위 10개 단어</b>를 나타냅니다.
              <br />
              이와 같은 지워자의 어휘 사용 습관 확인을 통해 부적절하거나
              불필요한 내용이 반복되지 않았는지 점검해 볼 수 있습니다.
            </p>
          </div>
        </div>
        {/* 목소리 분석 */}
        <div className="hr"></div>
        <div id="voice">
          <div className="subtitle">
            <h3> 목소리 분석 </h3>
          </div>
          <div className="analyzeimage">
            <div className="leftdiv">
              <p className="graphtitle">목소리 크기 변화</p>
              <Bar
                className="inner"
                options={VoiceBarOptions}
                // width={360}
                // height={360}
                data={VoiceBarData}
              />
            </div>
            <div id="waveformdiv">
              <p className="graphtitle">목소리 떨림 변화</p>
              <Waveform
                barWidth={1}
                peaks={audioResult2}
                height={250}
                duration={duration}
                color="#B1B2FF"
                progressGradientColors={[[0, "#B1B2FF"]]}
              />
            </div>
          </div>
          <div className="Explanation">
            <p className="explanation-header">해석</p>
            <p className="explanation-contenet">
              위 그래프는 면접을 진행하는 동안 <b>사용자의 목소리 분석 결과</b>
              를 보여주는 그래프입니다.
              <br />
              왼쪽 그래프는 <b>목소리 크기 변화</b>를 다섯단계로 나타내고,{" "}
              오른쪽 그래프는 <b>목소리의 떨림</b>을 나타냅니다.
              <br />
              높은 전달력을 위해 적당한 크기와 일정한 톤으로 말하는 것에
              주의해야합니다. 분석 결과를 통해 지원자의 음성에 대해 확인하고
              대답하는 것을 연습할 수 있습니다.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

class ComponentToPrint extends React.PureComponent {
  constructor(props) {
    super(props);
  }
  render() {
    return <Result/>;
  }
}

export class ClassComponent extends React.PureComponent {
  componentRef = null;
  constructor(props) {
    super(props);
  }

  setComponentRef = (ref) => {
    this.componentRef = ref;
  };

  reactToPrintContent = () => {
    return this.componentRef;
  };
  reactToPrintTrigger = () => {
    return (
      <button id="printbtn">
        {" "}
        <BsFillPrinterFill size="30" />{" "}
      </button>
    );
  };

  render() {
    return (
      <div
        className="background"
        style={{
          backgroundImage: "url(./bgimg5.png)",
          backgroundSize: "contain",
          width: "100%",
          height: "auto",
          backgroundRepeat: "repeat-y",
        }}
      >
        <div className="Result">
          <ReactToPrint
            content={this.reactToPrintContent}
            documentTitle="면접연습분석결과지"
            removeAfterPrint
            trigger={this.reactToPrintTrigger}
          />
          <div id="result_container">
            <ComponentToPrint ref={this.setComponentRef} />
          </div>
        </div>
      </div>
    );
  }
}

export default ClassComponent;
