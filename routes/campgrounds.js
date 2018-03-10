var express = require("express"),
    router = express.Router(),
    Campground = require("../models/campground"),
    middleWare = require("../middleware");


// Define escapeRegex function for search feature
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};

router.get("/", function(req, res) {
    if(req.query.search) {
        const regex = new RegExp(escapeRegex(req.query.search), 'gi');
        Campground.find({name: regex}, function(err, foundCampground) {
            if (err) {
                req.flash("error", err.message);
                res.redirect("back")
            } else {
                if (foundCampground.length === 0) {
                    req.flash("error", "No campground matched your search. Please try again!");   
                    return res.redirect("back");
                }
                res.render("campgrounds/index", {campgrounds: foundCampground});    
            }
        });
    } else {
        Campground.find({}, function(err, allCampgrounds) {
           if (err) {
               console.log(err);
           } else {
               res.render("campgrounds/index", {campgrounds: allCampgrounds});
           }
        });
    }
});


router.post("/", middleWare.isLoggedIn, function(req, res) {
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var price = req.body.price;
    var author = {
        id: req.user._id,
        username: req.user.username
    }
    var newCampground = {name: name, img: image, description: description, author: author, price: price};
    Campground.create(newCampground, function(err, newCampground) {
        if (err) {
            console.log(err);
        } else {
            res.redirect("/campgrounds");
        }
    })
    
});

router.get("/new", middleWare.isLoggedIn, function(req, res) {
   res.render("campgrounds/new"); 
});


router.get("/:id", function(req, res) {
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground) {
        if (err || !foundCampground) {
            req.flash("error", "Campground not found.");
            res.redirect("back");
        } else {
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
    
});


router.get("/:id/edit", middleWare.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground) {
        res.render("campgrounds/edit", {campground: foundCampground});          
    });
 
});

router.put("/:id", middleWare.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, campground) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds/" + req.params.id);
        }
    })
})

router.delete("/:id", middleWare.checkCampgroundOwnership, function(req, res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err) {
            res.redirect("/campgrounds");
        } else {
            res.redirect("/campgrounds");
        }
    })
})





module.exports = router;