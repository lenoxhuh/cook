import React, { Component } from 'react';
import { 
  VictoryBar, 
  VictoryChart, 
  VictoryAxis, 
  VictoryTheme,
  VictoryLabel,
  VictoryTooltip
} from 'victory';
import './Home.css';

import { 
  InfroModule, 
  Infrograph,
  MealPlan
} from '../Infrograph/index';

import { 
  RecipeFeed,
  TwitterFeed,
} from '../Recipe/index';

var diabetes_data = [
  {year: 2000, obesity: 30},
  {year: 2001, obesity: 40},
  {year: 2002, obesity: 43},
  {year: 2003, obesity: 40},
  {year: 2004, obesity: 48},
  {year: 2005, obesity: 50},
  {year: 2006, obesity: 65},
  {year: 2007, obesity: 70},
];

var activity_data = [
  {day: "Mon", hours: 1},
  {day: "Tue", hours: 2},
  {day: "Wed", hours: 1},
  {day: "Thu", hours: 3},
  {day: "Fri", hours: 1},
  {day: "Sat", hours: 4},
  {day: "Sun", hours: 1},
]

diabetes_data.forEach(datum => {
  return datum['label'] = datum['obesity'] + "%";
});

activity_data.forEach(datum => {
  return datum['label'] = datum['hours'] + "hrs";
});

const meal_plan_data = [
  {color: "#F59000", category: "Carbohydrates", divisions: [
    {type: "Simple", amount: 30},
    {type: "Complex", amount: 50},
    {type: "Sugars", amount: 20},
  ]},
  {color :"#223037", category: "Protein", divisions: [
    {type: "Meat", amount: 40},
    {type: "Vegetables", amount: 40},
    {type: "Other", amount: 20},
  ]},
  {color: "#2A704D", category: "Vegetables", divisions: [
    {type: "Roasted", amount: 20},
    {type: "Salad", amount: 40},
    {type: "Green Juice", amount: 40},
  ]}
]

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      recipes: null,
      selected: 0
    }
  }

  componentDidMount(props) {
    fetch('/api/recipes/')
    .then(data => data.json())
    .then(data => {
          console.log("Found recipes " + JSON.stringify(data.recipes));
          this.setState({
              recipes: data.recipes
          });
    });
  }

	render() {
    let recipes = (this.state.recipes) ? 
    (<RecipeFeed 
      data={this.state.recipes}
      selected={this.state.selected}
      type="half-list"/>) : (<div></div>);

	  return (
	  	<div className="App">
        <Infrograph modules={[
          (
            <InfroModule
              description={"Stats"}
              graph={(
                <VictoryChart
                  domainPadding={20}
                  theme={VictoryTheme.material}
                  >
                  <VictoryLabel 
                    text={"Obesity Data"}
                    textAnchor="middle"
                    x={155} y={10}
                    />
                  <VictoryAxis
                    independentAxis
                    tickValues={diabetes_data.keys()}
                    tickFormat={(x) => (`${x}`)}
                    />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(y) => (`${y}%`)}
                    />
                    <VictoryBar 
                      data={diabetes_data}
                      barWidth={15}
                      style={{ 
                          data: {
                            position: "relative",
                            top: "-5px",
                            strokeLinejoin: "round",
                            strokeWidth: 4,
                            fill: "#64B963"
                          },
                          labels: {
                            fill: "white"
                          }
                      }}
                      labelComponent={<VictoryTooltip
                        cornerRadius={15}
                        flyoutStyle={{fill:"#64B963", stroke: "none", color: "white"}}
                        />}
                      x="year"
                      y="obesity"
                      />
                 </VictoryChart>)}
            />
          ),
          (
            <InfroModule
              description="Meal Plan"
              graph={<MealPlan data={meal_plan_data} />}
            />
          ),
          (   
            <InfroModule
              description="Exercise"
              graph={(
                <VictoryChart
                  style={{labels: {fill: "white"}}}
                  domainPadding={20}
                  theme={VictoryTheme.material}
                  >
                  <VictoryLabel 
                    text={"Exercse Plan"}
                    textAnchor="middle"
                    x={155} y={10}
                    />
                  <VictoryAxis
                    independentAxis
                    tickValues={activity_data.keys()}
                    tickFormat={(x) => (`${x}`)}
                    />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(y) => (`${y} hrs`)}
                    />
                    <VictoryBar 
                      data={activity_data}
                      barWidth={20}
                      style={{ 
                          data: {
                            position: "relative",
                            top: "-5px",
                            strokeLinejoin: "round",
                            strokeWidth: 4,
                            fill: "#F59000"
                          },
                          labels: {fill: "white"}
                      }}
                      labelComponent={<VictoryTooltip
                        cornerRadius={15}
                        flyoutStyle={{fill:"#F59000", stroke: "none", color: "white"}}
                        />}
                      x="day"
                      y="hours"
                      />
                 </VictoryChart>)}
              />
          )
        ]}/>
        {recipes}
        <TwitterFeed />
    	</div>
	  );
	}
}

export default Home;
