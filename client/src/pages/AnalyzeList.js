import React from "react";
import '../styles/AnalyzeList.css';
import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";

function analyzelist(){


    return(
    <div id="listpage">

    <div id="title"><h1> AI 면접 분석 결과 </h1></div>
    <br />
    <div id="sort"><button id="sortBtn"> 날짜순 </button></div>
    <br />

    <div class="AnalyzeList">
        <div class="results1">
            <button class="goResult">
                <img src="./mainimage.jpg" class="selfpic"/>
                <div> 2022.09.15 (화) 01:32:56 <br /> 자신의 강점을 소개하시오. </div>
            </button>
        </div>

        <div class="results2">
            <button class="goResult">
                <img src="./mainimage.jpg" class="selfpic"/>
                <div> 2022.09.15 (화) 01:32:56 <br /> 자신의 강점을 소개하시오. </div>
            </button>
        </div>
        <div class="results3">
            <button class="goResult">
                 <img src="./mainimage.jpg" class="selfpic"/>
                 <div> 2022.09.15 (화) 01:32:56 <br /> 자신의 강점을 소개하시오. </div>
            </button>
        </div>
    </div>

    </div>

  )
}
export default analyzelist;
