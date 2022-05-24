const express = require('express');
const data = require('./controller.js');
const dataRouter = express.Router();

dataRouter.post("/stt",data.stt);

module.exports = dataRouter;