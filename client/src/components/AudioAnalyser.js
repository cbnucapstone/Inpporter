import React, { Component } from 'react';
// import WaveCanvas from "waveform-react";
import { useNavigate } from "react-router-dom";

let a = [];

class AudioAnalyser extends Component {

    childFunction = () => {
    // 부모에게 소리 크기 데이터를 전달하는 함수
        this.props.parentFunction(this.state.audioData);
    }

    componentDidMount() {
    //마이크가 켜졌을 때, audioContext와, 분석노드(analyser - 크기 분석 작업), 소스노드(source, 음원 입력) 연결
        this.audioContext = new (window.AudioContext ||
        window.webkitAudioContext)();
        this.analyser = this.audioContext.createAnalyser();
        this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
        this.source = this.audioContext.createMediaStreamSource(this.props.audio);
        this.source.connect(this.analyser);
        this.rafId = requestAnimationFrame(this.tick);
    }

    tick() {
    //시간에 따른 소리 높낮이 데이터를 수집해 audioData에 대입
        this.analyser.getByteFrequencyData(this.dataArray);  // getFloatFrequencyData() : to capture frequency data,(주파수 데이터), getFloatTimeDomainData
        // this.analyser.getFloatTimeDomainData(this.dataArray2);
        this.setState({ audioData: this.dataArray }); 
        this.rafId = requestAnimationFrame(this.tick);
    }
    constructor(props) {
    //함수나 변수 선언하는 거 같은 부분...
        super(props);
        this.state = { audioData: new Uint8Array(0) };
        this.tick = this.tick.bind(this);
    }

     componentWillUnmount() {
     //마이크 해제시 노드간 연결 해제
        cancelAnimationFrame(this.rafId);
        //console.log(this.state.audioData); // 파형 데이터
        a = this.state.audioData;
        //console.log(a);
        this.analyser.disconnect();
        this.source.disconnect();
        this.childFunction();
      }

      render() {
          return(
          <div>
          <textarea value={this.state.audioData} />
          </div>
          )
          ;
        }
}

export default AudioAnalyser;