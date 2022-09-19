const express = require("express");
const video = require("./controller.js");
const videoRouter = express.Router();

videoRouter.post("/uploadfiles", video.uploadfiles);
videoRouter.post("/thumbnail", video.thumbnail);

module.exports = videoRouter;
