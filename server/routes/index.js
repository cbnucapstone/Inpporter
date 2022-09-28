const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const questionRouter = require("./question");
const videoRouter = require("./video");
const resultRouter = require("./result");

router.use("/auth", authRouter);
router.use("/question", questionRouter);
router.use("/video", videoRouter);
router.use("/result", resultRouter);

module.exports = router;
