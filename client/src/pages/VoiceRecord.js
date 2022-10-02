import React from "react";
import { Component, useRef, useState } from "react";
import {  BrowserRouter, useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { useSelector } from "react-redux";

import "../styles/VoiceRecord.css";

// react wordcloud
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

// tensorflow library (iris)
import * as tf from "@tensorflow/tfjs-core";
import "@tensorflow/tfjs-backend-webgl";
import * as blazeface from "@tensorflow-models/blazeface";
import * as faceDetection from "@tensorflow-models/face-detection";

// react face-api.js
// import * as faceapi from "face-api.js";
import * as faceapi from "@vladmandic/face-api";

import getBlobDuration from "get-blob-duration";

// video, thumbnail
let file_url;
let thumbnail_url;
let file_duration;
let filenameset;
let video_id;
let todayDate;

const words = [];

// 홍채 인식
const g_var = {};
let detector;
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

let videoMediaStream = null;
let videoRecorder = null;
let recordedVideoURL = null;
let videoBlob = null;

const AudioRecord = () => {
  const username = useSelector((state) => state.User.name);
  const userid = useSelector((state) => state.User.id);

  // 면접 진행할 질문
  const location = useLocation();
  const select_question = location.state.question;
  const select_category = location.state.category;

  const navigate = useNavigate();
  const [playing, setPlaying] = useState(true);
  const [timer, setTimer] = useState(undefined);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const canvasRef_thumbnail = useRef(null);

  // 목소리 분석 사용 변수
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();
  const hi = React.useRef();
  const [audioResult1] = useState([]);
  const [audioResult2] = useState([]);
  var [firstTime, setFirstTime] = useState(0);
  var lastTime = useState(0);
  var [duration, setDuration] = useState(0);
  var max1 = useState();
  var max2 = useState();

  const { transcript, listening } = useSpeechRecognition();

  const a = transcript.split(" ");
  const [name, setName] = useState();

  // const [videoBtn, setVideoBtn] = useState("화면 보기");
  // const [onVideo, setOnVideo] = useState(true);

  // css
  const Styles = {
    // video css
    Video: {
      width: "300",
      height: "350",
      background: "rgba(245, 240, 215, 0.5)",
    },
    // canvas css
    Canvas: {
      width: "30vw",
      background: "rgba(0,0,0,0)",
      border: "1px solid green",
    },
    None: { display: "none" },
  };

  // 웹캠 띄우기
  const getWebcam = (callback) => {
    videoRef && loadModels(); // 웹캠 출력 시 videoref 및 표정인식 모델 불러오기
    try {
      const constraints = {
        video: true,
      };
      navigator.mediaDevices.getUserMedia(constraints).then(callback);
    } catch (err) {
      console.log(err);
      return undefined;
    }
  };

  // 표정 인식 모델 초기화
  const loadModels = () => {
    Promise.all([
      faceapi.nets.tinyFaceDetector.loadFromUri("/models"),
      faceapi.nets.faceLandmark68Net.loadFromUri("/models"),
      faceapi.nets.faceRecognitionNet.loadFromUri("/models"),
      faceapi.nets.faceExpressionNet.loadFromUri("/models"),
    ]).then(() => {
      // faceDetection();
    });
  };

  // 모델 초기화
  // 아래와 같은 useEffect 구문은 componentDidMount()와 같아서 단 최초 1회만 실행 됨
  React.useEffect(() => {
    const initFD = async () => {
      // tf.setBackend()와 blazeface.load()를 await를 사용해서 순차적으로 호출
      // require("@tensorflow/tfjs-node");
      // var tf = require("@tensorflow/tfjs");
      // tf.setBackend("tensorflow");
      await tf.setBackend("webgl");

      // 전역 변수 g_var.model에 초기화된 모델을 저장
      g_var.model = await blazeface.load();

      // 웹 캠 열기
      getWebcam((stream) => {
        videoRef.current.srcObject = stream;
        videoMediaStream = stream;
      });

      createDetector();
    };
    initFD();
  }, []);

  const createDetector = async () => {
    const model = faceDetection.SupportedModels.MediaPipeFaceDetector;
    const detectorConfig = {
      runtime: "tfjs", // or 'tfjs'
    };
    detector = await faceDetection.createDetector(model, detectorConfig);
  };

  // 비디오 재생되는 동안 홍채 좌표 저장하는 함수
  const drawToIris = async () => {
    try {
      const ctx = canvasRef.current.getContext("2d");

      // canvas의 넓이/높이를 입력 비디오 넓이/높이에 맞추는 과정
      canvasRef.current.width = videoRef.current.videoWidth;
      canvasRef.current.height = videoRef.current.videoHeight;

      if (ctx && ctx !== null) {
        if (videoRef.current) {
          // 화면을 좌우 대칭으로 그리기
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);

          // drawImage(입력, 시작점 x좌표, 시작점 y좌표, 넓이, 높이)
          // 입력 비디오 사이즈와 같아진 canvas 넓이/높이만큼 그려주기
          ctx.drawImage(
            videoRef.current,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height
          );
          ctx.setTransform(1, 0, 0, 1, 0, 0);
        }

        // const preds = await await g_var.model.estimateFaces(canvasRef.current, false);
        const faces = await detector.estimateFaces(canvasRef.current);

        left_eye_list.push(faces[0].keypoints[0]);
        right_eye_list.push(faces[0].keypoints[1]);
      }
    } catch (err) {
      console.log(err);
    }
  };

  // 표정 인식 함수
  const EmotionDetection = async () => {
    const detections = await faceapi
      .detectAllFaces(videoRef.current, new faceapi.TinyFaceDetectorOptions())
      .withFaceLandmarks()
      .withFaceExpressions();
    // console.log(detections[0].expressions);

    angry += detections[0].expressions.angry;
    disgusted += detections[0].expressions.disgusted;
    fearful += detections[0].expressions.fearful;
    happy += detections[0].expressions.happy;
    neutral += detections[0].expressions.neutral;
    sad += detections[0].expressions.sad;
    surprised += detections[0].expressions.surprised;

    canvasRef.current.innerHtml = faceapi.createCanvasFromMedia(
      videoRef.current
    );
    faceapi.matchDimensions(canvasRef.current, {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    });

    const resizedResults = faceapi.resizeResults(detections, {
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    });

    faceapi.draw.drawDetections(canvasRef.current, resizedResults); //얼굴네모출력
    // faceapi.draw.drawFaceLandmarks(canvasRef.current, resizedResults) //얼굴라인출력
    faceapi.draw.drawFaceExpressions(canvasRef.current, resizedResults); //감정출력
  };

  const recognitions = () => {
    drawToIris();
    EmotionDetection();
  };

  // 반복적으로 그려주는 함수
  // setTimeout(expired(),TIME) : TIME 시간이 지난 뒤 expired()를 호출
  // setInterval(expired(),TIME) : TIME 간격으로, expired()를 반복 호출
  const startOrStop = () => {
    if (!timer) {
      const t = setInterval(() => recognitions(), 200);
      setTimer(t);
    } else {
      clearInterval(timer);
      setTimer(undefined);
    }
  };

  const checkResult = () => {
    // wordcloud code
    words.push({ text: "hi", value: 1 });

    // 음성 분석별 최대값 구해두기
    max1 = Math.max.apply(Math, audioResult1); //목소리 크기
    max2 = Math.max.apply(Math, audioResult2); //목소리 높낮이

    // 표정인식 결과 퍼센트계산
    sum = angry + happy + disgusted + neutral + sad + surprised + fearful;

    angry = (angry / sum) * 100;
    happy = (happy / sum) * 100;
    disgusted = (disgusted / sum) * 100;
    neutral = (neutral / sum) * 100;
    sad = (sad / sum) * 100;
    surprised = (surprised / sum) * 100;
    fearful = (fearful / sum) * 100;

    //동작 여부를 보기 위해 값을 넣어놓음
    for (let i = 0; i < a.length; i++) {
      if (words.findIndex((v) => v.text === a[i]) !== -1) {
        words[words.findIndex((v) => v.text === a[i])].value++;
      } else {
        words.push({ text: a[i], value: 1 });
      }
    }
    setName("hi");

    if (playing) {
      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
        setPlaying(false);
        track.stop();
      });
    }

    todayDate = filenameset.split("_");

    navigate("/result", {
      state: {
        word: words,

        left_eye: left_eye_list,
        right_eye: right_eye_list,

        angryvalue: angry,
        happyvalue: happy,
        disgustedvalue: disgusted,
        neutralvalue: neutral,
        sadvalue: sad,
        surprisedvalue: surprised,
        fearfulvalue: fearful,

        question: select_question,
        category: select_category,

        fileurl: "http://localhost:5001/" + file_url,

        date: todayDate[0],

        audioResult1:audioResult1,
        audioResult2:audioResult2,
        max1:max1,
        max2:max2,
        duration:duration,

        script: transcript,
      },
    });
  };

  // 음성 녹음 함수
  const onRecAudio = async () => {
    let now = new Date();
    setFirstTime(
      now.getHours() * 3600 + now.getMinutes() * 60 + now.getSeconds()
    );
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)(); //audiocontext 객체 생성
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);

    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보
      const source = audioCtx.createMediaStreamSource(stream); //sourcenode초기화(마이크소리)
      setSource(source);
      source.connect(analyser); //sourcenode를 analyzer로 연결
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    await navigator.mediaDevices
      .getUserMedia({ audio: true })
      .then((stream) => {
        const mediaRecorder = new MediaRecorder(stream);
        mediaRecorder.start();
        setStream(stream);
        setMedia(mediaRecorder);
        makeSound(stream);

        // stt 함수
        SpeechRecognition.startListening({
          continuous: true,
          language: "ko",
        });

        analyser.onaudioprocess = function (e) {
          //목소리 크기 분석을 위한 filteredData
          const filteredData: number[] = []; // 데이터 filter 해서 저장하는 배열

          const buffer = e.inputBuffer.getChannelData(0); //첫번째 채널의 audiobuffer
          const blockSize = Math.floor(48000 / 100); //샘플링 구간의 사이즈 (48개의 구간을 나눠서 각 구간의 평균값 구하는과정)
          let blockSum = 0;
          const blockStart = blockSize; //샘플 구간 시작 포인트

          for (let j = 0; j < blockSize; j++) {
            blockSum = blockSum + Math.abs(buffer[blockStart + j]);
          }
          filteredData.push(blockSum / blockSize); //구간 평균치를 결과 배열에 추가
          //console.log(blockSum / blockSize);

          const normalizeData = async (filteredData: number[]) => {
            //샘플링 데이터 정규화
            const peak = Math.max(...filteredData); //샘플링데이터 최대값을 peak에 저장
            const multiplier = Math.pow(peak, -1); //정규화
            return filteredData.map(async (n) => n * multiplier);
          };

          for (let i = 0; i < filteredData.length; i++) {
            filteredData[i]*=10;
            audioResult1.push(filteredData[i]);
          }


          // 목소리 높낮이 분석을 위한 filteredData2
          const filteredData2: number[] = []; // 데이터 filter 해서 저장하는 배열

          const buffer2 = e.inputBuffer.getChannelData(0); //첫번째 채널의 audiobuffer
          const blockSize2 = Math.floor(48000 / 1000); //샘플링 구간의 사이즈 (48개의 구간을 나눠서 각 구간의 평균값 구하는과정)
          let blockSum2 = 0;
          const blockStart2 = blockSize2; //샘플 구간 시작 포인트

          for (let j = 0; j < blockSize2; j++) {
            blockSum2 = blockSum2 + Math.abs(buffer2[blockStart2 + j]);
          }
          filteredData2.push(blockSum2 / blockSize2); //구간 평균치를 결과 배열에 추가

          const normalizeData2 = async (filteredData2: number[]) => {
            //샘플링 데이터 정규화
            const peak2 = Math.max(...filteredData2); //샘플링데이터 최대값을 peak에 저장
            const multiplier2 = Math.pow(peak2, -1); //정규화
            return filteredData2.map(async (n) => n * multiplier2);
          };

          for (let i = 0; i < filteredData2.length; i++) {
            audioResult2.push(filteredData2[i]);
          }

          // 3분(180초) 지나면 자동으로 음성 저장 및 녹음 중지
          if (e.playbackTime > 180) {
            stream.getAudioTracks().forEach(function (track) {
              track.stop();
            });
            mediaRecorder.stop();
            // 메서드가 호출 된 노드 연결 해제
            analyser.disconnect();
            audioCtx.createMediaStreamSource(stream).disconnect();

            mediaRecorder.ondataavailable = function (e) {
              setAudioUrl(e.data);
              setOnRec(true);
            };
          } else {
            setOnRec(false);
          }
        };
      });
  };

  // 사용자가 음성 녹음을 중지했을 때
  const offRecAudio = () => {
    let now1 = new Date();
    lastTime =
      now1.getHours() * 3600 + now1.getMinutes() * 60 + now1.getSeconds();
    //duration = parseInt(lastTime) - parseInt(firstTime);
    setDuration(parseInt(lastTime) - parseInt(firstTime));
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    media.ondataavailable = function (e) {
      setAudioUrl(e.data);
      setOnRec(true);
    };

    // 모든 트랙에서 stop()을 호출해 오디오 스트림을 정지
    stream.getAudioTracks().forEach(function (track) {
      track.stop();
    });

    // 미디어 캡처 중지
    media.stop();
    // 메서드가 호출 된 노드 연결 해제
    analyser.disconnect();
    source.disconnect();
    SpeechRecognition.stopListening();
  };


  // 녹화 시작
  const VideoCaptureStart = () => {
    if (navigator.mediaDevices.getUserMedia) {
      console.log("video capture start");
      let videoData = [];

      // 1) MediaStream을 매개변수로 MediaRecorder 생성자를 호출
      videoRecorder = new MediaRecorder(videoMediaStream, {
        mimeType: "video/webm; codecs=vp9",
      });

      // 2) 전달받는 데이터를 처리하는 이벤트 핸들러 등록
      videoRecorder.ondataavailable = (event) => {
        if (event.data?.size > 0) {
          videoData.push(event.data);
        }
      };

      // 3) 녹화 중지 이벤트 핸들러 등록
      videoRecorder.onstop = () => {
        videoBlob = new Blob(videoData, { type: "video/webm" });
        recordedVideoURL = window.URL.createObjectURL(videoBlob);

        getBlobDuration(recordedVideoURL).then(function (duration) {
          file_duration = duration;

          // URL 삭제
          URL.revokeObjectURL(videoBlob);

          // 이벤트 실행 시에 서버로 파일 POST
          sendAvi(videoBlob);
          console.log("video capture end");
        });

        // 다운로드 받기
        // if (recordedVideoURL) {
        //   const link = document.createElement("a");
        //   document.body.appendChild(link);
        //   // 녹화된 영상의 URL을 href 속성으로 설정
        //   link.href = recordedVideoURL;
        //   // 저장할 파일명 설정
        //   link.download = "video.webm";
        //   link.click();
        //   document.body.removeChild(link);
        // }
      };

      // 4) 녹화 시작
      videoRecorder.start();
    }
  };

  // 녹화 중지
  const VideoCaptureEnd = () => {
    if (videoRecorder) {
      // 5) 녹화 중지
      videoRecorder.stop();
      videoRecorder = null;
    }
  };

  // 서버로 전송
  const sendAvi = (blob) => {
    console.log("sendAvi");
    if (blob == null) return;

    const config = { header: { "content-type": "multipart/form-data" } };
    filenameset = `${todayFormal()}_${username}`;
    let filename = filenameset + ".webm";
    const file = new File([blob], filename);

    let formdata = new FormData();

    formdata.append("fname", filename); // 파일 이름 추가
    formdata.append("file", file); // 파일 추가

    axios
      .post("http://localhost:5001/video/uploadfiles", formdata, config)
      .then((res) => {
        if (res.data.success) {
          file_url = res.data.url;

          //thumbnail_Image Send Server
          const thumbnail = document.getElementById("thumbnailCanvas");
          const imgBase64 = thumbnail.toDataURL(
            "image/jpeg",
            "image/octet-stream"
          );

          const decodImg = atob(imgBase64.split(",")[1]);

          let thumbnailData = [];
          for (let i = 0; i < decodImg.length; i++) {
            thumbnailData.push(decodImg.charCodeAt(i));
          }

          const thumbnail_file = new Blob([
            new Uint8Array(thumbnailData),
            { type: "image/jpeg" },
          ]);
          const thumbnail_fileName = filenameset + ".jpeg";
          let thumbnail_formData = new FormData();
          thumbnail_formData.append("file", thumbnail_file, thumbnail_fileName);

          axios
            .post("http://localhost:5001/video/thumbnail", thumbnail_formData)
            .then((res) => {
              if (res.data.success) {
                thumbnail_url = res.data.url;

                // DB에 저장
                SaveDB();
              } else {
                console.log("실패");
              }
            });
        } else {
          console.log("실패");
        }
      });
  };

  // 결과 페이지에 띄울 썸네일 이미지 캡쳐
  const capture_thumbnail = () => {
    console.log("thumnail capture");
    const thumbnail = canvasRef_thumbnail.current.getContext("2d");

    // canvas의 넓이/높이를 입력 비디오 넓이/높이에 맞추는 과정
    canvasRef_thumbnail.current.width = videoRef.current.videoWidth;
    canvasRef_thumbnail.current.height = videoRef.current.videoHeight;

    if (thumbnail && thumbnail !== null) {
      if (videoRef.current) {
        // 화면을 좌우 대칭으로 그리기
        thumbnail.translate(canvasRef_thumbnail.current.width, 0);
        thumbnail.scale(-1, 1);

        // drawImage(입력, 시작점 x좌표, 시작점 y좌표, 넓이, 높이)
        // 입력 비디오 사이즈와 같아진 canvas 넓이/높이만큼 그려주기
        thumbnail.drawImage(
          videoRef.current,
          0,
          0,
          canvasRef_thumbnail.current.width,
          canvasRef_thumbnail.current.height
        );
        thumbnail.setTransform(1, 0, 0, 1, 0, 0);
      }
    }
  };

  const SaveDB = () => {
    console.log(file_duration);
    const variable = {
      //  state에서 id 를 가지고 있기 때문에 리덕스를 통해서 가져오면 된다.
      user: userid,
      title: `${filenameset}_${select_question}`,
      filePath: file_url,
      question: select_question,
      category: select_category,
      duration: file_duration,
      thumbnail: thumbnail_url,
    };

    axios.post("http://localhost:5001/video/uploaddb", variable).then((res) => {
      if (res.data.success) {
        video_id = res.data.objectid;
      } else {
        alert("비디오 업로드에 실패 했습니다. ");
      }
    });
  };

  const SaveResult = () => {
    const variable = {
      //  state에서 id 를 가지고 있기 때문에 리덕스를 통해서 가져오면 된다.
      user: userid,
      video: video_id,
      word: words,
      left_eye: left_eye_list,
      right_eye: right_eye_list,
      angryvalue: angry,
      happyvalue: happy,
      disgustedvalue: disgusted,
      neutralvalue: neutral,
      sadvalue: sad,
      surprisedvalue: surprised,
      fearfulvalue: fearful,
      question: select_question,
      category: select_category,
      fileurl: "http://localhost:5001/" + file_url,
      date: todayDate[0],
    };
    axios.post("http://localhost:5001/result/post", variable).then((res) => {
      if (res.data.success) {
        console.log(res.data);
      } else {
        console.log(res.err);
      }
    });
  };

  // 현재 날짜 구하기 (년/월/일)
  const todayFormal = () => {
    let now = new Date();
    let todayYear = now.getFullYear();
    let todayMonth =
      now.getMonth() + 1 > 9 ? now.getMonth() + 1 : "0" + (now.getMonth() + 1);
    let todayDate = now.getDate() > 9 ? now.getDate() : "0" + now.getDate();
    let hours = now.getHours() > 9 ? now.getHours() : "0" + now.getHours();
    let minutes =
      now.getMinutes() > 9 ? now.getMinutes() : "0" + now.getMinutes();
    let seconds =
      now.getSeconds() > 9 ? now.getSeconds() : "0" + now.getSeconds(); // 초
    return todayYear + todayMonth + todayDate + "_" + hours + minutes + seconds;
  };

  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundImage: "url(./background-img.jpg)",
        backgroundRepeat: "no-repeat",
      }}
    >
      <div id="recordArea">
        <div id="videoArea">
          <div id="recordTitle">
            {" "}
            <h1> {select_question} </h1>
          </div>

          <video
            ref={videoRef}
            autoPlay
            style={Styles.Video}
            id="videoScreen"
          ></video>
        </div>
        <div id="btnArea">
          {/* <button
            id="videoPlayBtn"
            onClick={() => {
              startOrStop();
            }}
          >
            {timer ? "화면 중지" : "화면 시작"}
          </button> */}
          {listening ? (
            <button
              id="audioRecBtn_stop"
              onClick={() => {
                SpeechRecognition.stopListening();
                startOrStop();
                VideoCaptureEnd();
                offRecAudio();
              }}
            >
              녹음 종료
            </button>
          ) : (
            <button
              id="audioRecBtn_start"
              onClick={() => {
                SpeechRecognition.startListening({
                  continuous: true,
                  language: "ko",
                });
                startOrStop();
                VideoCaptureStart();
                capture_thumbnail();
                onRecAudio();
              }}
            >
              녹음 시작
            </button>
          )}
          <button
            id="checkResultBtn"
            onClick={() => {
              checkResult();
              SaveResult();
            }}
          >
            결과 확인
          </button>
        </div>
        <div style={{ display: "none" }}>
          {" "}
          <canvas ref={canvasRef} style={Styles.Canvas} />
        </div>
        <div style={{ display: "none" }}>
          {" "}
          <canvas
            id="thumbnailCanvas"
            ref={canvasRef_thumbnail}
            style={Styles.Canvas}
          />
        </div>
      </div>
    </div>
  );
};

export default AudioRecord;
