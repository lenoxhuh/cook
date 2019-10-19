import React, { Component } from 'react';
import Button from '../Button/index';
import './Infrograph.css';

class Infrograph extends Component {

  constructor(props) {
    super(props);
    this.state = {
      focused: 0
    }
  }

  get_modules() {
    return this.props.modules;
  }

  render() {
    return (
      <div className="infrograph">
        <div className="infrographic-wrapper">
          <h1 className="text-shadow underline"> In the United States alone, nearly one in five children between the ages of 6 to 19 are obese, and one in three are overweight. </h1>
          <div className="desc-wrapper">
            <p className="abstract"><i>abstract</i></p>
            <p>In 2010, Michelle Obama started the Let’s Move! Initiative to combat child obesity through active lifestyle and healthy eating through community involvement. House of Gainz was created to become an online platform to help with this cause in educating the youth about fitness, healthy eating, and nutrition.</p>
          </div>
          <Button
            title="Getting Started"
            width="150px"
            />
        </div>
        <div className="infromodules-wrapper">
            {this.get_modules()}
        </div>
      </div>
      );
    }
}

class InfroModule extends Component {

  constructor(props) {
    super(props);
    this.state = {
    }
  }
  
  render() {
    return (
      <div className="module-wrapper-wrapper">
        <div className="module-wrapper">
          {this.props.graph}
        </div>
        <p className="module-description">
          {this.props.description}
        </p>
      </div>
    );
  }

}

class MealPlan extends Component {
  
  constructor(props) {
    super(props);
  }

  get_plans() {
    var plans = [];
    if (!this.props.data) {
      return plans;
    }

    this.props.data.forEach((data) => 
      plans.push(
        <MealPlanBar 
          title={data.category}
          divisions={data.divisions}
          color={data.color}
          />
      )
    );
    return plans;
  }

  render() {
    return (
      <div className="meal-plan-wrapper">
        {this.get_plans()}
      </div>
    );
  }
}

class MealPlanBar extends Component {
  constructor(props) {
    super(props);
  }

  get_bars() {
    let bars = [];
    if (this.props.divisions) {
      this.props.divisions.forEach(division => {
        bars.push(
          <div className="bar" style={{
            "width": `${division.amount}%`,
            "height": "100%",
            "background-color": `${this.props.color}`,
            "position": "relative",
          }}>
            <p className="bar-desc">{division.type}</p>
          </div>
        );
      });
    }
    return bars;
  }

  render() {
    return (
      <div className="meal-plan-bar">
        <p className="meal-plan-title">
          {this.props.title}     
        </p>
        {this.get_bars()}
      </div>
    );
  }
}

export {
  Infrograph,
  InfroModule,
  MealPlan
}
