var express = require("express");
var router = express.Router();
var Campground = require("../models/campground");

// require middle ware
var middleware = require("../middleware/index.js");

// INDEX route - displays  all campgrounds
router.get("/campgrounds", function(req, res){
    
    //get all campgrounds from db 
    Campground.find({}, function(err, allCampgrounds){
        if(err){
            console.log(err);
        } else { // render campgrounds
            res.render("campgrounds/index", {campgrounds: allCampgrounds});
        }
    });
});

// CREATE route - create new campgrounds and add to db
router.post("/campgrounds", middleware.isLoggedIn, function(req, res){
   // get data from form and add to campgrounds array
   var name = req.body.name;
   var image = req.body.image;
   var desc = req.body.description;
   var author = {
       id: req.user._id,
       username: req.user.username
   };
   
   // make new object for campground
   var newCampground = {name: name, image: image, description: desc, author: author};
   
   // create a new campground and save to database
   Campground.create(newCampground, function(err, newlyCreated){
       if(err){
           console.log(err);
       } else {
            //redirect back to campgrounds page - this will ridirect to GET /campgrounds route
            res.redirect("/campgrounds");
       }
   });
});

// NEW route - route to show submit form for new campground
router.get("/campgrounds/new", middleware.isLoggedIn, function(req, res){
   res.render("campgrounds/new"); 
});

// SHOW route - route that shows more information on specific campground
router.get("/campgrounds/:id", function(req, res){
    // find the campground with the provided ID
    Campground.findById(req.params.id).populate("comments").exec(function(err, foundCampground){
        if(err){
            console.log(err);
        } else {
            // render show template with that campground
            res.render("campgrounds/show", {campground: foundCampground});
        }
    });
});

// EDIT route - shows form to update a campground entry
router.get("/campgrounds/:id/edit", middleware.checkCampgroundOwnership, function(req, res){
        Campground.findById(req.params.id, function(err, foundCampground){
            res.render("campgrounds/edit", {campground: foundCampground});
        });
});

// UPDATE route - handles logic for updating an existing campground entry
router.put("/campgrounds/:id", middleware.checkCampgroundOwnership, function(req, res){
   Campground.findByIdAndUpdate(req.params.id, req.body.campground, function(err, updatedCampground){
       if(err){
           res.redirect("/campgrounds");
       } else {
            req.flash("success", "Successfully updated campground.");
            res.redirect("/campgrounds/" + req.params.id);
       }
   }); 
});

// DESTROY route
router.delete("/campgrounds/:id",middleware.checkCampgroundOwnership, function (req,res){
   Campground.findByIdAndRemove(req.params.id, function(err){
      if(err){
          res.redirect("/campgrounds");
      } else {
          req.flash("success", "Successfully deleted campground.");
          res.redirect("/campgrounds");
      }
   });
});

module.exports = router;