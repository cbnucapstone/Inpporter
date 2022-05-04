const mongoose= require('mongoose')
// const bcrypt = require('bcrypt')

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
    }
})

// User이라는 모델 객체 생성
const User = mongoose.model('User',userSchema)

// // 비밀번호 암호화
// const saltRounds = 10

// userSchema.methods.encryptPassword = function(cb){
//     let user = this;
//     // bcrypt로 암호화할 수 있는 salt 생성
//     bcrypt.genSalt(saltRounds,function(err,salt){
//         if(err) return cb(err);
//         // 생성한 salt를 이용해 암호화된 hash 생성
//         bcrypt.hash(user.password,salt,function(err,hash){
//             if(err) return Next(err);
//             user.password = hash;
//             cb();
//         })
//     })
// }

// // 유저가 입력한 패스워드와 데이터베이스의 패스워들르 비교한 후 true/flase를 콜백함수로 넘겨줌
// userSchema.methods.comparePassword = function(plainpassword,cb){
//     bcrypt.compare(plainpassword, this.password, function(err, isMatch){
//         if(err) return cb(err);
//         cb(null, isMatch);
//     })
// }

// // 토큰 생성
// const jwt = require('jsonwebtoken');

// userSchema.methods.generateToken = function(cb){
//     let user = this;
//     let token = jwt.sign(user._id.toHexString(),'secretToken');
//     user.token = token;
//     user.save(function(err,user){
//         if(err) return cb(err);
//         cb(null, user);
//     });
// };

// // token을 이용해 유저 검색
// userSchema.statics.findByToken = function(token,cb){
//     let user = this;
//     jwt.verify(token, 'secretToken', function(err,decoded){
//         if(err) return cb(err);
//         user.findOne({"_id":decoded,"token":token},function(err,user){
//             if(err) return cb(err);
//             cb(null,user);
//         });
//     });
// };

// index.js 파일에서 사용할 수 있도록 export
module.exports = User;