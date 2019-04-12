var express         = require("express"),
    app             = express(),
    bodyParser      = require('body-parser'),
    mongoose        = require ("mongoose"),
    seedDB          = require ("./seed"),
    passport        = require("passport"),
    methodOverride  = require("method-override"),
    flash           = require ("connect-flash"),
    LocalStrategy   = require("passport-local");
    
    
mongoose.connect('mongodb://localhost:27017/yelp_camp', { useNewUrlParser: true });
app.use(bodyParser.urlencoded({extended: true}))
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
// seedDB();
app.use(methodOverride("_method"));
app.use(flash());


//=============================
//Requiring routes
//=============================
var indexRoutes         = require("./routes/index.js"),    
    campgroundRoutes    = require("./routes/campgrounds.js")    ,
    commentRoutes       = require("./routes/comments.js")    ;
    
    
//Using module.exports
var Campground  = require("./models/campground"),
    Comment     = require("./models/comment"),  
    User        = require("./models/user");
    
//PASSPORT CONFIGURATION
app.use(require("express-session")({
    secret: "Khai is number one",
    resave: false,
    saveUninitialized: false
}));

//=============================
//Passport 
//=============================
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//=======================================
//middleware for passing currentUser
//=======================================
app.use(function(req, res, next) {
    res.locals.currentUser = req.user;
    res.locals.error = req.flash("error");
    res.locals.success = req.flash("success");
    next();
})

//====================
//Express Router Use
//====================
app.use("/", indexRoutes);
app.use("/campgrounds", campgroundRoutes);
app.use("/campgrounds/:id/comments", commentRoutes);

//=================================================
//Tell Express to listen for requests (star server)
//=================================================
app.listen(process.env.PORT, process.env.IP, function(){
      console.log("Server has started!"); 
});
