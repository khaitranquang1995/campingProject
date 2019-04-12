var mongoose   = require ("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
        {
            name: "Bay Area", 
            img: "https://images.unsplash.com/photo-1496545672447-f699b503d270?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ba3fa37b995a705a01d022cada13f726&auto=format&fit=crop&w=1051&q=80",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        },
        {
            name: "Mountain Dew", 
            img: "https://images.unsplash.com/photo-1515444744559-7be63e1600de?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=c1e780d3e6b02538758b53bfab3951c1&auto=format&fit=crop&w=1050&q=80",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."            
        },
        {
            name: "Salmon Creek", 
            img: "https://images.unsplash.com/photo-1504280390367-361c6d9f38f4?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=d9df10d159cc11074d9a7996e8aca442&auto=format&fit=crop&w=1050&q=80",
            description: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
        }
    ]

function seedDB () {
    //Remove all campgrounds
    Campground.remove({}, function(err){
        // if (err) {
        //     console.log(err);
        // } 
        // console.log("Campground removed!");
        // //add a few campgrounds
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground) {
        //         if (err) {
        //             console.log(err);
        //         } else {
        //             console.log("Add a new campground!");
        //             //create a comment
        //             Comment.create(
        //                 {
        //                   text: "This place is great, but I wish there was Internet!",
        //                   author: "Homer"
        //                 }, function (err, comment){
        //                     if (err) {
        //                         console.log(err);
        //                     } else {
        //                         campground.comments.push(comment);
        //                         campground.save();    
        //                         console.log("Add a new comment!");
        //                     }
        //                 });
        //         }
        //     })    
        // });
    });
}

module.exports = seedDB;