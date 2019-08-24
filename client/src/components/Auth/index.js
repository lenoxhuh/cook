import React, { Component } from 'react';
import { Link } from "react-router-dom";
import './Auth.css';

class NewUser extends Component {
    constructor(props) {
        super(props);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.state = {
            formValues: {
                country: "China"
            },
            valid: null,
            status_msg: null
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
        let valid = this.getValid();
        let status_msg = "Failed to create User";

        if (valid) {
						console.log("registering " + JSON.stringify(this.state.formValues));
            fetch('/api/auth/register', {
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
							console.log(err);
							window.location.pathname="/auth/login";
						});

						// .then(response => {
						// 	console.log("hmm");
						// 	if (response.ok) {
						// 		return response.json();
						// 	} else {
						// 		console.log("error");
						// 	}
						// }).then(data => {
						// 	console.log(data);
						// })
						// .catch(err => {
						// 	console.log(err)
						// });

						// .then(data => {
						// 	console.log("data " + JSON.stringify(data));
						// 	window.location.href = "/login";
						// 	this.setState({
            // 		valid: valid,
            // 		status_msg: "Successfully registered User"
        		// 	});
						// });
				}
      }

    getValid() {
        let {
            username,
            country,
            name,
						age,
						school,
            description,
            password,
            verify_password,
        } = this.state.formValues;

        if (username && country && name && age && school && description && password && password === verify_password) {
            console.log("valid");
            return "valid";
        } else {
            return "invalid";
        }
    }

		disableBtn() {
			return (!this.getValid()) ? "disabled" : "";
		}

    get_flash() {
       return (this.state.status_msg) ? this.state.status_msg : "";
    }

    render() {
        return (
            <div className="form-wrapper">
                <p>{this.get_flash()}</p>
                <form id="form" action={`/api/auth/register`} method="POST">
                    <div className="form-row">
                        <label htmlFor="username">Email</label>
                        <br />
                        <input id="username" name="username" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row select">
                        <label htmlFor="country">Interested Country</label>
                        <select id="country" type="country" name="country" onChange={this.handleChange.bind(this)}>
                            <option value="China">China</option>
                            <option value="Colombia">Colombia</option>
                            <option value="India">India</option>
                            <option value="Sri Lanka">Sri Lanka</option>
                            <option value="South Africa">South Africa</option>
                            <option value="Hungary">Hungary</option>
														<option value="Cambodia">Cambodia</option>
                            <option value="Philippines">Philippines</option>
                            <option value="Italy">Italy</option>
                            <option value="Canada">Canada</option>
                            <option value="Dominican Republic">Dominican Republic</option>
                            <option value="Australia">Australia</option>
                        </select>
                    </div>

                    <div className="form-row">
                        <label htmlFor="name">Full Name</label>
                        <br />
                        <input id="name" name="name"  onChange={this.handleChange.bind(this)} />
                    </div>

										<div className="form-row">
                        <label htmlFor="age">Age</label>
                        <br />
                        <input id="age" name="age"  onChange={this.handleChange.bind(this)} />
                    </div>

										<div className="form-row">
                        <label htmlFor="school">School</label>
                        <br />
                        <input id="school" name="school"  onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="description">Bio</label>
                        <br />
                        <textarea id="description" name="description"  onChange={this.handleChange.bind(this)}></textarea>
                    </div>

                    <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input id="password" name="password" type="password" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="verify_password">Verify Password</label>
                        <br />
                        <input id="verify_password" name="verify_password" type="password" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <button disabled={this.getValid() === "invalid"} className={this.getValid()}>Submit</button>
                    </div>
                </form>
            </div>
        )
    }
}

class LoginUser extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.state = {
            formValues: {}
        }
    }

    getValid() {
        let {
            username,
            password,
        } = this.state.formValues;

        if (username && password) {
            console.log("valid");
            return "valid";
        } else {
            return "invalid";
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

    handleLogin(event) {
        fetch('/api/auth/login', {
          method: 'POST',
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
        //   body: JSON.stringify(this.state.formValues),
        });
      }

    render() {
        return (
            <div className="form-wrapper">
                <form id="form" action="/api/auth/login" method="POST">
                    <div className="form-row">
                        <label htmlFor="username">Email</label>
                        <br />
                        <input id="username" name="username" type="text" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <label htmlFor="password">Password</label>
                        <br />
                        <input id="password" name="password" type="password" onChange={this.handleChange.bind(this)} />
                    </div>

                    <div className="form-row">
                        <button className={this.getValid()}>Login</button>
                    </div>

                    <div className="form-row">
                        <Link to="/auth/register" className="register-link">Register</Link>
                    </div>
                </form>
            </div>
        )
    }
}

export {
    NewUser,
    LoginUser
}
