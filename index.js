var express = require("express") //To use express module
var app = express ()

var contactsController = require("./controller/databaseController.js")

var bodyParser = require("body-parser")//To use body parser
var fs = require('fs') //To save image files to the databse
var cookieParser = require("cookie-parser");//To use cookies from server
var session = require('express-session') //To store flash and cookies
var flash = require('connect-flash'); //To show success and error messages
var passport = require("passport"); //To use user authentication module
var TwitterStrategy = require("passport-twitter").Strategy; //To use twitter authentication module
var env = require("./env.js");     // To use the secret informatyion saves in env.js not to show in Github

// Configuring body-parser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//Configure your staticassets
app.use("/assets", express.static("public"));

// To use handle bar
app.set("view engine", "hbs");

// Starting the app
app.listen('3000',()=>{
  console.log("Listenning at port: 3000")
})

//Getting session ID from cookie
var cookieParserFunction = cookieParser();
app.use(function(req, res, next){
  cookieParserFunction(req, res, next);
});

// Saving session ID
var sessionFunction = session({
  secret: env.sessionSecret,
  resave: true,
  saveUninitialized: true
});
app.use(function(req, res, next){
  sessionFunction(req, res, next);
});

// Initializing passport
var passportInitializer = passport.initialize();
app.use(function(req, res, next){
  passportInitializer(req, res, next);
});

//Setting passport session
var passportSessionFunction = passport.session();
app.use(function(req, res, next){
  passportSessionFunction(req, res, next);
});

//deserialized user data available in .hbs views
app.use(function(req, res, next){
  res.locals.user = req.user;
  next();
});
//Saving session variable
passport.serializeUser(function(user, next) {
  next(null, user);
});

//Getting session variable
passport.deserializeUser(function(user, next) {
  next(null, user);
});

// Getting user data from Twitter 'Strategy'
var twitterStrategy = new TwitterStrategy(
  env.twitter,
  function(token, tokenSecret, profile, next){
    next(null, profile);
  }
);
passport.use(twitterStrategy);

//Routes for user authentication
var twitterAuthenticator = passport.authenticate("twitter");
app.get("/signin", function(req, res){
  twitterAuthenticator(req, res);
});
// app.get('/auth/twitter', passport.authenticate('twitter'));
var authenticateNewUser = passport.authenticate("twitter", { failureRedirect: "/signout" });
app.get("/auth/twitter/callback",
  function(req, res, next){
    authenticateNewUser(req, res, next);
  },
  function(req, res){
    res.redirect("/");
  });

app.get("/signout", function(req, res){
  // var username;
  // if(req.user) username = req.user.username;
  // else username = "user";
  req.session.destroy();
  res.locals.user = null
  res.render("contact.hbs");
});

// Routes Using the hbs
app.get('/',(req,res)=>{
  res.render("home.hbs")
})
app.get('/about',(req,res)=>{
  res.render("emergency.hbs")
})
app.get('/news',(req,res)=>{
  res.render("news.hbs",{news: "GA graduation is on Friday!!!"})
})


//Backend Routes
app.get('/backend', contactsController.index)
app.get('/backend/:name', contactsController.show)
app.post('/backend/', contactsController.create)
app.put('/api/backend/:name', contactsController.update)
app.delete('/backend/:name/delete', contactsController.destroy)

// To use Angular routes in addition to hbs url
app.get('/*',(req,res)=>{
  res.sendFile(__dirname + "/public/app-root.html")
})
