var express        = require("express");
var app            = express();
var bodyParser     = require("body-parser");
var mongoose       = require("mongoose");
var passport       = require("passport");
var LocalStrategy  = require("passport-local");
var methodOverride = require("method-override");
var flash          = require("connect-flash");

// require route files
var commentRoutes    = require("./routes/comments");
var campgroundRoutes = require("./routes/campgrounds");
var indexRoutes      = require("./routes/index");

// require models
var Campground = require("./models/campground");
var Comment    = require("./models/comment");
var User       = require("./models/user");

// connect to database with mongoose
mongoose.connect("mongodb://localhost/yelp_camp");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended: true}));

// use method override
app.use(methodOverride("_method"));

// use connect flash
app.use(flash());

// serve the public directory - will allow to connect stylesheets and javascripts
app.use(express.static(__dirname + "/public"));

// require seeds file and execute it
//var seedDB = require("./seeds");
//seedDB();

// Passport configuration
app.use(require("express-session")({
    secret: "secret password phrase 12344344",
    resave: false,
    saveUninitialized: false
}));
 
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

// middleware for every route, passes a currentUser and message to every template
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error       = req.flash("error");
   res.locals.success     = req.flash("success");
   next();
});

// use route files
app.use(indexRoutes);
app.use(campgroundRoutes);
app.use(commentRoutes);

// landing page - root path
app.get("/", function(req, res){
    res.render("landing");
});

// listen on port and start server
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("YelpCamp Server has started on port " + process.env.PORT);
});