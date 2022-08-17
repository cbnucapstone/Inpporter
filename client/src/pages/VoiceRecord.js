import React, { useState, useEffect, Component } from "react";
import {Link, useNavigate} from 'react-router-dom';
import PropTypes from "prop-types";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import ReactWordcloud from 'react-wordcloud';
import '../styles/VoiceRecord.css';
import axios from "axios";

const words = [
]

const AudioRecord = () => {

  const navigate = useNavigate();
  const [onVideo, setOnVideo] = useState(true);
  const [playing, setPlaying] = useState(true);
  const [videoBtn, setVideoBtn] = useState("화면 보기");
  const videoRef = React.useRef(null);

   const {
      transcript,
      listening,
      resetTranscript,
      browserSupportsSpeechRecognition
    } = useSpeechRecognition();

  const a = transcript.split(" ");
  const [name, setName] = useState();

const getWebcam = (callback) => {
  try {
    const constraints = {
      'video': true
    }
    navigator.mediaDevices.getUserMedia(constraints)
      .then(callback);
  } catch (err) {
    console.log(err);
    return undefined;
  }
}

React.useEffect(() => {
    getWebcam((stream1 => {
      setPlaying(true);
      videoRef.current.srcObject = stream1;
    }));
  }, []);


const Styles = {
  Video: {width: "80%", height: "85%", background: 'rgba(245, 240, 215, 0.5)' },
  None: { display: 'none' },
}

const TestOverlay = () => {

  const videoRef = React.useRef(null);

  React.useEffect(() => {
    getWebcam((stream1 => {
      setPlaying(true);
      videoRef.current.srcObject = stream1;
    }));
  })
  };

  const checkResult = () =>{
  console.log(transcript);
  for(let i=0; i<a.length; i++){
    words.push({text: a[i], value: i});
    }
    setName("hi");

    if (playing) {

      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
      setPlaying(false);
        track.stop();
      });
    }
    navigate('/result', {
            state: {
            word: words
            }
          });
  }

  const startOrStop = () => {

    if (playing) {

      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
      setPlaying(false);
        track.stop();
      });
    } else {
      getWebcam((stream1 => {

        setPlaying(true);
        videoRef.current.srcObject = stream1;
      }));
    }
  }

  return (
    <div style={{width:"100%", height: "100%", backgroundImage: "url(./background-img.jpg)", backgroundRepeat: "no-repeat"}}>
      <div id="recordArea">
        <div id="videoArea">
         <div id="recordTitle"> <h1> PRACTICE THE INTERVIEW </h1></div>

            <video ref={videoRef} autoPlay style={Styles.Video} id="videoScreen"></video>
        </div>
        <div id="btnArea">
                  <button id="videoPlayBtn" onClick={startOrStop}>{playing ? '화면 중지' : '화면 시작'}</button>
                  { listening
                  ? <button id="audioRecBtn" onClick={SpeechRecognition.stopListening}>녹음 종료</button>
                  :
                  <button id="audioRecBtn" onClick={() => SpeechRecognition.startListening({continuous: true, language: 'ko'})}>녹음 시작</button>
                   }
                  <button id="checkResultBtn" onClick={checkResult}>결과 확인</button>

                </div>

      </div>

    </div>
  );
};

export default AudioRecord;