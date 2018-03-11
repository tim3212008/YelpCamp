var express = require("express"),
    mongoose = require("mongoose"),
    bodyParser = require("body-parser"),
    app = express(),
    faker = require("faker"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    Campground = require("./models/campground"),
    Comment = require("./models/comment"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    seedDB = require("./seed");
    
//requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

//connect to database
mongoose.connect("mongodb://<dbuser>:<dbpassword>@ds253468.mlab.com:53468/myyelpcamp");
// mongoose.connect("mongodb://localhost/yelp_camp");

//setting up basic tools
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + "/public"));
app.use(methodOverride("_method"));
app.use(flash());

//setting up authentication
app.use(require("express-session")({
    secret: "Tim is the best",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//setting up global currentUser variable
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
});

app.set("view engine", "ejs");



//using routes
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);




//setting seed.
seedDB();


app.listen(process.env.PORT, process.env.IP, function() {
    console.log("Server is listening on " + process.env.PORT);
});


// app.listen(3000, function() {
//     console.log("Server is listening on " + 3000);
// });