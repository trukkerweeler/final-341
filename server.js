const cors = require('cors');
const express = require("express");
const mongodb = require("./db/connect");
const bodyParser = require("body-parser");

const app = new express();
const port = process.env.PORT || 3000;


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const passport = require('passport');
const session = require('express-session');
const githubStrategy = require('passport-github2').Strategy;

app
  .use(bodyParser.json())
  .use(session({
    secret: "secret",
    resave:false,
    saveUninitialized: true ,
  }))
  .use(passport.initialize())
  .use(passport.session())
  .use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "*");
    res.setHeader("Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Z-Key, Authorization");
    next();
  }) 
  .use('/', require('./routes/index.js'))
  .use('api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument))
  .use(cors())


passport.use(new githubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function(accessToken, refreshToken, profile, done) {
  //User.findOrCreate({ githubId: profile.id }, function (err, user) {
    return done(null, profile);
  // });
}
));

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

app.get('/', (req, res) => { res.send(req.session.user !== undefined ? `Logged in as ${req.session.user.displayName}` : "Logged out")});

app.get('/github/callback', passport.authenticate('github', {
  failureRedirect: '/api-docs',session:false}),
  (req, res) => {
    req.session.user = req.user;
    res.redirect('/');
  });


mongodb.initDb((err, mongodb) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port, () => {
      // console.log(`Running and connected on port ${port}`);
    });
  }
});

module.exports = app;