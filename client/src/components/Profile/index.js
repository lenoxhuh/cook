import React, { Component } from 'react';
import { ArticleHandler } from '../Article/index';
import './Profile.css';

class Profile extends Component {

    // TODO wait for this to execute before rendering
    get_user = async (country, id) => {
        const res = await fetch(`/api/${country}/u/${id}`);
        const body = await res.json();
        return body;
    }

    constructor(props) {
        super(props);
        this.state = {
            user: null
        }
    }

    componentDidMount() {
        fetch(`/api/${this.props.country}/u/${this.props.userId}`)
        .then(data => data.json())
        .then(data => {
            this.setState({
                person: data.user
            });
        });
    }

    get_bg() {
        return `../../nations/${this.props.country.replace(' ', '-')}-flag.png`;
    }

    get_image_name(name) {
        return "../../profiles/" + name + ".png";
    }

    get_brief(person) {
        let school = (person && person.school) ? person.school : "The Hotchkiss School";
        let year = (person && person.age) ? person.age : "21";
        return `${school} | ${year}`;
    }

    render() {
        if (this.state.person) {
            const brief = this.get_brief(this.state.person);

            return (
                <div className="user-wrapper">
                    <div className="country-bg">
                        <img src={this.get_bg()} alt="."></img>
                    </div>
                    <div className="profile-pic user-pic">
                        <img src={this.get_image_name(this.state.person.name)} onError={e => e.target.style.display = 'none'} alt="." />
                    </div>
                    <div className="profile-header">
                        <h1>{ this.state.person.name }</h1>
                        <div className="profile-desc">
                            <div className="profile-row">
                                I'm interested in <b>{this.props.country}</b> from
                            </div>
                            <div className="profile-row">
                                { brief }
                            </div>
                            <br/>
                            <div className="profile-row">
                                <h3>More about me</h3>
                                <p>{this.state.person.description}</p>
                            </div>
                        </div>
                    </div>
                    <div className="articles">
                        <ArticleHandler userId={this.props.userId} country={this.props.country} />
                    </div>
                </div>
            );
        } else {
            return (
                <div className="user-wrapper">
                    <span>Loading profile...</span>
                </div>
            );
        }
    }
}

export default Profile;
