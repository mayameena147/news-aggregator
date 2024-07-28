const express = require("express");
const userRouter = express.Router();
const authMiddleware = require("./../authMiddleware");
const {registerUser, loginUser, getUserPreferences, updateUserPreferences} = require("../userController");

userRouter.post("/signup", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/preferences", authMiddleware, getUserPreferences);
userRouter.put("/preferences", authMiddleware, updateUserPreferences);

module.exports = userRouter;