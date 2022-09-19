const multer = require("multer"); // video 저장을 위한 multer
const ffmpeg = require("fluent-ffmpeg"); //썸네일 가져오기 위해서 ffmpeg

let storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //파일이 넘어오면 uploads라는 폴더에 저장(어디에 저장할지 설정
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    // 저장할때 이름 지정(client에서 넘어온 파일이름)
    cb(null, `${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    // mp4만 받을 수 있도록 지정, 여러개 받고 싶으면 || 'png'설정 가능
    const ext = path.extname(file.originalname);
    if (ext !== ".mp4" || ext !== ".webm") {
      return cb(res.status(400).end("only mp4, webm are allowed"), false);
    }
    cb(null, true);
  },
});

//파일을 하나만 업로드 할 수 있도록 설정, 파일을 변수에 저장
const upload = multer({ storage: storage }).single("file");

//=================================
//             Video
//=================================

//index.js파일에서 '/api/viedo'는 입력되어서 오기 때문에 뒷부분만 넣어줘도 된다.
const uploadfiles = (req, res) => {
  // 비디오를 서버에 저장한다.
  // npm install multer --save in Server directory(dependency다운로드)
  upload(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    //파일 업로드 경로, 파일 이름도 전송
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

//thumbnail 만들기
const thumbnail = (req, res) => {
  let filePath = "";
  let fileDuration = "";

  //비디오 러닝타임 가져오기(비디오정보)
  ffmpeg.ffprobe(req.body.url, function (err, metadata) {
    console.log("ffmpeg");
    console.dir(metadata.format);
    // console.log(metadata.format.duration);
    fileDuration = metadata.format.duration;
    console.log(fileDuration);
  });

  //썸네일 생성(비디오 저장경로를 넣으면 이 파일의 파일이름을 생성하고 그 다음에 무엇을 할 지 설정해준다.)
  //클라이언트 한테서 온 비디오 url
  ffmpeg(req.body.url)
    .on("filenames", function (filenames) {
      //썸네일 파일 이름 생성
      console.log("Will generate " + filenames.join(", "));
      console.log(filenames);

      filePath = "uploads/thumbnails/" + filenames[0];
    })
    .on("end", function () {
      console.log("Screenshots taken"); //썸네일 생성되면 뭐 할건지
      return res.json({
        success: true,
        url: filePath,
        fileDuration: fileDuration,
      }); //러닝타임도 준다.
    })
    .on("error", function (err) {
      console.error(err);
      return res.json({ success: false, err });
    })
    .screenshots({
      count: 3, //3개의 샷 찍기 가능
      folder: "uploads/thumbnails", //업로드 폴더안에 썸네일 저장될 것이다.
      size: "320x240", //썸네일 사이즈
      filename: "thumbnail-%b.png",
    });
};

module.exports = {
  uploadfiles,
  thumbnail,
};
