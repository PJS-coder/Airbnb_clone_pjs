const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");

const userController = require("../controllers/user.js");

router.route("/signup")
.get((req,res) => {
    res.render("users/signup.ejs")
})
.post(wrapAsync(userController.signupUser));
 
router.route("/login")
.get((req,res) => {
    res.render("users/login.ejs");
})
.post(saveRedirectUrl ,passport.authenticate('local', { failureRedirect: '/login',failureFlash : true})
,userController.loginupUser );


router.get("/logout", userController.logoutUser);

module.exports = router;