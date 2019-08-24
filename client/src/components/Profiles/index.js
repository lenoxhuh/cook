import React, { Component } from 'react';
import { Link } from "react-router-dom";
import HorizontalScroll from 'react-scroll-horizontal';
import './Profiles.css';

class Profile extends Component {
    get_image_name(name) {
        return "profiles/" + name + ".png";
    }

    get_profile(country, userId) {
        return `${country}/profile/${userId}`;
    }

    render() {
        return (
            <div className="profile-wrapper">
                <div className="profile-pic">
                    <img src={this.get_image_name(this.props.name)} onError={e => e.target.style.display = 'none'} alt="."/>
                </div>
                <h3 className="profile-name">{this.props.name}</h3>
                <p className="profile-desc">{this.props.person.description.substring(0,250)}</p>
                <br />
                <Link className="card-link" to={this.get_profile(this.props.country, this.props.person.id)}>Read More</Link>
            </div>
        )
    }
}

class Profiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            users: []
        }
        this.get_profiles();
    }

    componentDidMount() {
        fetch("/api/users")
        .then(data => data.json())
        .then(data => {
            this.setState({
                users: data.users
            });
        });
    }

    get_profiles() {

        var profiles = [];
        for (var user in this.state.users) {
            let u = this.state.users[user];
						if (u.write === "true") {
								profiles.push(<Profile
									country={u.country}
									name={u.name}
									person={u}
									key={u.username}
								/>);
						}
        }

        return profiles;
    }

    render() {
        const profiles = this.get_profiles();
        return (
            <div className="profiles-container">
                <div className="profiles-header">
                    <h2> Our Contributors </h2>
                    <p> Scroll down to swipe right for more profiles! Scroll up to swipe left for previous profiles!</p>
                </div>
                <div className="profiles-wrapper">
										<HorizontalScroll>
												{profiles}
										</HorizontalScroll>
                </div>
            </div>
        );
    }
}

export default Profiles;
