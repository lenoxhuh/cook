import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Card.css';

class Card extends Component {
    get_first_post(name) {
        return "/" + name;
    }

    render() {
        return (
            <div className="card card-outline">
                <CardLogo image={this.props.image} />
                <div className="card-body">
                    <h3>{this.props.title}</h3>
                    <p>{this.props.description}</p>
                    <br />
                    <Link to={this.get_first_post(this.props.title)} className="card-link">Read More</Link>
                </div>
            </div>
        );
    }
}

class CardLogo extends Component {
    render() {
        return (
            <div className="card-pic">
                <img src={this.props.image} alt="."/>
            </div>
        )
    }
}

export default Card;
