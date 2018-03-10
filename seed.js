var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment   = require("./models/comment");
var faker = require("faker")
 
var data = [
    {
        name: "Cloud's Rest", 
        img: "https://images.unsplash.com/photo-1482463084673-98272196658a?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=457b7840cb35f335c04c8d37a7210a4d&auto=format&fit=crop&w=1500&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Desert Mesa", 
        img: "https://images.unsplash.com/photo-1445308394109-4ec2920981b1?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=1c80f31bb4040015d51db663252fbd30&auto=format&fit=crop&w=1506&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    },
    {
        name: "Canyon Floor", 
        img: "https://images.unsplash.com/photo-1495685288924-ce05d1036b24?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9c18e42f88d973bbdf030b7ec3544e39&auto=format&fit=crop&w=1500&q=80",
        description: "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum"
    }
]
 
function seedDB(){
   //Remove all campgrounds
   Campground.remove({}, function(err){
        if(err){
            console.log(err);
        }
        console.log("removed campgrounds!");
        Comment.remove({}, function(err) {
            // if(err){
            //     console.log(err);
            // }
            // console.log("removed comments!");
            //  //add a few campgrounds
            // data.forEach(function(seed){
            //     Campground.create(seed, function(err, campground){
            //         if(err){
            //             console.log(err)
            //         } else {
            //             console.log("added a campground");
            //             //create a comment
            //             // for (var i = 0; i < 5; i++) {
            //             //     Comment.create(
            //             //     {
            //             //         text: faker.lorem.paragraph(),
            //             //         author: faker.name.firstName()
            //             //     }, function(err, comment){
            //             //         if(err){
            //             //             console.log(err);
            //             //         } else {
            //             //             campground.comments.push(comment._id);
            //             //             campground.save();
            //             //         }
            //             //     });
            //             // }
            //         }
            //     });
            // });
        });
    }); 
    // //add a few comments
}
 
module.exports = seedDB;