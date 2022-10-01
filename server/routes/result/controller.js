const Result = require("../../models/result"); // result 모델

// DB에 저장
const postresult = (req, res) => {
  console.log("postresult");
  const result = new Result(req.body);

  //mongodb 메소드로 저장
  result.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true });
  });
};

// DB에서 가져오기
const getresult = (req, res) => {
  console.log("getresult");

  // 비디오 관련 정보 가져오기
  Result.find({ video: req.params.videoid })
    .populate("video") //populate를 해줘야 video관련 데이터를 가져올수 있다. 안하면 id만 가져옴
    .exec((err, result) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, result });
    });
};

module.exports = {
  postresult,
  getresult,
};
