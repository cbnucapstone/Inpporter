const multer = require("multer"); // video 저장을 위한 multer
const Video = require("../../models/video"); // video 모델

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

let thumbnail_storage = multer.diskStorage({
  destination: (req, file, cb) => {
    //파일이 넘어오면 uploads라는 폴더에 저장(어디에 저장할지 설정
    cb(null, "uploads/thumbnail");
  },
  filename: (req, file, cb) => {
    // 저장할때 이름 지정(client에서 넘어온 파일이름)
    cb(null, `${file.originalname}`);
  },
  fileFilter: (req, file, cb) => {
    // mp4만 받을 수 있도록 지정, 여러개 받고 싶으면 || 'png'설정 가능
    const ext = path.extname(file.originalname);
    if (ext !== ".jpeg" || ext !== ".png") {
      return cb(res.status(400).end("only jpeg, png are allowed"), false);
    }
    cb(null, true);
  },
});

//파일을 하나만 업로드 할 수 있도록 설정, 파일을 변수에 저장
const upload = multer({ storage: storage }).single("file");
const upload_thumbnail = multer({ storage: thumbnail_storage }).single("file");

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
  console.log("thumbnail server");

  upload_thumbnail(req, res, (err) => {
    if (err) {
      console.log(err);
      return res.json({ success: false, err });
    }
    return res.json({
      success: true,
      url: res.req.file.path,
      fileName: res.req.file.filename,
    });
  });
};

// DB에 저장
const uploaddb = (req, res) => {
  const video = new Video(req.body);

  //mongodb 메소드로 저장
  video.save((err, doc) => {
    if (err) {
      return res.json({ success: false, err });
    }
    res.status(200).json({ success: true, objectid: doc._id });
  });
};

// 비디오 리스트 가져와서 전송
const getvideo = (req, res) => {
  // 로그인한 사용자의 모든 비디오 가져오기
  Video.find({ user: req.params.userid })
    .populate("user") //populate를 해줘야 user관련 데이터를 가져올수 있다. 안하면 id만 가져옴
    .exec((err, videos) => {
      if (err) return res.status(400).send(err);
      res.status(200).json({ success: true, videos });
    });
};

module.exports = {
  uploadfiles,
  thumbnail,
  uploaddb,
  getvideo,
};
