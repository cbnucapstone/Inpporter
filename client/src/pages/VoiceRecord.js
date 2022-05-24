import React, { useState, useCallback } from "react";
import '../styles/VoiceRecord.css';
import axios from "axios";


const AudioRecord = () => {
  const [stream, setStream] = useState();
  const [media, setMedia] = useState();
  const [onRec, setOnRec] = useState(true);
  const [onVideo, setOnVideo] = useState(true);
  const [playing, setPlaying] = useState();
  const [recBtn, setRecBtn] = useState("녹음 시작");
  const [videoBtn, setVideoBtn] = useState("화면 보기");
  const videoRef = React.useRef(null);
  const [source, setSource] = useState();
  const [analyser, setAnalyser] = useState();
  const [audioUrl, setAudioUrl] = useState();

 const onServerHandler=(event)=>{
        let body={
            server :"HI",
        };

        axios
        .post("http://localhost:5000/data/stt",body)
        .then((res)=>console.log(res));
        // });
    };


  const onRecAudio = () => {
    setRecBtn("녹음 중지");
    // 음원정보를 담은 노드를 생성하거나 음원을 실행또는 디코딩 시키는 일을 한다
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    // 자바스크립트를 통해 음원의 진행상태에 직접접근에 사용된다.
    const analyser = audioCtx.createScriptProcessor(0, 1, 1);
    setAnalyser(analyser);


    function makeSound(stream) {
      // 내 컴퓨터의 마이크나 다른 소스를 통해 발생한 오디오 스트림의 정보를 보여준다.
      const source = audioCtx.createMediaStreamSource(stream);
      setSource(source);
      source.connect(analyser);
      analyser.connect(audioCtx.destination);
    }
    // 마이크 사용 권한 획득
    navigator.mediaDevices.getUserMedia({ audio: true}).then((stream) => {
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorder.start();
      setStream(stream);
      setMedia(mediaRecorder);
      makeSound(stream);

      analyser.onaudioprocess = function (e) {
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
    // dataavailable 이벤트로 Blob 데이터에 대한 응답을 받을 수 있음
    setRecBtn("녹음 시작");
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
  };

  const onSubmitAudioFile = useCallback(() => {
    if (audioUrl) {
      console.log(URL.createObjectURL(audioUrl)); // 출력된 링크에서 녹음된 오디오 확인 가능
    }
    // File 생성자를 사용해 파일로 변환
    const sound = new File([audioUrl], "soundBlob", { lastModified: new Date().getTime(), type: "audio" });
    console.log(sound); // File 정보 출력
  }, [audioUrl]);


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
    getWebcam((stream => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    }));
  }, []);



const Styles = {
  Video: {width: "80%", height: "85%", background: 'rgba(245, 240, 215, 0.5)' },
  None: { display: 'none' },
}

const TestOverlay = () => {

  const videoRef = React.useRef(null);

  React.useEffect(() => {
    getWebcam((stream => {
      setPlaying(true);
      videoRef.current.srcObject = stream;
    }));
  })
  };

  const startOrStop = () => {

    if (playing) {

      const s = videoRef.current.srcObject;
      s.getTracks().forEach((track) => {
      setPlaying(false);
        track.stop();
      });
    } else {
      getWebcam((stream => {

        setPlaying(true);
        videoRef.current.srcObject = stream;
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
                  <button id="audioRecBtn" onClick={onRec ? onRecAudio : offRecAudio}>{recBtn}</button>
                  <button id="checkResultBtn" onClick={onSubmitAudioFile}>결과 확인</button>
                  <button id="" onClick={onServerHandler}> HI</button>
                </div>

      </div>

    </div>
  );
};

export default AudioRecord;