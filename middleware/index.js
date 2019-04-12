//All the middle goes here
var middlewareObj = {};

//Require Campground & Comment
var Campground      = require("../models/campground.js");
var Comment         = require("../models/comment.js");

//Declare middleware functions
middlewareObj.checkCampgroundOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
            Campground.findById(req.params.id, function(err, foundCampground){
                if (err)  {
                    res.flash("error", "Campground not found");
                    res.redirect("back");
                }   else {
                   //does the user own the campground?
                   //cannot compare by using === because they are not same type
                   //the first is object
                   //the second is a string
                   //instead, use .equals()
                    if (foundCampground.author.id.equals(req.user._id)) {
                       next();
                    } else {
                        res.flash("error", "You don't have permission to do that!");
                        res.redirect("back");
                    }
               }
            });
        } else {
            req.flash("error", "You need to be logged in to do that!");
            res.redirect("back");
    }
};

middlewareObj.checkCommentOwnership = function(req, res, next){
    if (req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if (err)  {
               res.redirect("back");
           } else {
                if (foundComment.author.id.equals(req.user._id)) {
                   next();
                } else {
                    res.flash("error", "You don't have permission to do that!");
                    res.redirect("back");
                }
           }
        });
    } else {
        req.flash("error", "You need to be logged in to do that!");
        res.redirect("back");
    }
};

middlewareObj.isLoggedIn = function  (req, res, next) {
    if (req.isAuthenticated ()) {
        return next();
    }
    req.flash("error", "You need to be logged in to do it!");
    res.redirect("/login");
};


//Export
module.exports = middlewareObj;