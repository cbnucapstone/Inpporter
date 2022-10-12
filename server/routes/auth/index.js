const express = require("express");
const user = require("./controller.js");
const authRouter = express.Router();

authRouter.post("/register", user.register);
authRouter.post("/login", user.login);
// authRouter.get("/logout",auth,user.logout);

module.exports = authRouter;
