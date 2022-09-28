const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Irls = new Schema({
  x: { type: Number },
  y: { type: Number },
  name: { type: String },
});

const Words = new Schema({
  text: { type: String },
  value: { type: Number },
});

const resultSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  video: {
    type: Schema.Types.ObjectId,
    ref: "Video",
  },
  word: { type: [Words], default: undefined },
  left_eye: { type: [Irls], default: undefined },
  right_eye: { type: [Irls], default: undefined },
  angryvalue: {
    type: Number,
    default: undefined,
  },
  happyvalue: {
    type: Number,
    default: undefined,
  },
  disgustedvalue: {
    type: Number,
    default: undefined,
  },
  neutralvalue: {
    type: Number,
    default: undefined,
  },
  sadvalue: {
    type: Number,
    default: undefined,
  },
  surprisedvalue: {
    type: Number,
    default: undefined,
  },
  fearfulvalue: {
    type: Number,
    default: undefined,
  },
  question: {
    type: String,
    default: undefined,
  },
  category: {
    type: String,
    default: undefined,
  },
  fileurl: {
    type: String,
    default: undefined,
  },
  date: {
    type: String,
    default: undefined,
  },
});

// Result 모델 객체 생성
const Result = mongoose.model("Result", resultSchema);
// index.js 파일에서 사용할 수 있도록 export
module.exports = Result;
