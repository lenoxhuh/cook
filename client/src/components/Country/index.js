import React, { Component } from 'react';
import { ArticleCard } from '../Article/index';
import './Country.css';

class Country extends Component {

    constructor(props) {
        super(props);
        this.state = {
            article: []
        }
        this.get_articles(this.props.name);
    }

    get_bg() {
        return "nations/" + this.props.name.replace(' ', '-') + ".jpg";
    }

    get_articles(name) {
        fetch('/api/article/' + name)
        .then(data => data.json())
        .then(data => {
            this.setState({
                articles: data.articles
            });
        });
    }

    componentWillReceiveProps(newProps) {
        this.get_articles(newProps.name);
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
                <div className="country-bg">
                    <img src={this.get_bg()} alt="."></img>
                </div>
                <div className="country-header">
                    <h1>{this.props.name}</h1>
                    <p> Most recent articles on {this.props.name}</p>
                </div>
                <div className="country-articles">
                    {cards}
                </div>
           </div>
        );
    }
}

export default Country;
