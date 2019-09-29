import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import update from 'react-addons-update';
import './App.css';
import Navbar from './components/Navbar/index';
import Home from './components/Home/index';
import { Article, NewArticle, ArticleHandler, ArticleListPage } from './components/Article/index';
import { Recipe, NewRecipe, RecipePage, RecipeResults } from './components/Recipe/index';
import About from './components/About/index';

import { NewUser, LoginUser } from './components/Auth/index';

const RecipeResultsQuery = ({ match }) => (
  <RecipeResults query={match.params.query} />
);

const RecipePageLoad = ({ match}) => (
  <RecipePage recipeid={match.params.id} />
);

const ArticlePage = ({ match }) => (
  <Article id={match.params.id} />
)

class App extends Component {
  state = {
      response: '',
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
     const res = await fetch('/api/hello');
     const body = await res.json();
     
     if (res.status !== 200) throw Error(body.message);

     return body;
  };

  // <Route exact path="/auth/login" component={LoginUser} />
  render() {
    return (
      <Router>
        <div>
          <Navbar />
          <Route exact path="/" component={Home} />
          <Route exact path="/articles" component={ArticleListPage} />
          <Route exact path="/recipes" component={Recipe} />
          <Route exact path="/new/recipes" component={NewRecipe} />
          <Route exact path="/new/articles" component={() => <NewArticle user={this.state.user}/>} />
          <Route exact path="/recipes/:id" component={RecipePageLoad} />
          <Route exact path="/article/:id" component={ArticlePage} />
          <Route exact path="/about" component={About} />
          <Route exact path="/auth/login" component={LoginUser} />
          <Route exact path="/auth/register" component={NewUser} />
          <Route exact path="/search/:query" component={RecipeResultsQuery} />
          <Route exact path="/search/" component={RecipeResults} />
        </div>
      </Router>
    );
  }
}

export default App;
