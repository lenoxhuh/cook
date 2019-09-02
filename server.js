require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const port = process.env.PORT || 5000;

var {Recipe, User} = require('./database');

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

const app = express();
app.use(cookieParser('mySecretKey'));
app.use(expressSession({
  secret: 'mySecretKey',
    resave: false,
    saveUninitialized: true
  }));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(passport.initialize());
app.use(passport.session());

app.get('/api/hello', (req, res) => {
  res.send({ express: 'Hello From Express' });
});

app.post('/api/auth/login', function(req, res, next) {
  passport.authenticate('local', function(err, user, info) {
    if (err) { return next(err) }
    if (!user) {
      return res.redirect('/auth/login');
    }
    req.logIn(user, function(err) {
      if (err) { return next(err); }
      return res.redirect(`/${user.country}/profile/${user.id}`);
    });
  })(req, res, next);
});

app.post('/api/auth/register', (req, res) => {
  User.register(new User({ 
    username: req.body.username,
    name: req.body.name,
    country: req.body.country,
    description: req.body.description,
    age: req.body.age,
  }), req.body.password, (err, user) => {
    if (err) res.send(err);
    passport.authenticate('local')(req, res, function () {
      console.log("authenticated " + JSON.stringify(req.user));
      res.status(200).redirect('/auth/login');
    });
  });
});

// app.post('/api/auth/register', (req, res) => {
//   User.findOne({}, {}, { sort: { 'id' : -1 } }).limit(1).exec((err, user) => {
//     if (err)
// 			res.redirect('/auth/register');
//
//     let id = 1;
//     
//     if (user && user['id']) {
// 			console.log("\n\n Last user: " + user['id'] + "\n\n");
//       id = user['id'] + 1;
//     }
//
//     User.register(new User({ 
//       username: req.body.username,
//       name: req.body.name,
//       country: req.body.country,
//       description: req.body.description,
// 			age: req.body.age,
// 			school: req.body.school,
//       id: id
//     }), req.body.password, (err, user) => {
// 			if (err) res.send(err);
// 			passport.authenticate('local')(req, res, function () {
// 				console.log("authenticated " + JSON.stringify(req.user));
// 				res.status(200).redirect('/auth/login');
// 			});
// 	});
//   });
// });

app.get('/api/auth/logout', function(req, res) {
  console.log("logging out!");
  req.logout();
  res.redirect('/');
});

app.get('/api/user', function(req, res) {
  res.send({
    user: req.user,
  });
});

// app.post('/api/article/:id/up', (req, res) => {
//   const body = req.body;
//   const user = req.user;
//
//   if (!user) {
//     res.redirect('/');
//   }
//
//   Article.update(
//     {id: req.params.id},
//     { $push: {
//       upvotes: [user.id]
//     }},
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log(result);
//       }
//     }
//   );
// });

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
