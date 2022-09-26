const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const videoSchema = mongoose.Schema({
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  title: {
    type: String,
    default: undefined,
  },
  filePath: {
    type: String,
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
  duration: {
    type: String,
    default: undefined,
  },
  thumbnail: {
    type: String,
    default: undefined,
  },
});

// Video 모델 객체 생성
const Video = mongoose.model("Video", videoSchema);
// index.js 파일에서 사용할 수 있도록 export
module.exports = Video;
