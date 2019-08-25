import React, { Component } from 'react';
import Button from '../Button/index';
import './Infrograph.css';

// Carousel displays a card for each Nation
class Infrograph extends Component {

    render() {
        return (
          <div className="infrographic-wrapper">
            <h1 className="text-shadow underline"> Millions of Americans are diagnosed as diabetic each year</h1>
            <div className="desc-wrapper">
              <p className="abstract"><i>abstract</i></p>
              <p> The DRIF is focused on finding a way to beat diabetes & improve millions of lives. Relentless research and testing is our only focus. 
            See how you can help today! The Best Hope for a Cure. Help Managing Diabetes. Research Updates & News. Be a Hero - Donate Now. Solely Focused on a Cure. </p>
            </div>
            <Button
              title="Read More"
              width="100px"
              />
          </div>
        );
    }
}


export default Infrograph;
