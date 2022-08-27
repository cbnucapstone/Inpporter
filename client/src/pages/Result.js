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

const size = [500, 300]; // 크기 조정

function Result(){
const location = useLocation();
const a = location.state.word;
words = location.state.word;

    return(
        <div className="Result"  style={{ backgroundImage: "url(./background-img.jpg)"}}>  
        <ReactWordcloud size={size} options={options} words={words} />
        </div>
    );
}

export default Result;