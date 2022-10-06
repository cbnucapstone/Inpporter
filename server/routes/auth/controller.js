const { use } = require(".");
const User = require("../../models/user");
const Question = require("../../models/question");

const register = (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) {
      console.log(err);
      return res.status(200).json({ success: false, err });
    }

    let arr = [
      {
        userid: userInfo._id.toString(),
        selected: "역량",
        text: "지원한 직무 관련 경험을 말해주세요",
      },
      {
        userid: userInfo._id.toString(),
        selected: "역량",
        text: "본인을 뽑아야 하는 이유는 무엇인지 설명해주세요",
      },
      {
        userid: userInfo._id.toString(),
        selected: "역량",
        text: "지원한 직무 관련한 최근 이슈에 대해 말해주세요",
      },
      {
        userid: userInfo._id.toString(),
        selected: "지원동기",
        text: "회사에 지원하게 된 동기는 무엇인가요?",
      },
      {
        userid: userInfo._id.toString(),
        selected: "지원동기",
        text: "평상 시 우리 회사에 대해 어떻게 생각하고 있나요?",
      },
      {
        userid: userInfo._id.toString(),
        selected: "지원동기",
        text: "해당 직무를 꿈꾸게 된 이유는 무엇인가요?",
      },
      {
        userid: userInfo._id.toString(),
        selected: "직무",
        text: "지원한 직무는 어떤 업무라고 생각하나요",
      },
      {
        userid: userInfo._id.toString(),
        selected: "직무",
        text: "지원한 직무로 입사하기 위해 그동안 어떻게 준비를 하였나요",
      },
      {
        userid: userInfo._id.toString(),
        selected: "직무",
        text: "이 직무로 입사한다면 단기적 목표 및 장기적 목표는 무엇인가요?",
      },
      {
        userid: userInfo._id.toString(),
        selected: "기초인성",
        text: "프로젝트 등을 진행하며 겪은 어려운 점과 해결 방법에 대해 말해주세요",
      },
      {
        userid: userInfo._id.toString(),
        selected: "기초인성",
        text: "살면서 가장 힘들었던 일은 무엇인가요?",
      },
      {
        userid: userInfo._id.toString(),
        selected: "기초인성",
        text: "본인의 장단점은 무엇인가요?",
      },
    ];

    Question.insertMany(arr, function (error, docs) {
      if (error) {
        console.log(err);
        return res.status(200).json({ success: false, err });
      }
    });
    return res.status(200).json({ success: true });
  });
};

const login = (req, res) => {
  User.findOne({ id: req.body.id }, (err, user) => {
    //DB에서 일치하는 id찾기
    if (user == null) {
      // user가 존재하지 않으면 일치하는 id가 없는것
      return res.json({
        success: false,
        msg: "id not find",
      });
    } else {
      // 비밀번호 비교
      user
        .comparePassword(req.body.pw)
        .then((isMatch) => {
          if (!isMatch) {
            // id는 일치, pw 불일치
            return res.json({
              success: false,
              msg: "pw not correct",
            });
          }

          // 비밀번호까지 일치한다면, jwt 토큰 생성 메소드 생성
          return res.json({ success: true, userId: user._id, name: user.name });
          // user
          // .generateToken()
          // .then((user)=>{
          //     // 토큰을 쿠키, localStorage에 저장
          //     res
          //     .cookie("x_auth",user.token)
          //     .status(200)
          //     .json({success:true,userId:user._id});
          // })
          // .catch((err)=>{
          //     res.status(400).send(err);
          // });
        })
        .catch((err) => res.json({ loginSuccess: false, err }));
    }
  });
};

module.exports = {
  register,
  login,
};
