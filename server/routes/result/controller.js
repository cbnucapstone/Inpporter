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
};

module.exports = {
  postresult,
  getresult,
};
