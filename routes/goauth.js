const express = require('express')
require('../middleware/googleauth')
const session = require('express-session');
const passport = require('passport')

const oauth = express.Router()

function isLoggedIn(req, res, next) {
    req.user ? next() : res.sendStatus(401);
  }
  
oauth.use(session({ secret: 'cats', resave: false, saveUninitialized: true }));
oauth.use(passport.initialize());
oauth.use(passport.session());


oauth.get("/google/auth",
    passport.authenticate("google",{scope:['email','profile']})
    
);
oauth.get("/google/auth/callback",
passport.authenticate("google",{
    successRedirect:"/check/protected",
    failureRedirect:"/check/failure"
}))

oauth.get('/protected', isLoggedIn, (req, res) => {
    res.send(`Hello ${req.user.displayName}`);
  });
  
oauth.get('/logout', (req, res) => {
    req.logout();
    req.session.destroy();
    res.send('Goodbye!');
  });
  
oauth.get('google/auth/failure', (req, res) => {
    res.send('Failed to authenticate..');
  });


module.exports={oauth}