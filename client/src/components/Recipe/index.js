import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';

import './Recipe.css';

var request = require('request');

const categories = [
"Acorn",
"Bacon",
"Beet",
"Bell",
"Pepper",
"Bread",
"Cabbage",
"Cauliflower",
"Celery",
"Cheese",
"Chocolate",
"Coconut",
"Corn",
"Cucumber",
"Dairy",
"Eggplant",
"Fish",
"Flour",
"Fruit",
"Garlic",
"Grain",
"Greenery",
"Ham",
"Lettuce",
"Meat",
"Mushroom",
"Noodle",
"Oil",
"Olive",
"Onion",
"Paprika",
"Pear",
"Pot",
"Potato",
"Pumpkin",
"Radish",
"Salami",
"Sauce",
"Sausage",
"Seafood",
"Soup",
"Soy",
"Spicy",
"Sugar",
"Tomato",
"Tuna",
"Vegetable",
"Avocado"
]

// IngestableHandler collects info from the db
class IngestableHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: {}
        }
        // this.get_article(props);
    }

    componentDidMount() {
        this.get_article(this.props);
    }
  
    // TODO rework
    get_url(props) {
				return '/api/recipes/';
    }

    get_data(props) {
        fetch(this.get_url(props))
        .then(data => data.json())
        .then(data => {
            var mut = data.articles.filter((article) => {
                return article.userId === props.userId;
            });
            this.setState({
                articles: mut
            });
        });
    }

    get_cards() {
        if (!this.state.data) {
            return;
        }
        var cards = [];
        this.state.data.forEach((article) => {
        
        });
        return cards
    }

    render() {
        return (
            <div className="data-wrapper">
            </div>
        );
    }
}

class RecipeFeed extends Component {

  constructor(props) {
    super(props);
    this.state = {
      data: this.props.data,
      type: this.props.type,
      selected: 0
    }
  }
  
  update_selected(i) {
    this.setState({
      selected: i
    });
  }

  get_feed_items() {
    var feed_items = [];
    if (!this.props.data) {
      return feed_items;
    }
    
    var i = 0;
    this.props.data.forEach(data => {
      if (this.state.type === "list" || this.state.type === "half-list") {
        var selected = i === this.state.selected;
        feed_items.push(<RecipeFeedListItem 
					key={data.title}
          selected={selected} 
          recipe={data}
          list_id={i}
          update_selected={(j) => this.update_selected(j)}
          />);
        i++;
      }
    });

    return feed_items;
  }

  get_focused_image() {
    var selected = this.props.data[this.state.selected]
    if (selected && this.props.type === "half-list") {
      return (
        <div className="home-recipes-side-image">
          <img src={selected.cover_photo} />
        </div>

      );
    }
  }

  render() {
    return (
      <div className="home-recipes-feed-wrapper">
        <p className="home-recipes-desc"> Top Recipes </p>
        <div className="home-recipes-inside-wrapper">
          {this.get_feed_items()}
        </div>
      {this.get_focused_image()}
      </div>
    );
  }
}

class RecipeFeedListItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipe: this.props.recipe
    }
  }

  get_subheader() {
    return `Cook time ${this.props.recipe.cook_time}, ${this.props.recipe.cook_difficulty} Difficulty`
  }

  render() {
    return (
      <div 
        className="recipe-feed-list-item-wrapper"
        onClick={() => this.props.update_selected(this.props.list_id)}
        >
        <div className="recipe-list-item-ball"></div>
        <a className="recipe-list-item-header"  href={"/recipes/" + this.props.recipe._id}>
          { this.props.recipe.title }
        </a>
        <p className="recipe-list-item-subheader">
          { this.get_subheader() }
        </p>
        <p className="recipe-list-item-blurb">
          { this.props.recipe.description.slice(0,200) }
        </p>
      </div>
    );
  }
}

class ArticleComment extends Component {

    get_date() {
        let created= new Date(this.props.comment.created);
        return created.toDateString();
    }

    render() {
        return (
            <div className="comment">
                <p className="name">
                    {this.props.comment.name}
                </p>
                <p>
                    {this.get_date()}
                </p>
                <br />
                <p className="comment-body">
                    {this.props.comment.comment}
                </p>
            </div>
        )
    }
}

class ArticleComments extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {}
        }
    }
    get_comments() {
        if (!this.props.comments) {
            return;
        }
        var comments = [];
        this.props.comments.forEach((comment, key) => {
            comments.push(<ArticleComment
                key={key}
                comment={comment}
            />)
        })
        return comments;
    }
    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }
    getValid() {
        let {
            comment
        } = this.state.formValues;

        if (comment) {
            return "valid";
        } else {
            return "invalid";
        }
    }
    render() {
        return (
            <div className="article-comments">
                <form id="form" action={`/api/article/${this.props.articleId}/comment`} method="POST">
                    <div className="country-header">
                        <h1>Comments</h1>
                        <p> Start a discussion </p>
                    </div>
                    <div className="form-row">
                        <textarea onChange={this.handleChange.bind(this)} className="form-comment" name="comment" type="text"></textarea>
                    </div>
                    <div className="form-row comment-button">
                        <button className={this.getValid()}>Submit</button>
                    </div>
                    <div className="comments-container">
                        {this.get_comments()}
                    </div>
                </form>
            </div>
        )
    }
}

// Article displays a full article
class Article extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: null,
            user: null,
            updvoted: false,
            curr: null
        }
    }

    componentDidMount() {
        this.get_article(this.props);
    }

    get_user(id) {
       fetch(`/api/user/id/${id}`)
       .then(data => data.json())
       .then(data => {
           this.setState({
               user: data.user
           });
       });
    }

    get_curr() {
        fetch('/api/user')
        .then(data => data.json())
        .then(data => {
          let user = (data && data.user) ? data.user : null;
          this.setState({
            curr: user
          });
        });
    }

    get_url(props) {
        return `/api/article/${props.country}/${props.id}`;
    }

    get_article(props) {
        fetch(this.get_url(props))
        .then(data => data.json())
        .then(data => {
            this.setState({
                article: data.article,
                upvotes: data.article.upvotes.length
            }, () => {
                this.get_user(data.article.userId);
                this.get_curr();
            });
        });
    }

    get_profile() {
        return `/${this.state.user.country}/profile/${this.state.user.id}`;
    }

    get_date() {
        let created= new Date(this.state.article.created);
        return created.toDateString();
    }

    get_video() {
        if (this.state.article.video) {
            return (
                <div className="article-video-container">
                    <ReactPlayer
                    url={this.state.article.video}
                    className={"article-video"}
                    playing={false}
                    width={"100%"}
                    height={"400px"}
                    config={{
                        youtube: {
                            playerVars: {
                                modestbranding: 1,
                            }
                        }
                    }}
                    onError={e => e.target.style.display = 'none'}
                    />
                </div>
            )
        }
    }

    get_images() {
        var images = [];
        if (this.state.article.photos) {
            const listed = this.state.article.photos.split(',');
            listed.forEach((photo, i) => {
                images.push(
                    <img
                        key={i}
                        className="photos"
                        src={photo}
                        alt="."
                        onError={e => e.target.style.display = 'none'}/>
                );
            });
        }
        return images;
    }

    upvote() {
        if (!this.state.curr) {
            return
        }
        var factor;
        if (this.state.upvoted){
            factor = -1;
        } else {
            factor = 1;
        }


        this.setState({
            upvotes: this.state.upvotes + factor,
            upvoted: !this.state.upvoted
        });

        var method = (factor > 0) ? "up" : "down";

        fetch(`/api/article/${this.state.article.id}/${method}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user:this.state.curr.id})
        });
    }

    render() {
        if (this.state.article && this.state.user) {
            return (
                <div className="article-wrapper">
                    <div className="article-cover">
                        <img
                            src={this.state.article.photo}
                            alt="."
                            onError={e => e.target.style.display = 'none'}>
                        </img>
                    </div>
                    <div className="article-container">
                        <h2>{this.state.article.title}</h2>
                        <p>By <Link to={this.get_profile()}>{this.state.user.name}</Link></p>
                        <p>{this.get_date()}</p>
                        <p>
                            {this.state.upvotes + " people "}
                            <span className="upvote-link" onClick={() => this.upvote()}>like </span>
                            this</p>
                        <br />
                        {this.get_images()}
                        {this.get_video()}
                        <p>{this.state.article.body}</p>
                        <br/>
                    </div>
                    <ArticleComments
                        articleId={this.state.article.id}
                        comments={this.state.article.comments}
                        />
                </div>
            );
        } else {
            return (
                <div></div>
            )
        }
    }
}

// ArticleCard displays article info
class ArticleCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            curr: null,
            upvotes: this.props.article.upvotes.length,
            upvoted: false
        }
    }

    componentDidMount() {
        this.get_curr();
    }

    truncate_body() {
        if (!this.props && !this.props.article) {
            return
        }
        return this.props.article.description;
    }

    get_article() {
        return `/article/${this.props.article.country}/${this.props.article.id}`;
    }

    get_date() {
        let created= new Date(this.props.article.created);
        return created.toDateString();
    }

    get_curr() {
        fetch('/api/user')
        .then(data => data.json())
        .then(data => {
          let user = (data && data.user) ? data.user : null;
          this.setState({
            curr: user
          });
        });
    }


    upvote() {
        if (!this.state.curr) {
            return
        }
        var factor;
        if (this.props.article.upvotes.includes(this.state.curr.id)){
            factor = -1;
        } else {
            factor = 1;
        }

        this.setState({
            upvotes: this.state.upvotes + factor,
        });

        var method = (factor > 0) ? "up" : "down";

        fetch(`/api/article/${this.props.article.id}/${method}`, {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({user:this.state.curr.id})
        });
    }

    render() {
        return (
            <div className="article-card">
                <div className="article-photo">
                    <img src={this.props.article.photo} alt="." onError={e => e.target.style.display = 'none'}></img>
                </div>
                <h2>
                    {this.props.article.title}
                    <br />
                    <small>By {this.props.article.writer}, </small>
                    <small className="article-date">{this.get_date()}</small>
                    <p className="custom-height">
                        {this.state.upvotes + " people "}
                        <span className="upvote-link" onClick={() => this.upvote()}>like </span>
                        this
                    </p>
                </h2>
                <p>{this.truncate_body()}</p>
                <br/>
                <br/>
                <Link to={this.get_article()} className="card-link">Read More</Link>
            </div>
        );
    }
}

class NewRecipe extends Component {
    constructor(props) {
        super(props);
        this.state = {
            formValues: {
            }
        }
    }

    handleChange(event) {
        event.preventDefault();
        let formValues = this.state.formValues;
        let name = event.target.name;
        let value = event.target.value;

        formValues[name] = value;

        this.setState({formValues})
    }

    handleSubmit() {
        if (this.state.formValues.recipe) {
            this.state.formValues.recipe = this.state.formValues.recipe.split(',');
        }

        if (this.state.formValues.tags) {
            this.state.formValues.tags = this.state.formValues.tags.split(',');
        }
        
        console.log("submitting with formValues " + JSON.stringify(this.state.formValues));

        fetch('/api/recipe', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Access-Control-Alllow-Origin': '*',
            },
            body: JSON.stringify(this.state.formValues),
        }).then(res => {
            console.log("RES: " + JSON.stringify(res));
        }).catch(err => {
            console.log(err)
        });

        console.log("Submitted");
        window.location.pathname="/";
    }

    getValid() {
        let {
            title,
            cover_photo,
			photos,
			cook_difficulty,
			cook_time,
            description,
            body,
			recipe,
        } = this.state.formValues;

        if (title && recipe && cover_photo && cook_difficulty && description && body) {
            return "valid";
        } else {
            return "invalid";
        }
    }

    update_ingredients(ingredients) {
        console.log("Updated ingredients " + JSON.stringify(ingredients));
        this.state.formValues.ingredients = ingredients;
    }

    render() {
        return (
            <div className="form-wrapper">
                <div className="form-header">
                    <h1>Create a new Recipe</h1>
                    <p>Fill out the following form and one will be created</p>
                </div>
                <form id="form" method="None">
                    <div className="form-row">
                        <label htmlFor="recipe">Recipe Title</label>
                        <input name="title" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="cook_difficulty">Difficulty</label>
                        <input name="cook_difficulty" type="text" onChange={this.handleChange.bind(this)} />
                    </div>
                    
                    <div className="form-row">
                        <label htmlFor="cook_time">Cook Time</label>
                        <input name="cook_time" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="cover_photo">Cover Photo</label>
                        <input name="cover_photo" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                     <div className="form-row">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description"  onChange={this.handleChange.bind(this)}></textarea>
                    </div>

                    <div className="form-row">
                        <label htmlFor="body">Body</label>
                        <textarea id="body" name="body"  onChange={this.handleChange.bind(this)}></textarea>
                    </div>

                    <div className="form-row">
                        <label htmlFor="photos">Image Url</label>
                        <p>Seperate by commas for more images (eg. link1,link2)</p>
                        <input id="photos" name="photos" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
						<label htmlFor="recipe">Recipe</label>
                        <p>Seperate Instructions by Commas</p>
                        <input id="recipe" name="recipe" type="text" onChange={this.handleChange.bind(this)} />
			    	</div>	

                    <div className="form-row">
						<label htmlFor="tags">tags</label>
                        <p>Separate Tags by Commas</p>
                        <input id="tags" name="tags" type="text" onChange={this.handleChange.bind(this)} />
			    	</div>	

					<IngredientsSelector 
						updateIng={(ingredients) => this.update_ingredients(ingredients)}/>	

                    <div className="form-row">
                        <button 
						    className={this.getValid()}
							onClick={() => this.getValid() && this.handleSubmit()}
						    >Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

class IngredientsSelector extends Component {
	constructor(props) {
		super(props);
		this.state = {
			ingredients: []
		}
	}

	handleChange(e, i, value, cat) {
		if (!this.state.ingredients[i-1]) {
			this.state.ingredients[i-1] = {};
		}
		this.state.ingredients[i-1][cat] = e.target.value;

		this.props.updateIng(this.state.ingredients);
	}

	get_selections() {
		let selections = [];
		categories.forEach(cat => {
			selections.push(
				<option value={cat}>{cat}</option>
			);
		});	
		return selections;
	}

	get_ingredient_forms() { 
		let forms = [];
		let length = this.state.ingredients.length
		console.log("ingredients " + this.state.ingredients);
		for (var i = 0; i < length + 1; i++) {
			console.log("rendering ingredients["+  i + "] " + this.state.ingredients[i]);
			var value;
			if (!this.state.ingredients[i]) {
				value = this.state.ingredients[i];
			}

			let ing_val = value && value['ingredient'] ? value['ingredient'] : null;
			let cat_val = value && value['category'] ? value['category'] : null;
			forms.push(
				<div className="ing-input">	
					<input placeholder="ingredient" value={ing_val} id={"ingredients-"+i} type="text" onChange={(e) => this.handleChange(e, i, value, "ingredient")} />
					<input placeholder="link" value={ing_val} id={"link-"+i} type="text" onChange={(e) => this.handleChange(e, i, value, "link")} />
					

					<p
						className="ing-input-button"
						onClick={() => this.setState({ingredients: this.state.ingredients})}
						>+</p>
					<select value={cat_val} id={"category-"+i} type="selection" onChange={(e) => this.handleChange(e, i, value, "category")}>
						{ this.get_selections() }
					</select>

				</div>

			)
		}
		return forms;
	}

	render() {
		return (
			<div className="form-row">
				<label htmlFor="ingredients">Ingredients</label>
				<p>List ingredients below</p>
				{this.get_ingredient_forms()}
			</div>
		);
	}
}

class TwitterFeed extends Component {
  
  render() {
    return (
      <div className="twitter-wrapper">
        <p className="twitter-wrapper-side-header"> Twitter </p>
      </div>
    );
  }
}

class IngredientsBanner extends Component {
  constructor(props) {
    super(props);
  }

  get_source(category) {
    return `/ingredients/${category}.png`
  }

  get_ingredients() {
    let ingredients = [];
    if (!this.props.ingredients) {
      return ingredients;
    }
    
    this.props.ingredients.forEach(ingredient => {
      ingredients.push(
        <div className="ingredient">
          <img src={this.get_source(ingredient.category)} />
          <a href={ingredient.link} className="ingredient-name"> {ingredient.ingredient} </a> 
        </div>
      );
    });
    return ingredients;
  }

  render() {
    return (
      <div className="ingredients-wrapper"> 
        {this.get_ingredients()}
      </div>
    );
  }
}

class RecipeHomeBanner extends Component {

  constructor(props) {
    super(props);
    this.state = {
    recipe: this.props.recipe,
      expanded: false
    }
  }

  get_subheader() {
    return `Cook time ${this.props.recipe.cook_time}, ${this.props.recipe.cook_difficulty} Difficulty`
  }

  toggle() {
    this.setState({
      expanded: !this.state.expanded
    });
  }

	get_state() {
		if (this.state.expanded) {
			return "recipe-fab recipe-fab-clicked";
		} else {
			return "recipe-fab";
		}
	}

	get_overlay_state() {
		if (this.state.expanded) {
			return "recipe-overlay-popup";
		} else {
			return "recipe-overlay-popup hidden";
		}
	}

  render() {
		if (this.props.recipe) {
    	return (
      <div className="recipe-home-banner-wrapper">
        <a className="recipe-list-item-header banner-header" href={"/recipes/" + this.props.recipe._id}> { this.props.recipe.title } </a>
        <p className="recipe-list-item-subheader banner-subheader"> { this.get_subheader() } </p>
        <div className="recipe-list-banner">
          <img src={this.props.recipe.cover_photo} />
          <div className="recipe-overlay">
            <div 
              className={this.get_state()}
              onClick={() => this.toggle()}
              >
              <span className="recipe-fab-inside">+</span>
            </div>
            <div className={this.get_overlay_state()}>
              <p className="popup-title">{this.props.recipe.title}</p>
              <p className="subpopup-title">{this.get_subheader()}</p>
              <p className="popup-desc">{this.props.recipe.description.slice(0,200)}</p>
              <IngredientsBanner ingredients={this.props.recipe.ingredients} /> 
            </div>
          </div>
        </div>
      </div>
    	);
		} else {
			return (<div></div>);
		}
  }
}


class Tag extends Component {
    render() {
        return (
            <div className="tag">
                {this.props.tag}
            </div>
        );
    }
}

class Directions extends Component {
    get_directions() {
        let directions = [];
        if (this.props.directions) {
            this.props.directions.forEach(direction => {
                directions.push(
                    <Direction direction={direction} />
                );
            });
        }
        return directions;
    }

    render() {
        return (
            <div className="directions-wrapper">
                {this.get_directions()}
            </div>
        );
    }
}

class Direction extends Component {
    constructor(props) {
        super(props);
        this.state = {
            clicked: false 
        }
    }

    render() {
        let is_clicked = (this.state.clicked) ? "direction-wrapper clicked" : "direction-wrapper";
        return (
            <div className={is_clicked} onClick={() => {
                console.log("Clicked");
                this.setState({clicked: !this.state.clicked})
             }}>
                {this.props.direction}
            </div>
        );
    }
}

class RecipePage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipe: {}
        }
    }

    get_tags() {
        let tags = [];
        if (!this.state.recipe || !this.state.recipe.tags) {
            return tags;
        }
        this.state.recipe.tags.forEach(tag => {
            tags.push(
                <Tag tag={tag} />
            );
        });
        return tags;
    }

    componentDidMount(props) {
        fetch('/api/recipes/' + this.props.recipeid)
        .then(data => data.json())
		.then(data => {
            console.log("Found recipe " + JSON.stringify(data.recipe[0]));
            this.setState({
                recipe: data.recipe[0]
            });
		});
    }

    get_subheader() {
        return `Cook time ${this.state.recipe.cook_time}, ${this.state.recipe.cook_difficulty} Difficulty`
    }

    render() {
        if (this.state.recipe) {
            return (
                <div className="recipe-wrapper">
                    <div className="recipe-img-wrapper">
                        <img src={this.state.recipe.cover_photo} />
                    </div>
                    <br className="line"></br>
                    <p className="recipe-header">{this.state.recipe.title}</p>
                    <p className="recipe-subheader">{this.get_subheader()}</p>
                    <div className="recipe-section">
                        <p className="section-header">Tags</p>
                        <p className="section-content">{this.get_tags()}</p>
                    </div>
                    <div className="recipe-section">
                        <p className="section-header">Description</p>
                        <p className="section-content">{this.state.recipe.description}</p>
                    </div>
                    <div id="ing-banner" className="recipe-section">
                        <p className="section-header">Ingredients</p>
                        <IngredientsBanner ingredients={this.state.recipe.ingredients} /> 
                    </div>
                    <div className="recipe-section">
                        <p className="section-header">Directions</p>
                        <p className="section-content">
                            <Directions directions={this.state.recipe.recipe} />
                        </p>
                    </div>

                </div>
            );
        } else {
            return (<div></div>);
        }
    }
}

class Recipe extends Component {
  constructor(props) {
    super(props);
    this.state = {
        recipes: []
    }
  }

	componentWillReceiveProps(newProps) {
        this.get_recipes();
	}

	componentDidMount() {
        this.get_recipes();
	}

  get_recipes() {
		fetch('/api/recipes/')
		.then(data => data.json())
		.then(data => {
				console.log("Found recipes " + JSON.stringify(data.recipes));
				this.setState({
						recipes: data.recipes
				});
		});
	}

  get_recipe_of_day() {
		if (this.props.recipes) {
			return this.props.recipes[0];
		}
		return null;
	}
  
  render() {
		let recipes = this.state.recipes
		window.recipes = recipes;
		console.log("sending first" + JSON.stringify(recipes[0]));
		
		let banner = (recipes) ? 
            (<RecipeHomeBanner
				recipe={recipes[0]} 
				/>) :
			null;

		let feed = (recipes) ? 
			(<RecipeFeed 
          data={recipes}
          type="list"
          />) :
			null;


    return (
      <div className="recipe-wrapper">
        {banner}
        {feed}
      </div>
    );
  }
}

class SearchBar extends Component {
    constructor(props) {
      super(props);
      this.state = {
      }
    }
  
    render() {
        let placeholder = (this.props.query) ? this.props.query : "Begin your search"
        return (
            <div className="results-search-wrapper">
             <input type="text" onChange={(e) => this.props.updateSearch(e)} placeholder={placeholder}/>
            </div>
        );
    }
  }

class RecipeResultItem extends Component {
    constructor(props) {
        super(props);
    }

    get_subheader() {
        return `Cook time ${this.props.recipe.cook_time}, ${this.props.recipe.cook_difficulty} Difficulty`
    }

    get_tags() {
        let tags = [];
        if (!this.props.recipe || !this.props.recipe.tags) {
            return tags;
        }
        this.props.recipe.tags.forEach(tag => {
            tags.push(
                <Tag tag={tag} />
            );
        });
        return tags;
    }

    render() {
        return (
            <div className="result-item-wrapper">
                <a className="recipe-list-item-header" href={"/recipes/" + this.props.recipe._id }>
                    { this.props.recipe.title }
                </a>
                <p className="recipe-list-item-subheader">
                    { this.get_subheader() }
                </p>
                <p className="recipe-list-item-blurb">
                    { this.props.recipe.description.slice(1,200) }
                </p>
                <p className="section-content">{this.get_tags()}</p>
            </div>
        );
    }
}

class RecipeResults extends Component {
    constructor(props) {
        super(props);
        this.state = {
            recipes: [],
            query: this.props.query
        }
    }

    componentDidMount() {
        fetch('/api/recipes/')
		.then(data => data.json())
		.then(data => {
            this.setState({
                recipes: data.recipes,
            });
		}); 
    }

    get_results() {
        let results = [];
        if (this.state.recipes && this.state.query) {
            this.state.recipes.forEach(recipe => {
                if (recipe.title.toLowerCase().includes(this.state.query.toLowerCase())) {
                    results.push(
                        <RecipeResultItem recipe={recipe} />
                    );
                }
            });
        }
        return results;
    }

    update_query(e) {
        console.log("Updating search query: " + e.target.value);
        this.setState({
            query: e.target.value
        });
    }

    render() {
        return (
            <div className="results-wrapper">
                <div className='results-search-wrapper'>
                    <SearchBar 
                        query={this.props.query}
                        searchPage={true}
                        updateSearch={(e) => this.update_query(e)}
                        />
                </div>
                <div className="results-wrapper-wrapper">
                    {this.get_results()}
                </div>
            </div>
        )
    }
}

export {
    Article,
    ArticleCard,
    IngestableHandler,
    NewRecipe,
    RecipeFeed,
    TwitterFeed,
    Recipe,
    RecipePage,
    RecipeResults
}
