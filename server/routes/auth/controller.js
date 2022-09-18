const { use } = require(".");
const User = require("../../models/user");

const register = (req, res) => {
  const user = new User(req.body);

  user.save((err, userInfo) => {
    if (err) return res.status(200).json({ success: false, err });
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
