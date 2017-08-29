var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");

var data = [
    {
        name: "Pike Path",
        image: "http://cdn.images.express.co.uk/img/dynamic/130/590x/Mountains-625882.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum, lacus vel placerat vestibulum, nibh orci vehicula ex, eget lacinia nunc mauris id urna. Suspendisse sed quam at mi condimentum cursus quis ut libero. Morbi dui enim, fringilla sed condimentum dictum, eleifend nec dui. Nullam auctor dolor ante, in rutrum nisl porta vitae. Aliquam porttitor congue mauris eget placerat. Sed luctus bibendum mi, id viverra nisl feugiat et. Integer eget volutpat dolor."
    },
    {
        name: "Hawk's Edge",
        image: "http://cdn.images.express.co.uk/img/dynamic/130/590x/Mountains-625882.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum, lacus vel placerat vestibulum, nibh orci vehicula ex, eget lacinia nunc mauris id urna. Suspendisse sed quam at mi condimentum cursus quis ut libero. Morbi dui enim, fringilla sed condimentum dictum, eleifend nec dui. Nullam auctor dolor ante, in rutrum nisl porta vitae. Aliquam porttitor congue mauris eget placerat. Sed luctus bibendum mi, id viverra nisl feugiat et. Integer eget volutpat dolor."
    },
    {
        name: "Cheery Creek",
        image: "http://cdn.images.express.co.uk/img/dynamic/130/590x/Mountains-625882.jpg",
        description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nam elementum, lacus vel placerat vestibulum, nibh orci vehicula ex, eget lacinia nunc mauris id urna. Suspendisse sed quam at mi condimentum cursus quis ut libero. Morbi dui enim, fringilla sed condimentum dictum, eleifend nec dui. Nullam auctor dolor ante, in rutrum nisl porta vitae. Aliquam porttitor congue mauris eget placerat. Sed luctus bibendum mi, id viverra nisl feugiat et. Integer eget volutpat dolor."
    }
    
];

function seedDB(){
    //wipe everything from database
    Campground.remove({}, function(err){
        if(err){
            console.log(err);
        } else {
            console.log("Removed All campgrounds");
        }
        
        //  // add new campgrounds to test with
        // data.forEach(function(seed){
        //     Campground.create(seed, function(err, campground){
        //         if(err){
        //             console.log(err);
        //         } else {
        //             console.log("Added a campground");
                    
        //             // Add fake comments
        //             Comment.create(
        //                 {
        //                     text:"This place stinks. I didn't like it!",
        //                     author: "Nick"
        //                 }, function(err, comment){
        //                         if(err){
        //                             console.log(err);
        //                         } else {
        //                             campground.comments.push(comment);
        //                             campground.save();
        //                             console.log("Created New Comment");
        //                         }
                                
        //                     });
        //         }
        //     });
        // });
    });
    
}   

module.exports = seedDB;