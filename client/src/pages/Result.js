import React from "react";
import { Link, useLocation} from "react-router-dom";
import "../styles/Result.css";
import ReactWordcloud from 'react-wordcloud';

let words = [
  {
    text: 'told',
    value: 64,
  },
]


function Result(){
const location = useLocation();
const a = location.state.word;
words = location.state.word;

    return(
        <div className="Result"  style={{ backgroundImage: "url(./background-img.jpg)"}}>  
        <ReactWordcloud words={words} />
        </div>
    );
}

export default Result;