var express = require("express"),
    router = express.Router({mergeParams: true}),
    Campground = require("../models/campground"),
    Comment = require("../models/comment"),
    middleWare = require("../middleware");
    
    
router.get("/new", middleWare.isLoggedIn, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.render("comments/new", {camp: foundCamp});
        }
    });
    
});

router.post("/", middleWare.isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, foundCamp) {
       if (err) {
           res.redirect("/campgrounds/" + req.params.id);
       } else {
           Comment.create(req.body.comment, function(err, comment) {
               
               comment.author.username = req.user.username;
               comment.author.id = req.user._id;
               comment.save();
               
               foundCamp.comments.push(comment._id);
               foundCamp.save();
               res.redirect("/campgrounds/" + req.params.id);
           });
       }
   }) 
});



router.get("/:comment_id/edit", middleWare.checkCommentOwnership, function(req, res){
    Campground.findById(req.params.id, function(err, foundCamp) {
        if (err || !foundCamp) {
            req.flash("error", "Campground not found.");
            res.redirect("back");
        } else {
            Comment.findById(req.params.comment_id, function(err, foundComment) {
                if (err || !foundComment) {
                    req.flash("error", "Comment not found");
                    res.redirect("back");
                } else {
                    res.render("comments/edit", {comment: foundComment, campground_id: req.params.id});        
                }
            });
        }
    });
});

router.put("/:comment_id", middleWare.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err, updatedComment){
        if (err) {
            console.log(err);
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    });
});

router.delete("/:comment_id", middleWare.checkCommentOwnership, function(req, res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err) {
            res.redirect("back");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})


module.exports = router;