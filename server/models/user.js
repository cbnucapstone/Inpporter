const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
  id: {
    type: String,
  },
  password: {
    type: String,
  },
  name: {
    type: String,
  },
  nickname: {
    type: String,
  },
  email: {
    type: String,
  },
  phone: {
    type: String,
  },
});

// 비밀번호 암호화
const saltRounds = 10;

// 저장하기 전에 비밀번호 암호화
userSchema.pre("save", function (next) {
  var user = this;

  // salt를 이용해서 비밀번호 암호화한 후 보냄
  if (user.isModified("password")) {
    bcrypt.genSalt(saltRounds, function (err, salt) {
      if (err) return next(err);
      bcrypt.hash(user.password, salt, function (err, hash) {
        if (err) return next(err);
        user.password = hash;
        next();
      });
    });
  } else {
    next();
  }
});

// 유저가 입력한 패스워드와 데이터베이스의 패스워드를 비교한 후 true/flase를 콜백함수로 넘겨줌
userSchema.methods.comparePassword = function (plainpassword) {
  return bcrypt
    .compare(plainpassword, this.password)
    .then((isMatch) => isMatch)
    .catch((err) => err);
};

// User이라는 모델 객체 생성
const User = mongoose.model("User", userSchema);

// index.js 파일에서 사용할 수 있도록 export
module.exports = User;
