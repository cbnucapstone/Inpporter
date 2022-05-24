const express = require('express');
const authRouter = require('./auth');
const router = express.Router();
const dataRouter = require('./data');

router.use("/auth",authRouter);
router.use("/data",dataRouter);

module.exports = router;


