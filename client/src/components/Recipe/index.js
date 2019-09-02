import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import './Recipe.css';

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
        if (props.id && props.country) {
            // Country/ArticleID
            return `/api/article/${props.country}/${props.id}`;
        } else if (props.userId && props.country) {
            // Country find matching userId
            return `/api/article/${props.country}`;
        }
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
    return `Cook time ${this.state.recipe.cook_time}, ${this.state.recipe.cook_difficulty} Difficulty`
  }

  render() {
    return (
      <div 
        className="recipe-feed-list-item-wrapper"
        onClick={() => this.props.update_selected(this.props.list_id)}
        >
        <div className="recipe-list-item-ball"></div>
        <p className="recipe-list-item-header"> { this.props.recipe.title } </p>
        <p className="recipe-list-item-subheader"> { this.get_subheader() } </p>
        <p className="recipe-list-item-blurb">{ this.props.recipe.description } </p>
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

class NewArticle extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            formValues: {
                country: "China"
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

    handleSubmit(event) {
        fetch('/api/article', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(this.state.formValues),
        });
    }

    getValid() {
        let {
            title,
            photo,
            description,
            country,
            body
        } = this.state.formValues;

        if (title && photo && description && country && body) {
            return "valid";
        } else {
            return "invalid";
        }
    }

    render() {
        return (
            <div className="form-wrapper">
                <div className="form-header">
                    <h1>Create a new Article</h1>
                    <p>Fill out the following form and one will be created</p>
                </div>
                <form id="form" action="/api/article" method="POST">
                    <div className="form-row">
                        <label htmlFor="article">Article Title</label>
                        <input name="title" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="photo">Cover Photo</label>
                        <input name="photo" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                     <div className="form-row">
                        <label htmlFor="description">Description</label>
                        <textarea id="description" name="description"  onChange={this.handleChange.bind(this)}></textarea>
                    </div>

                    <div className="form-row select">
                        <label htmlFor="country">Country</label>
                        <select id="country" type="country" name="country" onChange={this.handleChange.bind(this)}>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="India">India</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Research">Research</option>
                        </select>
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
                        <label htmlFor="video">Video</label>
                        <input id="video" name="video" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <button className={this.getValid()}>Submit</button>
                    </div>
                </form>
            </div>
        )
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

class Recipe extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="recipe-wrapper">
      </div>
    );
  }
}

export {
    Article,
    ArticleCard,
    IngestableHandler,
    NewArticle,
    RecipeFeed,
    TwitterFeed,
    Recipe
}
