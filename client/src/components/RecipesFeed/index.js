import React, { Component } from 'react';
import './RecipesFeed.css';


class HomeRecipesFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: 0
    }
  }
  
  render() {
    return (
      <div className="home-recipes-feed-wrapper">
        <p className="home-recipes-desc"> Top Recipes </p>
        <RecipesFeed data={this.props.recipes} />
      </div>
    )
  }
}

class RecipesFeed extends Component {

  constructor(props) {
    super(props);
  }

	render() {
	  return (
      <div className="recipes-feed-wrapper">
      </div>
    )
  }

}

class RecipeMiniFeed extends Component {
  
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recipe-mini-feed">
      </div>
    );
  }
}
	  	

export {
  HomeRecipesFeed,
  RecipesFeed
}
