import React from "react";
import { Link, useLocation} from "react-router-dom";
import "../styles/Result.css";
import ReactWordcloud from 'react-wordcloud';

let words = [

]

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
  transitionDuration: 1000
};

//const size = [500, 300]; // 크기 조정

function Result(){
const location = useLocation();
const a = location.state.word;
words = location.state.word;

    return(
        <div className="Result"  style={{ backgroundImage: "url(./background-img.jpg)"}}>  
            <div id="title"><h2> 면접 분석 결과 </h2></div>
            <div class="info">
                <div id="area">
                    <div class="entity"> <div class="type">이름</div> <div class="content">구구즈</div> </div>
                    <div class="entity"> <div class="type">검사 일시</div> <div class="content">2022년 05월 24일</div>  </div>
                    <div class="entity"> <div class="type">분야</div> <div class="content">역량</div>  </div>
                </div>
            </div>
            <div class="resultArea">
                <div class="btns">
                    <button class="btn">질문 1</button>
                </div>
                <div class="btns">
                    <button class="btn">질문 2</button>
                </div>
                <div id="question">
                    질문 1
                    <br />
                    <li id="quesList">
                        <ul id="quesContent"> 질문입니다. </ul>
                    </li>
                </div>
                <div class="hr"></div>
                <div id="vision">
                    <div class="subtitle"><h3> Vision Analysis </h3></div>
                    <div id="interviewVideo"></div>
                    <div id="emotionGraph"></div>
                </div>
                <div class="hr"></div>
                <div id="voice">
                    <div class="subtitle"><h3> 음성 분석 </h3></div>
                    <div id="one"></div>
                    <div id="two"></div>
                </div>
                <div class="hr"></div>
                <div id="word">
                    <div class="subtitle"><h3> Word Frequency </h3></div>
                    <div id="explain">구구즈 님의 면접 시 단어 사용 빈도 결과입니다.</div>
                    <div id="three"><ReactWordcloud options={options} words={words} />
                    </div>
                    <div id="four"></div>
                </div>
                <div class="hr"></div>
                <div id="pitch">
                    <div class="subtitle"><h3> Voice Pitch </h3></div>
                    <div id="five"></div>
                    <div id="six"></div>
                </div>
            </div>

        </div>
    );
}

export default Result;