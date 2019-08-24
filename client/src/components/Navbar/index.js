import React, { Component } from 'react';
import TextLoop from 'react-text-loop';
import { Link } from "react-router-dom";

import './Navbar.css';

const CAPTIONS = ["Recipes", "Articles", "About"];

class Navbar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: {}
        }
    }

    get_user() {
        fetch('/api/user')
        .then(data => data.json())
        .then(data => {
          let user = (data && data.user) ? data.user : null;
          this.setState({
            user: user
          });
        });
    }

    componentDidMount() {
        this.get_user();
    }

	render() {
	  return (
	  <div className="navbar-container">
        <NavLogo
            user={this.state.user}
            title={"Foodfly"}
            rerender={() => {
                this.setState({user: {}})
            }}
            />
        <p className="navbar-desc">Your health matters</p>
        <NavMenu links={['Recipes', 'Articles', 'About']}/>
      </div>
	  );
	}
}

class NavLogo extends Component {
    constructor(props) {
        super(props);
        this.state = {
            title: this.props.title,
            index: 0,
            caption: CAPTIONS[0]
        }
    }

    logout() {
        console.log("Logging out");
        fetch('/api/auth/logout');
        this.props.rerender();
    }

    get_auth() {
        const create = (this.props.user && this.props.user.write === "true") ?
            (<Link to="/article/new" className="nav-logo">New Article</Link>) :
            (<div></div>);

        if (this.props.user && Object.keys(this.props.user).length) {
            return (
                <div className="nav-logo auth">
                    {create}
                    <Link to="/" onClick={() => this.logout()} className="nav-logo">Logout</Link>
                </div>
            );
        } else {
            return (
							<div className="auth-container">
								<Link to="/auth/login" className="nav-logo auth">Login </Link>
								<Link to="/auth/register" className="nav-logo auth">Register</Link>
							</div>
						);
        }
    }

    render() {
        return (
            <div className="title">
                <h1>
                    <Link to="/" className="nav-logo">{this.state.title}</Link>
                    <small>{this.get_auth()}</small>
                </h1>
            </div>
        )
    }
}

class NavMenu extends Component {
    constructor(props) {
      super(props);
      this.state = {
        focus: 0,
        links: props.links
      }
    }

    get_state(id) {
      if (id === this.state.focus) {
        return "nav-link nav-focus";
      } else {
        return "nav-link";
      }
    }

    
    get_nav_links() {
      var links = []
      var i = 0;
      if (!this.state.links) {
        return links;
      }
      this.state.links.forEach(link => {
        links.push(<Link className={this.get_state(i)} to={"/"+link}>{link}</Link>);
        i++;
      });
      return links;
    }

    render() {
        return (
          <div>
            <div className="nav-wrapper">
              {this.get_nav_links()}
            </div>
            <SearchBar />
          </div>
        )
    }
}

class SearchBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
    }
  }

  render() {
    return (
      <div className="search-wrapper">
        <input type="text" placeholder="Begin your search"/>
      </div>
    )
  }
}

export default Navbar;
