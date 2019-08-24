import React, { Component } from 'react';
import './Home.css';

import Infrograph from '../Infrograph/index';

class Home extends Component {
	render() {
	  return (
	  	<div className="App">
        <Infrograph />
    	</div>
	  );
	}
}

export default Home;
