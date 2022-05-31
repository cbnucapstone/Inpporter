const mongoose = require('mongoose')

const questionSchema = mongoose.Schema({
    userid:{
        type:String,
        // required:true
    },
    selected:{
        type:String,
        default:undefined,
    },
    text:{
        type:String,
        default:undefined,
    }
});

// Question 모델 객체 생성
const Question = mongoose.model('Question',questionSchema);
// index.js 파일에서 사용할 수 있도록 export
module.exports = Question;