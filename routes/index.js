var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

router.get("/", function(req, res) {
    res.render("landings");
});


router.get("/register", function(req, res) {
    res.render("register");
})

router.post("/register", function(req, res) {
    var newUser = new User({username:req.body.username})
    User.register(newUser, req.body.password, function(err, user) {
        if (err) {
            req.flash("error", err.message);
            return res.redirect("/register");
        }
        passport.authenticate("local")(req, res, function(){
            req.flash("success", "Nice to have you here " + user.username);
            res.redirect("/campgrounds");
        });
    });
    
})

router.get("/login", function(req, res) {
    res.render("login");
})


router.post("/login", passport.authenticate("local", 
    {
        successRedirect: "/campgrounds",
        failureRedirect: "/login"
    }), function(req, res) {
})

router.get("/logout", function(req, res) {
    req.logout();
    req.flash("success", "Successfully Logged out. Bye.")
    res.redirect("/campgrounds");
});

function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    res.redirect("/login");
}




module.exports = router;