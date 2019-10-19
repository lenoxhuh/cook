import React, { Component } from 'react';
import './About.css';

class About extends Component {

    render() {
        return (
            <div className="about-container">
							<h2> What is House of Gainz?</h2>
							<p>
          House of Gainz was created to become an online platform to help with this cause in educating the youth about fitness, healthy eatting, and nutrition. Our mission is to ensure that younger students are able to have access to educational information on how to live a healthy lifestyle to reduce the number of young children with obesity. 
							</p>
              <br />
              <div className="space"></div>
              <h2> Meet the Founder of House of Gainz </h2>
              <div className="image-container">
								<img src="profile.jpg"/>
							</div>
              <p>
          My name is Lenox Huh, and I play lacrosse at IMG Academy. On the lacrosse team, we are expected to maintain a balanced nutrition plan in order to supplement our rigorous training routine. While student-athletes at our school regularly meet with nutritionists and are provided with optimal meals, most aspiring athletes our age lack the resources necessary to reach their goals.
							</p>
              <p>
          This website, HouseOfGainz, redefines the traditional fitness application by providing readers the information they actually need. Nutrition Guides, Recipes, and Articles from a collection of world-class nutritionists and my own personal experiences as a high school athlete will equip users with readily available information that transcends any other internet resource. 
              </p>
              <p>
          I hope this platform gives insight to approaching your fitness goals and inspires you to get those Gainz! 💪 Happy lifting!
              </p>
              <p>
            Best,
          </p>
            <p> Lenox Huh </p>
				  	<div className="space"></div>
						<h2> How To use This App </h2>
            <p>
            Please click the Register button and fill in the necessary fields to successfully sign up as a member of House of Gainz. 
            </p>
            <p>
          Once you register an account, you will not be able to post recipes or articles yet until you get approval from the House of Gainz admin. Please email  <a href="housegainz@gmail.com" style={{"color":"blue"}}>housegainz@gmail.com</a> with your name and a 3-4 paragraph on  why you want to be a writer for House of Gainz. We should get back to you within 24 hours after an email submission is sent to be a writer. 
            </p>
            <p>
          Once you are approved, you will see a Create a Recipe and Create an Article button on the app once you are verified. Now, you can post your recipes and informative articles on our platform to share your knowledge of health and nutrition to our users! 
            </p>
            <p>
          Please refrain from posting anything inappropriate. Your account will be suspended immediately if we see any hurtful content posted on our platform as we care about our user’s experience for a safe environment to learn about fitness and health.
            </p>

            </div>
        );
    }
}

export default About;
