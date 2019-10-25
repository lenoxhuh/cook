import React, { Component } from 'react';
import './Button.css';

// Button
class Button extends Component {

    constructor(props) {
      super(props);
      this.state = {
      }
    }

    render() {
        return (
          <div 
            onClick={() => this.props.onClick()}
            className="button-wrapper" 
            style={{
              width: this.props.width
            }}
            >
            {this.props.title}      
          </div>
        );
    }
}

export default Button;
