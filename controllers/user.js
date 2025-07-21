const User = require("../models/user");

module.exports.signupUser = async(req,res) => {
    try{
    let {username , password , email } = req.body;
    const newUser = new User({email,username});
    const registerdUser = await User.register(newUser,password);
    console.log(registerdUser);
    req.login(registerdUser,(err) => {
        if(err){
            return next();
        }
            req.flash("success","Welcome to PJS");
            res.redirect("/listings");
    });
    } catch(e){
        req.flash("error",e.message);
        res.redirect("/signup");
    }
};

module.exports.loginupUser = async (req,res) => {
    req.flash("success", "Welcome back to PJS");
    let redirectUrl = res.locals.redirectUrl || "/listings";
    res.redirect(redirectUrl);                                                                                                                                                                                                                                                          
};

module.exports.logoutUser = (req,res,next) => {
    req.logOut((err) => {
        if(err){
            next(err);
        }
        req.flash("success","you were logged out");
        res.redirect("/listings");
    });
};