var Campground = require("../models/campground"),
    Comment = require("../models/comment");
    

var middleWareObj = {}

middleWareObj.checkCampgroundOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Campground.findById(req.params.id, function(err, foundCampground) {
            if (err || !foundCampground) {
                req.flash("error", "Campground not found.");
                res.redirect("back");
            } else {
                if (foundCampground.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denided.")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "Please Login First.")
        res.redirect("back");
    }
}

middleWareObj.checkCommentOwnership = function(req, res, next) {
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment) {
            if (err || !foundComment) {
                req.flash("error", "Comment not found.")
                res.redirect("back");
            } else {
                if (foundComment.author.id.equals(req.user._id)) {
                    next();
                } else {
                    req.flash("error", "Permission Denided.")
                    res.redirect("back");
                }
            }
        })
    } else {
        req.flash("error", "Please Login First.")
        res.redirect("back");
    }
}

middleWareObj.isLoggedIn = function(req, res, next) {
    if (req.isAuthenticated()) {
        return next();
    }
    req.flash("error", "Please Login First.")
    res.redirect("/login");
}

module.exports = middleWareObj;
