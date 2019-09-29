require('dotenv').config();

const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const express = require('express');
const expressSession = require('express-session');
const path = require('path');
const passport = require('passport')
  , LocalStrategy = require('passport-local').Strategy;

const port = process.env.PORT || 5000;

var {Recipe, User, Article} = require('./database');

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
      return res.redirect("/");
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
      res.status(200).redirect('/');
    });
  });
});

app.get('/api/auth/logout', function(req, res) {
  req.logout();
  res.redirect('/');
});

app.get('/api/user', function(req, res) {
  res.send({
    user: req.user,
  });
});

app.post('/api/recipe', (req, res) => {
  const body = req.body;
  const user = req.user;

	console.log("Received req " + JSON.stringify(body));
	console.log("Received user " + JSON.stringify(user));

  if (!user || !user.write) {
    res.redirect('/');
  }

	body['userId'] = user._id;
	body['writer'] = user.name;

	let recipe = new Recipe(body);
	console.log("Received " + JSON.stringify(recipe));
	recipe.save();

  res.status(200).redirect(`/recipes/${recipe._id}`);
});

app.get('/api/recipes', (req, res) => {
	const body = req.body
	Recipe.find({}).exec((err, recipes) => {
		if (err) throw err;
		var r;

    if (recipes && recipes.length > 0) {
			r = recipes.sort((a,b) => {
				return a.created > b.created;
			});
    }

		console.log(JSON.stringify(recipes));

    res.send({
      recipes: r
    });
	});
});

app.get('/api/recipes/:id', (req,res) => {
  const body = req.body
  Recipe.find({_id: req.params.id}).exec((err, recipe) => {
    if (err) throw err;
    
    res.send({
      recipe: recipe
    });
  });
});

app.get('/api/recipes/title/:title', (req, res) => {
  Recipe.find({"title": { $regex: req.params.title, $options: 'i'}}).exec((err, recipes) => {
    if (err) throw err;
    console.log(recipes);  
    res.send({
      recipes: recipes
    });
  });
});

app.post('/api/article', (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    res.redirect('/');
  }

  body['userId'] = user._id;

  let article = new Article(body);
  console.log(JSON.stringify(article));
  article.save();

  res.status(200).redirect(`/articles/${article._id}`);
});

app.get('/api/articles', (req, res) => {
  Article.find({}).exec((err, articles) => {
    if (err) throw err;
    res.send({
      articles: articles
    });
  });
});

app.get('/api/article/:id', (req,res) => {
  const body = req.body
  Article.find({_id: req.params.id}).exec((err, article) => {
    if (err) throw err;
    
    console.log(article);
    res.send({
      article: article[0]
    });
  });
});

app.post('/api/article/:id/up', (req, res) => {
  const body = req.body;
  const user = req.user;

  if (!user) {
    res.redirect('/');
  }

  Article.update(
    {id: req.params.id},
    { $push: {
      upvotes: [user.id]
    }},
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );
});

app.post('/api/article/:id/comment', (req, res) => {
  const body = req.body;
  const user = req.user;
  if (!req.user) {
    res.redirect('/auth/login');
    return
  }

  Article.update(
    {_id: req.params.id},
    { $addToSet: {
      comments: [{comment: body.comment, name: user.name, userId: user.id}]
    }},
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    }
  );

  res.redirect(req.get('referer'));

});


if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));
  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.listen(port, () => console.log(`Listening on port ${port}`));
