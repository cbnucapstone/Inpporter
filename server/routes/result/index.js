const express = require("express");
const result = require("./controller.js");
const resultRouter = express.Router();

resultRouter.post("/post", result.postresult);
resultRouter.get("/get", result.getresult);

module.exports = resultRouter;
