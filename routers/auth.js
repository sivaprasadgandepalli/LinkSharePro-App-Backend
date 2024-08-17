const express = require("express");
const router = express.Router();
const { checkInputs, generateToken } = require("../middlewares/userMiddleware");
const { handleUserRegister, handleUserLogin, handleUpdateProfile } = require("../controllers/userController");
router.post("/signup", checkInputs,handleUserRegister);
router.post("/signin",generateToken ,handleUserLogin);
router.post("/updateProfile", handleUpdateProfile);
module.exports = router;