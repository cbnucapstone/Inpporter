const Question = require("../../models/question");

//read(읽기)
const get = (req, res, next) => {
  Question.find({ userid: req.params.userid }, function (err, data) {
    try {
      if (!data) return res.json({ error: true });
      res.json({ list: data });
      next();
    } catch (err) {
      console.error(err);
      throw err;
    }
  });
  // console.log("되고있낭ㅇㅇ")
};

const getSelected = (req, res, next) => {
  Question.find(
    { userid: req.params.userid, selected: req.params.selected },
    function (err, data) {
      try {
        if (!data) return res.json({ error: true });
        res.json({ list: data });
        // next();
      } catch (err) {
        console.error(err);
        throw err;
      }
    }
  );
  // console.log("카테고리별로 띄우기 성공")
};

//write(작성)
const write = async (req, res) => {
  try {
    const question = new Question(req.body);
    await question.save(); //save로 디비에 저장
    // console.log("디비에 저장 성공");
  } catch (err) {
    console.log("디비 저장 실패");
    res.redirect("/question");
  }
};

//update(수정)
const update = async (req, res) => {
  // console.log("백단업뎃들어옴");
  // console.log(req.body);
  // console.log(req.body.id);
  try {
    const _id = req.body._id;
    const text = req.body.text;
    await Question.findByIdAndUpdate({ _id }, { $set: { _id: _id, text:text } });
  } catch (err) {
    console.log("수정 실패");
  }
};

//삭제
const Delete = (req, res) => {
  Question.findByIdAndRemove({ _id: req.params.id }, (err) => {
    if (err) {
      console.log("삭제 실패");
    }
    // console.log("삭제 성공!")
    res.status(204).end();
  });
};

module.exports = {
  get,
  getSelected,
  write,
  update,
  Delete,
};
