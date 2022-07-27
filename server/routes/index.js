const express = require('express');
const router = express.Router();
const authRouter = require('./auth');
const questionRouter = require('./question');

router.use("/auth",authRouter);
router.use("/question",questionRouter);

module.exports = router;




