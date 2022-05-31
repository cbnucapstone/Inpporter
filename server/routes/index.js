const express = require('express');
const authRouter = require('./auth');
const router = express.Router();
const dataRouter = require('./data');
const questionRouter = require('./question');
const Q = require('./remove.js');

const question = require('../middleware/question');

router.use("/auth",authRouter);
router.use("/data",dataRouter);
router.use("/question",question,questionRouter);

router.use("/remove",Q.remove);

module.exports = router;




