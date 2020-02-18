var express = require('express');
var db = require("../models");
var router = express.Router();
var passport = require("../config/passport");

// passport.authenticate("local")

router.post("/login", passport.authenticate("local"), function(req, res) {
  //console.log(res); 
  // console.log(req.body.name);
  // console.log(req.body.password); 
  console.log('it worked signed in', req.user)
  res.json(req.user);

});

// Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
// how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
// otherwise send back an error
router.post("/api/signup", function(req, res) {
  console.log(req.body) 
  db.User.create({
    name: req.body.name,
    password: req.body.password
  })
    .then(function() {
      res.redirect(307, "/api/login");
    })
    .catch(function(err) {
      res.status(401).json(err);
    });
});

// Route for logging user out
router.get("/logout", function(req, res) {
  req.logout();
  res.redirect("/");
});

// Route for getting some data about our user to be used client side
router.get("/api/user_data", function(req, res) {
  if (!req.user) {
    // The user is not logged in, send back an empty object
    res.json({});
  } else {
    // Otherwise send back the user's email and id
    // Sending back a password, even a hashed password, isn't a good idea
    res.json({
      name: req.user.name,
      id: req.user.id
    });
  }
});

module.exports = router; 

