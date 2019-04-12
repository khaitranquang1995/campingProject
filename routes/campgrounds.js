var express         = require("express");
var router          = express.Router();
var Campground      = require("../models/campground.js");
var middleware   = require("../middleware");

//Index - Show all of the campgrounds
router.get("/", function(req, res){
    // res.render("campgrounds", {campgrounds: campgrounds});
    //get all campgrounds from database
    Campground.find({}, function (err, allCampgrounds){
       if (err)  {
           console.log(err);
       } else {
           res.render("campgrounds/index", {campgrounds: allCampgrounds})
       }
    });
});

//Create - add new campground to DB
router.post("/", middleware.isLoggedIn, function(req, res){
    //use bodyParser here
    var name = req.body.name;
    var price = req.body.price;
    var img = req.body.picture;
    var description = req.body.description;
    var author = {
        id: req.user._id,
        username:req.user.username
    }
    var newCamp = {
        name: name,
        price: price,
        img: img,
        description: description,
        author: author
    }
    
    //Create a new campground and save to DB
    Campground.create(newCamp, function(err, newlyCreated){
       if (err)  {
           console.log(err);
       } else {
            res.redirect("/campgrounds");
       }
    });
});

//New - Display a form to make a new campground
router.get("/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new") ;
   
});

//Show - show a particular campground
router.get("/:id", function(req, res) {
   Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if (err)     {
            console.log(err);
        } else {
            // console.log(foundCampground);
            res.render("campgrounds/show", {campground: foundCampground});
        }
   });
});

//Edit Campground Route
router.get("/:id/edit", middleware.checkCampgroundOwnership, function(req, res) {
    Campground.findById(req.params.id, function(err, foundCampground){
        res.render("campgrounds/edit", {campground: foundCampground});     
    });
});

//Update Campground Route
router.put("/:id", middleware.checkCampgroundOwnership, function (req, res) {
   //find & update the correct campground
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function (err, updatedCampground) {
       if (err) {
           res.redirect("/campgrounds");
       } else {
           res.redirect("/campgrounds/" + req.params.id);
       }
   });
});

//Destroy Campground Route
router.delete("/:id", middleware.checkCampgroundOwnership, function(req,res) {
    Campground.findByIdAndRemove(req.params.id, function(err) {
        if (err){
            res.redirect("/campgrounds");
        } else  {
            res.redirect("/campgrounds");
        }
    });
});

//======================
module.exports = router;