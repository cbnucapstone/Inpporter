// import React from "react";
import { useLocation } from "react-router-dom";
import "../styles/Result.css";
import ReactWordcloud from "react-wordcloud";

import * as React from "react";
import Box from "@mui/material/Box";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import { createTheme } from "@mui/material/styles";
import { ThemeProvider } from "@mui/material/styles";
// npm install @mui/lab @mui/material --force

// Video element 속성
const Styles = {
  Canvas: {
    width: "300",
    height: "300",
    background: "rgba(0,0,0,0)",
    border: "1px solid green",
  },
  None: { display: "none" },
};

const customTheme = createTheme({
  palette: {
    primary: {
      light: "#757ce8",
      main: "#3f50b5",
      dark: "#002884",
    },
    secondary: {
      light: "#8f9bff",
      main: "#536dfe",
      dark: "0043ca",
    },
  },
});

let words = [];
let left_eye_list = [];
let right_eye_list = [];

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

function Result() {
  const location = useLocation();
  const a = location.state.word;
  words = location.state.word;

  left_eye_list = location.state.left_eye;
  right_eye_list = location.state.right_eye;

  const Left_canvasRef = React.useRef(null);
  const Right_canvasRef = React.useRef(null);

  const [value, setValue] = React.useState("1");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  //  배열 값으로 홍채 움직임 좌표 출력
  const DrawIrisResult = () => {
    console.log("drawIrisResult");
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
    leftctx.setLineDash([5]);
    leftctx.stroke();
    // 가로 축
    leftctx.beginPath();
    leftctx.moveTo(150, 0);
    leftctx.lineTo(150, 300);
    leftctx.setLineDash([5]);
    leftctx.stroke();

    // 가로 세로 선 그리기
    rightctx.strokeStyle = "#000000";
    rightctx.lineWidth = 1;
    // 세로 축
    rightctx.beginPath();
    rightctx.moveTo(0, 150);
    rightctx.lineTo(300, 150);
    rightctx.setLineDash([5]);
    rightctx.stroke();
    // 가로 축
    rightctx.beginPath();
    rightctx.moveTo(150, 0);
    rightctx.lineTo(150, 300);
    rightctx.setLineDash([5]);
    rightctx.stroke();

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
      leftctx.fillStyle = "red";
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
      rightctx.fillStyle = "blue";
      rightctx.fill();
    }
  };

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
            <div className="content">구구즈</div>{" "}
          </div>
          <div className="entity">
            {" "}
            <div className="type">검사 일시</div>{" "}
            <div className="content">2022년 05월 24일</div>{" "}
          </div>
          <div className="entity">
            {" "}
            <div className="type">분야</div> <div className="content">역량</div>{" "}
          </div>
        </div>
        <div className="vision">
          <div className="subtitle">
            <h3> Vision Analysis </h3>
          </div>
          <div className="analyzeimage">
            <div id="interviewVideo"></div>
            <div id="emotionGraph"></div>
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
          <div className="questionArea">
            <ThemeProvider theme={customTheme}>
              <Box sx={{ width: "100%", typography: "body1" }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <TabList
                      onChange={handleChange}
                      textColor="secondary"
                      indicatorColor="secondary"
                      // aria-label="lab API tabs example"
                    >
                      <Tab label="질문 1" value="1" />
                      <Tab label="질문 2" value="2" />
                      <Tab label="질문 3" value="3" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    지원하게 된 동기는 무엇이며 자신이 지원한 직무를 성공적으로
                    수행할 수 있다고 생각하는 이유를 말해주세요.
                  </TabPanel>
                  <TabPanel value="2">
                    지원하는 직무를 성공적으로 수행하기 위해 도움이 될 기술이나
                    경험 등 면접자의 역량은 어떤 것이 있나요?
                  </TabPanel>
                  <TabPanel value="3">
                    인생관/가치관 정립에 영향을 준 사건은?
                  </TabPanel>
                </TabContext>
              </Box>
            </ThemeProvider>
          </div>
        </div>

        <div className="resultArea">
          <div className="hr"></div>
          <div id="voice">
            <div className="subtitle">
              <h3> 음성 분석 </h3>
            </div>
            <div className="analyzeimage">
              <div id="one">
                <canvas ref={Left_canvasRef} style={Styles.Canvas} />
              </div>
              <div id="two">
                <canvas ref={Right_canvasRef} style={Styles.Canvas} />
              </div>
              <button onClick={() => DrawIrisResult()}>hihi</button>
            </div>
            <div className="Explanation">
              <p id="explanation-header">해석</p>
              <p id="explanation-contenet">
                {" "}
                면접시 저장되었던 음성에 대한 분석결과입니다. <br />
                저장된 음성을 분석하여 정보를
                제공합dddswrk가ㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㅏㄴ니다.
                dsfdsfsdfdsfdsfdsf
                <br />
                dfdsfdsfdfdfdfd
                <br />
                sfdsfdfdfd{" "}
              </p>
            </div>
          </div>
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
              <div id="four"></div>
            </div>
          </div>
          <div className="hr"></div>
          <div id="pitch">
            <div className="subtitle">
              <h3> Voice Pitch </h3>
            </div>
            <div className="analyzeimage">
              <div id="five"></div>
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
