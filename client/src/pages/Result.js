import { useLocation } from "react-router-dom";
import "../styles/Result.css";
import ReactWordcloud from "react-wordcloud";
import { useSelector } from "react-redux";
import * as React from "react";
import { createTheme } from "@mui/material/styles";

// npm install @mui/lab @mui/material --force

// react chartjs-2
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { Pie } from "react-chartjs-2";

let file_name;
let file_url;

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
let sum = 0;

const options = {
  //  colors: ["#1f77b4", "#ff7f0e", "#2ca02c", "#d62728", "#9467bd", "#8c564b"],
  //  enableTooltip: true,
  //  deterministic: false,
  //  fontFamily: "impact",
  fontSizes: [25, 60], //글씨의 최대, 최소 사이즈
  //  fontStyle: "normal",
  //  fontWeight: "normal",
  padding: 1,
  //  rotations: 3,
  //  rotationAngles: [0, 90],
  //  scale: "sqrt",
  //  spiral: "archimedean",
  transitionDuration: 1000,
};

//const size = [500, 300]; // 크기 조정

// 현재 날짜 구하기 (년/월/일)
const todayFormal = () => {
  let now = new Date();
  let todayYear = now.getFullYear();
  let todayMonth =
    now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
  let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
  return todayYear + "년 " + todayMonth + "월 " + todayDate + "일";
};

function Result() {
  // 시간
  let todayDate = todayFormal();

  const location = useLocation();

  select_question = location.state.question;
  select_category = location.state.category;
  file_name = location.state.filename;
  file_url = location.state.fileurl;

  const username = useSelector((state) => state.User.name);

  const a = location.state.word;
  words = location.state.word;

  //word를 단어와 갯수로 분리
  var wordlabel = new Array();
  for (var i = 0; i < words.length; i++) {
    wordlabel[i] = words[i].text;
  }

  var worddata = new Array();
  for (var i = 0; i < words.length; i++) {
    worddata[i] = words[i].value;
  }

  // bar chart registar
  ChartJS.register(
    ArcElement,
    CategoryScale,
    LinearScale,
    BarElement,
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

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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

  // bar chart options
  const barChartPptions = {
    indexAxis: "y",
    maintainAspectRatio: false, //그래프 비율 유지
    responsive: true,
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: true,
        text: "표정인식결과",
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

  const barChartData = {
    labels: ["분노", "행복", "혐오", "침착", "슬픔", "놀람", "긴장"],
    datasets: [
      {
        data: [angry, happy, disgusted, neutral, sad, surprised, fearful],
        label: "감정 지수",
        borderColor: "#FF6869",
        backgroundColor: "#FF6869",
        // fill: true,
      },
    ],
  };

  // word chart options
  const wordChartPptions = {
    indexAxis: "y",
    maintainAspectRatio: false, //그래프 비율 유지
    responsive: true,
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
        display: true,
        text: "단어인식결과",
        // fontSize:30
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

  const wordChartData = {
    labels: wordlabel,
    datasets: [
      {
        data: worddata,
        label: "단어 빈도",
        // borderColor: "#9FA9D8",
        backgroundColor: "#1363DF",
        fill: true,
      },
    ],
  };

  const piedata = {
    labels: wordlabel,
    maintainAspectRatio: false, //그래프 비율 유지
    datasets: [
      {
        label: "단어 빈도",
        data: worddata,
        backgroundColor: [
          "rgb(255, 99, 132)",
          "rgb(54, 162, 235)",
          "rgb(255, 205, 86)",
        ],
        hoverOffset: 4,
      },
    ],
  };

  // DrawUserImage();
  console.log(file_url);

  return (
    <div
      className="Result"
      style={{ backgroundImage: "url(./background-img.jpg)" }}
    >
      <div className="result_container">
        <div id="title">
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
            <div className="content">{todayDate}</div>{" "}
          </div>
          <div className="entity">
            {" "}
            <div className="type">분야</div>{" "}
            <div className="content">{select_category}</div>{" "}
          </div>
        </div>
        {/* 질문 */}
        {/* <div className="questionArea">
          <p id="questionArea-header">질문</p>
          <div id="questionArea-content"> {question} </div>
        </div> */}
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
                width="300px"
                height="350px"
                controls="controls"
                autoPlay="autoplay"
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
            <div id="emotionGraph">
              {" "}
              <Bar
                options={barChartPptions}
                width={110}
                height={70}
                data={barChartData}
              />
            </div>
          </div>
          <div className="Explanation">
            <p id="explanation-header">해석</p>
            <p id="explanation-contenet">
              {" "}
              면접시 저장되었던 영상을 보여줍니다. <br />
              이러한 영상을 통해 자신의 얼굴표정, 면접태도, 답변 내용을 확인할
              수 있습니다. 이러한 확인을 통해 시선처리와 좋지 않은 답변 습관
              등을 확인할 수 있습니다. AI면접은 답변 내용도 중요하지만 이러한
              안면인식 및 안면분석을 통해 저어와 호감도를 분석한 결과도 중요하기
              때문에 이러한 분석은 매우 중요합니다.{" "}
            </p>
          </div>
        </div>

        {/* 분석결과출력디브 */}
        <div className="resultArea">
          {/* 시선 처리 */}
          <div className="hr"></div>
          <div id="iris">
            <div className="subtitle">
              <h3> 시선 처리 </h3>
              <button onClick={() => DrawIrisResult()}>
                시선 처리 결과 확인하기
              </button>
            </div>
            <div className="irisdiv">
              <div id="one">
                <canvas ref={Left_canvasRef} className="iriscanvas" />
              </div>
              <div id="two">
                <canvas ref={Right_canvasRef} className="iriscanvas" />
              </div>
            </div>
            <div className="Explanation">
              <p id="explanation-header">해석</p>
              <p id="explanation-contenet">
                {" "}
                위 그래프는 면접을 진행하는 동안 사용자의{" "}
                <b>시선이 머무른 영역</b>을 보여주는 그래프입니다.
                <br /> 그래프는 사용자가 연습하기 버튼을 눌렀을 때 시선을
                기준으로 그려집니다.
                <br />
                왼쪽 그래프는 <b>왼쪽의 홍채의 움직임</b>, 오른쪽 그래프는{" "}
                <b>오른쪽 홍채의 움직임</b>을 나타냅니다.
                <br />
                점으로 표시된 시선 분포의 흩어짐 정도가 크다면, 시선이 여러
                방향으로 분산 됐다는 것을 의미합니다.{" "}
              </p>
            </div>
          </div>

          {/* word cloud */}
          <div className="hr"></div>
          <div id="word">
            <div className="subtitle">
              <h3> Word Frequency </h3>
            </div>
            <div id="explain">
              구구즈 님의 면접 시 단어 사용 빈도 결과입니다.
            </div>
            <div className="analyzeimage">
              <div id="three">
                <ReactWordcloud options={options} words={words} />
              </div>
              <div id="wordgraph">
                <Bar
                  options={wordChartPptions}
                  width={110}
                  height={70}
                  data={wordChartData}
                />
              </div>
            </div>
          </div>
          <div className="hr"></div>
          <div id="pitch">
            <div className="subtitle">
              <h3> Voice Pitch </h3>
            </div>
            <div className="analyzeimage">
              <div id="five">
                {" "}
                <Pie data={piedata} width={110} height={70} />
              </div>
              <div id="six"></div>
            </div>
            <div className="Explanation">
              <p id="explanation-header">해석</p>
              <p id="explanation-contenet">
                {" "}
                음성 파형에 대한 분석입니다. <br />
                음성의 높낮이, 떨림에 대한 결과를 제공합니다.{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Result;
