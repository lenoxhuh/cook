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

const recipes = [
  {
        "title": "Green Juice 1",
        "cover_photo": "https://images.unsplash.com/photo-1473348164936-13be821e561c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "type": "recipe",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit, porta nam sociis pellentesque nec gravida montes rhoncus, dictumst varius felis lectus lacus curabitur. Placerat at praesent etiam class molestie aptent, arcu platea lectus litora vivamus donec, dignissim sociis ut maecenas fermentum.",
        "cook_time": "45",
        "cook_difficulty": "medium",
        "recipe": [
                "first thing",
                "second thing",
                "third thing",
                "last thing"
              ],
        "ingredients": [
          {
            "ingredient": "Apple",
            "category": "fruit",
            "link": "http://www.apple.com"
          },
          {
            "ingredient": "Kale",
            "category": "vegetable",
            "link": "http://www.kale.com"
          },
          {
            "ingredient": "Yogurt",
            "category": "Dairy",
            "link": "http://www.yogurt.com"
          }]
    },
    {
        "title": "Green Juice 2",
        "cover_photo": "https://images.unsplash.com/photo-1473348164936-13be821e561c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "type": "recipe",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit, porta nam sociis pellentesque nec gravida montes rhoncus, dictumst varius felis lectus lacus curabitur. Placerat at praesent etiam class molestie aptent, arcu platea lectus litora vivamus donec, dignissim sociis ut maecenas fermentum.",
        "cook_time": "45",
        "cook_difficulty": "medium",
        "recipe": [
                "first thing",
                "second thing",
                "third thing",
                "last thing"
              ],
        "ingredients": [
          {
            "ingredient": "Apple",
            "category": "fruit",
            "link": "http://www.apple.com"
          },
          {
            "ingredient": "Kale",
            "category": "vegetable",
            "link": "http://www.kale.com"
          },
          {
            "ingredient": "Yogurt",
            "category": "Dairy",
            "link": "http://www.yogurt.com"
          }]
    },
    {
        "title": "Green Juice 3",
        "cover_photo": "https://unsplash.com/photos/bPeqQXtfLPY",
        "type": "recipe",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit, porta nam sociis pellentesque nec gravida montes rhoncus, dictumst varius felis lectus lacus curabitur. Placerat at praesent etiam class molestie aptent, arcu platea lectus litora vivamus donec, dignissim sociis ut maecenas fermentum.",
        "cook_time": "45",
        "cook_difficulty": "medium",
        "recipe": [
                "first thing",
                "second thing",
                "third thing",
                "last thing"
              ],
        "ingredients": [
          {
            "ingredient": "Apple",
            "category": "fruit",
            "link": "http://www.apple.com"
          },
          {
            "ingredient": "Kale",
            "category": "vegetable",
            "link": "http://www.kale.com"
          },
          {
            "ingredient": "Yogurt",
            "category": "Dairy",
            "link": "http://www.yogurt.com"
          }]
    },
    {
        "title": "Green Juice 4",
        "cover_photo": "https://images.unsplash.com/photo-1473348164936-13be821e561c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "type": "recipe",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit, porta nam sociis pellentesque nec gravida montes rhoncus, dictumst varius felis lectus lacus curabitur. Placerat at praesent etiam class molestie aptent, arcu platea lectus litora vivamus donec, dignissim sociis ut maecenas fermentum.",
        "cook_time": "45",
        "cook_difficulty": "medium",
        "recipe": [
                "first thing",
                "second thing",
                "third thing",
                "last thing"
              ],
        "ingredients": [
          {
            "ingredient": "Apple",
            "category": "fruit",
            "link": "http://www.apple.com"
          },
          {
            "ingredient": "Kale",
            "category": "vegetable",
            "link": "http://www.kale.com"
          },
          {
            "ingredient": "Yogurt",
            "category": "Dairy",
            "link": "http://www.yogurt.com"
          }]
    },
    {
        "title": "Green Juice 5",
        "cover_photo": "https://images.unsplash.com/photo-1473348164936-13be821e561c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80",
        "type": "recipe",
        "description": "Lorem ipsum dolor sit amet consectetur adipiscing elit, porta nam sociis pellentesque nec gravida montes rhoncus, dictumst varius felis lectus lacus curabitur. Placerat at praesent etiam class molestie aptent, arcu platea lectus litora vivamus donec, dignissim sociis ut maecenas fermentum.",
        "cook_time": "45",
        "cook_difficulty": "medium",
        "recipe": [
                "first thing",
                "second thing",
                "third thing",
                "last thing"
              ],
        "ingredients": [
          {
            "ingredient": "Apple",
            "category": "fruit",
            "link": "http://www.apple.com"
          },
          {
            "ingredient": "Kale",
            "category": "vegetable",
            "link": "http://www.kale.com"
          },
          {
            "ingredient": "Yogurt",
            "category": "Dairy",
            "link": "http://www.yogurt.com"
          }]
    }

];

console.log(recipes);

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
        <RecipeFeed
          data={recipes}
          type="half-list"
          />
        <TwitterFeed />
    	</div>
	  );
	}
}

export default Home;
