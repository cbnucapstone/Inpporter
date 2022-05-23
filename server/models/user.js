const mongoose= require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema({
    id:{
        type:String,
    },
    password:{
        type:String,
    },
    name:{
        type:String,
    },
    nickname:{
        type:String,
    },
    // sex:{
    //     type:Boolean,
    // },
    email:{
        type:String,
    },
    phone:{
        type:String,
    },
    // role:{
    //     type:Number,
    //     default:0,
    // },
    token:{
        type:String,
    },
    tokenExp:{
        type:Number,
    },
});

// 비밀번호 암호화
const saltRounds = 10

// 저장하기 전에 비밀번호 암호화
userSchema.pre("save",function(next){
    var user = this;

    // salt를 이용해서 비밀번호 암호화한 후 보냄
    if(user.isModified('password')){
        bcrypt.genSalt(saltRounds,function(err,salt){
            if(err) return next(err);
            bcrypt.hash(user.password,salt,function(err,hash){
                if(err) return next(err);
                user.password = hash;
                next();
            })
        })
    } else{
        next()
    }
})

// 유저가 입력한 패스워드와 데이터베이스의 패스워드를 비교한 후 true/flase를 콜백함수로 넘겨줌
userSchema.methods.comparePassword = function(plainpassword){
    return bcrypt
    .compare(plainpassword, this.password)
    .then((isMatch)=>isMatch)
    .catch((err)=>err);
};

// 토큰 생성
userSchema.methods.generateToken = function(){
    // let user = this;
    // jwt.sign(변환할 토큰 이름, "임의로 지정한 복호화를 위한 변수")
    const token = jwt.sign(this._id.toHexString(),"secretToken");
    this.token = token;
    return this.save()
        .then((user)=>user)
        .catch((err)=>err);
};

// token을 이용해 유저 검색
userSchema.statics.findByToken = function(token){
    let user = this;
    // secretToken을 통해 user의 id값을 받아오고 해당 아이디를 통해
    // DB에 접근해서 유저의 정보를 가져온다

    // jwt.verify(토큰,"지정해둔특정문자")
    return jwt.verify(token,"secretToken",function(err,decoded){
        return user
        .findOne({_id:decoded,token:token})
        .then((user)=>user)
        .catch((err)=>err);
    });
};

// User이라는 모델 객체 생성
const User = mongoose.model('User',userSchema)

// index.js 파일에서 사용할 수 있도록 export
module.exports = User;