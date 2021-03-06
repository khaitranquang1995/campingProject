var express         = require("express");
var router          = express.Router({mergeParams: true});
var Campground      = require("../models/campground.js");
var Comment         = require("../models/comment.js");
var middleware      = require("../middleware");

//Comment New Route
router.get("/new", middleware.isLoggedIn, function(req, res) {
   Campground.findById(req.params.id, function(err, campground){
       if (err) {
           console.log(err);
       } else {
            res.render("comments/new", {campground: campground});        
       }
   });
});

//Comment Create Route
router.post("/", middleware.isLoggedIn, function(req, res){
    Campground.findById(req.params.id, function (err, campground){
       if(err)  {
           console.log(err);
           res.redirect("/campgrounds");
       } else {
           //create a comment
           Comment.create(req.body.comment, function(err, comment){
                if(err){
                    req.flash("error", "Something went wrong!");
                    console.log(err);
                } else {
                    //add username & id to comment
                    comment.author.id = req.user._id;
                    comment.author.username = req.user.username;
                    
                    //save comment
                    comment.save();
                    
                    //push it to the comment
                    campground.comments.push(comment);
                    campground.save();
                    // console.log(comment);
                    req.flash("success", "Successfully added comment");
                    res.redirect("/campgrounds/" + campground._id);
                }
           });
       }
    });
});

//Edit Comment Route
router.get("/:comment_id/edit", middleware.checkCommentOwnership, function(req, res) {
    Comment.findById(req.params.comment_id, function(err, foundComment) {
       if (err)  {
           res.redirect("back");
       } else {
            res.render("comments/edit", {campground_id: req.params.id, comment: foundComment});       
       }
    });
});

//Update Comment Route
router.put("/:comment_id", middleware.checkCommentOwnership, function(req, res){
     Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function (err, updatedComment) {
       if (err) {
           res.redirect("back");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//Destroy Comment Route
router.delete("/:comment_id", middleware.checkCommentOwnership, function(req,res) {
    Comment.findByIdAndRemove(req.params.comment_id, function(err) {
        if (err){
            res.redirect("back");
        } else  {
            // req.flash("success", "Comment deleted");
            res.redirect("/campgrounds/"+ req.params.id);
        }
    });
});

//==========================
module.exports = router;