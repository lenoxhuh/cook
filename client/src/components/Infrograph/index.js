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
          data={data.divisions}
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

  render() {
    return (
      <div className="meal-plan-bar">
        <p className="meal-plan-title">
          {this.props.title}     
        </p>
      </div>
    );
  }
}

export {
  Infrograph,
  InfroModule,
  MealPlan
}
