import React, { Component } from 'react';
import './About.css';

class About extends Component {

    render() {
        return (
            <div className="about-container">
							<h2> About Foodly </h2>
							<p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit, ligula id ac integer cubilia quisque. Suspendisse interdum nullam arcu sit curae sollicitudin, libero condimentum diam faucibus pharetra, litora class viverra aliquam adipiscing. Accumsan adipiscing porttitor natoque fringilla mattis ridiculus parturient nulla litora mollis, vel tempus venenatis nascetur condimentum malesuada nostra curae magna bibendum metus, lobortis aliquam per blandit ligula erat habitasse nullam facilisis.
							</p>
              <br />
              <p>
              To share their unique stories, writers can post recipes, articles, or meal plans
              </p>
              <br />
              <p>
              Lorem ipsum dolor sit amet consectetur adipiscing, elit fames et leo litora conubia, vestibulum penatibus tempus dignissim condimentum. Commodo facilisi cum ligula elit mauris luctus nam id a, curabitur eros enim sodales semper imperdiet augue tempus sociis, inceptos egestas turpis sed porta fermentum eleifend sociosqu. Ante urna lobortis placerat nam potenti nostra ullamcorper sodales, lacinia gravida sollicitudin malesuada rhoncus consectetur tellus neque, ornare aliquam cubilia montes maecenas eleifend sagittis.
							</p>
              <br/>
              <div className="space"></div>
              <p>
              Lorem ipsum dolor sit amet consectetur adipiscing elit lacinia, maecenas ridiculus dictum laoreet sodales magnis faucibus justo, mattis libero integer bibendum vitae porttitor platea. Fermentum proin sem sagittis elementum est netus nec aliquet mollis, cursus bibendum dictumst malesuada sollicitudin ad mi eros, habitant suspendisse magna consequat eu lobortis auctor senectus. Ullamcorper vivamus litora volutpat dapibus fermentum inceptos tincidunt purus, nunc feugiat ante himenaeos vulputate primis sit penatibus nostra, interdum lobortis mus malesuada semper cursus accumsan.
              </p>
							<div className="space"></div>
							<div className="image-container">
								<img src="About.png"/>
							</div>
							<br />
				  	<div className="space"></div>
						<h2> Reach Us </h2>
            </div>
        );
    }
}

export default About;
