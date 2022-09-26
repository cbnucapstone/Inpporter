import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Col, Row } from "antd";
import axios from "axios";
import "antd/dist/antd.css";
import "../styles/ResultList.css";

function ResultList() {
  const [Video, setVideo] = useState([]);
  const userid = useSelector((state) => state.User.id);

  useEffect(() => {
    axios
      .get(`http://localhost:5001/video/getvideo/${userid}`, userid)
      .then((res) => {
        if (res.data.success) {
          console.log("성공");
          console.log(res.data);
          setVideo(res.data.videos);
        } else {
          alert("비디오 가져오기를 실패했습니다.");
        }
      });
  }, []);

  const renderCards = Video.map((video, index) => {
    var minutes = Math.floor(video.duration / 60);
    var seconds = Math.floor(video.duration - minutes * 60);

    var temp = video.title.split("_");
    var year = temp[0].substring(0, 4);
    var month = temp[0].substring(4, 6);
    var day = temp[0].substring(6);

    var hour = temp[1].substring(0, 2);
    var minute = temp[1].substring(2, 4);
    var second = temp[1].substring(4);

    return (
      <Col lg={6} xs={12} className="col">
        <a href={`http://localhost:5001/video/post/${video._id}`}>
          <div style={{ position: "relative" }} className="thumbnail-image">
            <img
              style={{ width: "100%" }}
              src={`http://localhost:5001/${video.thumbnail}`}
            ></img>
            <div className="duration">
              <span>
                {minutes < 10 ? "0" + minutes : minutes}:
                {seconds < 10 ? "0" + seconds : seconds}
              </span>
            </div>
          </div>
        </a>
        <div className="profile">
          <div className="category">
            <span>{video.category}</span>
          </div>
          <div className="date">
            <span>
              {year}년 {month}월 {day}일 {hour}시 {minute}분
            </span>
          </div>
        </div>
        <div className="question">
          <span>{video.question}</span>
        </div>
      </Col>
    );
  });

  return (
    <div className="resultListPage">
      <div id="resultListPage_title">
        <h1>면접 분석 결과 리스트</h1>
      </div>
      <Row gutter={32}>{renderCards}</Row>
    </div>
  );
}

export default ResultList;
