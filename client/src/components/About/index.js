import React, { Component } from 'react';
import './About.css';

class About extends Component {

    render() {
        return (
            <div className="about-container">
							<h2> About Global Conversation </h2>
							<p>
              Global Conversation is an interactive platform for students around the world to engage in conversations and to reflect on their experiences traveling abroad.
							</p>
              <br />
              <p>
              To share their unique stories, writers can post journals, photos, or videos, while the readers can gain insight into different parts of the world through the lenses of our writers. Also, users can actively interchange comments, engaging in a meaningful conversation with each other under each post.
              </p>
              <br />
              <p>
              There are too many stories to be heard and so many interesting people to meet. So please share your stories! If your country is not an option on our website, please message <a href="mailto:matt@globalconversation.us">matt@globalconversation.us</a>
							</p>
              <br/>
              <div className="space"></div>
              <h2> Become a Writer for Global Conversation </h2>
              <p> If you are interested in posting your journals, photos, or videos: </p>
              <br />
              <p> Step 1: Make a profile (Login button) </p>
              <br/>
              <p> Step 2: Message <a href="mailto:contact@globalconversation.us">contact@globalconversation.us</a> and include the following:</p>
              <p> Your full name </p>
              <p> A photo of yourself. Please send a .png file </p>
              <p> A PDF version of your pieces, photo file, or a youtube url of your video  </p>
              <br/>
              <p> Step 3 : Wait for an email from us that we have reviewed your pieces as proper content.</p>
              <br/>
              <p> Step 4 : Post and share your experience!</p>
              <br/>
              <p> Thank you and we hope to share your story soon! </p>
							<div className="space"></div>
							<div className="image-container">
								<img src="About.png"/>
							</div>
							<br />
              <p> I am an 18-year-old senior at The Hotchkiss School in Lakeville, CT. After my summer trip to Sri Lanka and India prior to my senior year,
              I was motivated to create a platform where students can submit their reflections on the places that they have traveled around the world. </p>
              <br />
              <p> I sincerely hope Global Conversation can bring us all one step closer to each other!</p>
              <br />
              <p> Please email <a href="mailto:matt@globalconversation.us">matt@globalconversation.us</a> if you want to learn more about this platform. </p>
				  	<div className="space"></div>
						<h2> Reach Us </h2>
					<p>
						Instagram: <a href="https://www.instagram.com/globalconvo/">@globalconvo</a>
					</p>
					<p>
						Facebook: <a href="https://fb.me/globalconversation.us">https://fb.me/globalconversation.us</a>
					</p>
          <p>
						Email: <a href="mailto:contact@globalconversation.us">contact@globalconversation.us</a>
					</p>
        </div>
        );
    }
}

export default About;
