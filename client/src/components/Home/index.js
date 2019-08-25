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
  HomeRecipesFeed,
} from '../RecipesFeed/index';

import { recipes } from '../../data/recipes';

var diabetes_data = [
  {year: 2000, obesity: 30},
  {year: 2001, obesity: 40 },
  {year: 2002, obesity: 43},
  {year: 2003, obesity: 40},
  {year: 2004, obesity: 48},
  {year: 2005, obesity: 50},
  {year: 2006, obesity: 65},
  {year: 2007, obesity: 70},
];

diabetes_data.forEach(datum => {
  return datum['label'] = datum['obesity'] + "%";
});

const meal_plan_data = [
  {category: "Carbohydrates", divisions: [
    {type: "Simple", amount: 30},
    {type: "Complex", amount: 50},
    {type: "Sugars", amount: 20},
  ]},
  {category: "Protein", divisions: [
    {type: "Meat", amount: 40},
    {type: "Vegetables", amount: 40},
    {type: "Other", amount: 20},
  ]},
  {category: "Vegetables", divisions: [
    {type: "Roasted", amount: 20},
    {type: "Salad", amount: 40},
    {type: "Green Juice", amount: 40},
  ]}
]

class Home extends Component {
	render() {
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
                          }
                      }}
                      labelComponent={<VictoryTooltip
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
            />
          )
        ]}/>
        <HomeRecipesFeed 
          recipes={recipes}
          />
    	</div>
	  );
	}
}

export default Home;
