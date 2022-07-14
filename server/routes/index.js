const express = require('express');
const authRouter = require('./auth');
const router = express.Router();
const dataRouter = require('./data');
const questionRouter = require('./question');

router.use("/auth",authRouter);
router.use("/data",dataRouter);
router.use("/question",questionRouter);

module.exports = router;




