const express = require('express');
const user = require('./controller.js');
const authRouter = express.Router();
const auth = require('../../middleware/auth');

authRouter.post("/register",user.register);
authRouter.post("/login",user.login);
authRouter.get("/auth",auth,user.auth);
authRouter.get("/logout",auth,user.logout);

module.exports = authRouter;