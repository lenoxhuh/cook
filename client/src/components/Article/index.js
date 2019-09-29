import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ReactPlayer from 'react-player';
import './Article.css';

// ArticleHandler collects info for articles
class ArticleHandler extends Component {
    constructor(props) {
        super(props);
        this.state = {
            article: {}
        }
        this.get_article(props);
    }

    componentDidMount() {
        this.get_article(this.props);
    }

    get_url(props) {
        if (props.id) {
            return `/api/article/${props.id}`;
        } 
    }

    get_article(props) {
        fetch(this.get_url(props))
        .then(data => data.json())
        .then(data => {
            var mut = data.articles;
            this.setState({
                articles: mut
            });
        });
    }

    get_cards() {
        if (!this.state.articles) {
            return;
        }
        var cards = [];
        this.state.articles.forEach((article) => {
            cards.push(<ArticleCard
                article={article}
                key={article._id}
            />);
        });
        return cards
    }

    render() {
        const cards = this.get_cards();
        return (
            <div className="article-wrapper">
                <div className="article-horizontal-wrapper">
                    {cards}
                </div>
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
        return `/article/${this.props.article._id}`;
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
                    <small className="article-date">{this.get_date()}</small>
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
            body
        } = this.state.formValues;

        if (title && photo && description && body) {
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

class ArticleListPage extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: []
        }
        this.get_articles();
    }

    get_articles() {
        fetch('/api/articles')
        .then(data => data.json())
        .then(data => {
            this.setState({
                articles: data.articles
            });
        });
    }

    componentWillReceiveProps(newProps) {
        this.get_articles();
    }

    get_cards() {
        if (!this.state || !this.state.articles) {
            return;
        }
        var cards = [];
        this.state.articles.forEach((article) => {
            cards.push(<ArticleCard article={article} key={article._id} />);
        });
        return cards;
    }

    render() {
        const cards = this.get_cards();
        return (
            <div className="country-container">
                <div className="country-articles">
                    {cards}
                </div>
           </div>
        );
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
       fetch(`/api/user/${id}`)
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
        return `/api/article/${props.id}`;
    }

    get_article(props) {
        fetch(this.get_url(props))
        .then(data => data.json())
        .then(data => {
            this.setState({
                article: data.article,
            }, () => {
                this.get_user(data.article.userId);
                this.get_curr();
            });
        });
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

    render() {
        if (this.state.article) {
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
                        <p>{this.get_date()}</p>
                        {this.get_images()}
                        {this.get_video()}
                        <p>{this.state.article.body}</p>
                        <br/>
                    </div>
                    <ArticleComments
                        articleId={this.state.article._id}
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

export {
    Article,
    ArticleCard,
    ArticleHandler,
    ArticleListPage,
    NewArticle
}
