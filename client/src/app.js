import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from "react-router-dom";
import './App.css';

// import Home from './components/Home/index';
// import { NewUser, LoginUser } from './components/Auth/index';

// const User = ({ match }) => (
//   <Profile userId={match.params.id} country={match.params.country} />
// );


class App extends Component {
  state = {
      response: '',
  }

  componentDidMount() {
    this.callApi()
      .then(res => this.setState({ response: res.express }))
      .catch(err => console.log(err));
  }

  callApi = async () => {
     const res = await fetch('/api/hello');
     const body = await res.json();
     
     if (res.status !== 200) throw Error(body.message);

     return body;
  };

  render() {
    return (
      <Router>
        <div>
          <Navbar />
          // <Route exact path="/" component={} />
          // <Route exact path="/auth/register" component={NewUser} />
          // <Route exact path="/auth/login" component={LoginUser} />
        </div>
      </Router>
    );
  }
}

export default App;
