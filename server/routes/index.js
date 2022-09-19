const express = require("express");
const router = express.Router();
const authRouter = require("./auth");
const questionRouter = require("./question");
const videoRouter = require("./video");

router.use("/auth", authRouter);
router.use("/question", questionRouter);
router.use("/video", videoRouter);

module.exports = router;
