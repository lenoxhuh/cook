import React, { Component } from 'react';
import Card from "../Card/index";
import HorizontalScroll from 'react-scroll-horizontal';
import './Carousel.css';

// Temporary data
// TODO move to JSON file
const NATIONS={
    "Sri Lanka": {
        title: "Sri Lanka",
        description: "Capitals : Colombo; Sri Jayewardenepura Kotte\n" + "Form of Government : Unitary multiparty republic with one legislative house\n"
        + "Population: 21,442,000 (2017)\n" + "Population Distribution : 18.5% Urban ; 81.5% Rural\n"
        + "Official Language : Sinhala; Tamil\n" + "GNI : US$ 80,100,000,000 (2016)\n" + "GNI Per Capita : US$ 3,780 (2016)\n"
    },
    "Dominican Republic": {
        title: "Dominican Republic",
        description: "Capitals : Santo Domingo\n" + "Head of State : President Danilo Medina\n" + "Form of Government : multiparty republic with two legislative houses.\n"
        + "Land : 18,653 Sq Mi\n" + "Population: 10,277,000 (2017)\n" + "Official Language : Spanish\n"  + "GNI : US$ 68,030,000,000 (2016)\n" + "GNI Per Capita : US$ 6,390 (2016) \n"
    },
    "India": {
        title: "India",
        description: "Capitals : New Delhi\n" + "Head of State : President Ram Nath Kovind\n" + "Form of Government : Multiparty republic with national Council of Provinces and National Assembly \n"
        + "Land : 1,222,550 Sq Mi\n" + "Population: 1,342,550,000 (2017)\n" + "Population Distribution :  32.7% Urban, 67.3% Rural\n"
        + "Official Language : English\n" + "GNI Per Capita : US $ 1,680 (2016)\n"
    },
    "South Africa": {
        title: "South Africa",
        description: "Capitals : Pretoria, Bloemfontein, Town\n" + "Head of State : President Cyril Ramaphosa\n" + "Form of Government : Single-party people's republic with one legislative house\n"
        + "Land : 471,359 Sq Mi\n"+ "Population:  56,875,000 (2017)\n" + "Population Distribution :  65.8% Urban, 34.2% Rural (2017)\n"
        + "Official Language : More than half are Afrikaan whose descendant include Dutch, French and German settlers.\n" + "The rest speaks English when they are descendants of the British.\n"
        + "GNI : US$ 306,555,000,000 (2016)\n"  + "GNI Per Capita : US$ 5,480\n"
    },
    "Colombia": {
        title: "Colombia",
        description: "Capitals : Bogota\n" + "Head of State : President Ivan Duque\n" + "Form of Government : Unitary, multiparty republic with the Senate and the House of Representatives\n"
        + "Land : 440,831 Sq Mi\n" + "Population: 49,700,000 (2017)\n" + "Population Distribution : 76.4% Urban, 23.6% Rural (2015)\n"
        + "Official Language : Spanish\n" + "GNI Per Capita : US$ 6,320\n"
    },
    "China": {
        title: "China",
        description: "Capitals : Beijing; Sri\n" + "Head of State : President Xi Jinping\n" + "Form of Government : Single-party people's republic with one legislative house\n"
        + "Population: 1,384,042,000 (2017)\n" + "Population Distribution : 55.6% Urban, 44.4% Rural (2015)\n"
        + "Official Language : Mandarin Chinese\n" + "GNI : US$ 307,430,000,000 (2016)\n" + "GNI Per Capita : US$ 6,320 (2016)\n"
    },
    "Italy": {
        title: "Italy",
        description: "Capitals : Rome\n" + "Head of State : Sergio Mattarella\n" + "Form of Government : The politics of Italy are conducted through a parliamentary republic with a multi-party system.\n"
        + "Population: 60,590,000 (2017)\n" + "Official Language : Italian\n"  + "GNI Per Capita : US$ 31,700\n"
    },
	  "Canada": {
				title: "Canada",
        description: "Capitals : Ottawa\n" + "Head of State :  Queen of Canada (British Monarch) Elizabeth II, represented by Governor General Julie Payette\n"
        + "Form of Government : federal multiparty parliamentary state with two legislative houses\n"
        + "Land : 3,855,103 Sq Mi\n"
        + "Population: 35,546,000(2017)\n" + "Population Distribution : 81.8% Urban, 18.2% Rural (2017)\n"
        + "Official Language : English, French\n" + "GNI : US$ 1,584,301,000,000 (2016)\n" + "GNI Per Capita : US$ 43,660 (2016)\n"
		}
};

// Carousel displays a card for each Nation
class Carousel extends Component {
    get_image_name(name) {
        return name.replace(" ", "-") + ".png";
    }

    get_cards() {
        var cards = []
        for (var key in NATIONS) {
            var nation = NATIONS[key];
            cards.push(<Card
                title={nation.title}
                key={nation.title}
                description={nation.description}
                image={this.get_image_name(nation.title)}
                />
            );
       }
       return cards;
    }

    render() {
        const cards = this.get_cards();
        return (
        		<div className="cards-container">
								<div className="profiles-header">
										<h2 style={{"text-align":"center"}}> Countries </h2>
										<p className="carousel-info" style={{ "margin":"0 auto"}}>Scroll down to swipe right for more countries. Scroll up to swipe left for previous countries.</p>
								</div>
								<HorizontalScroll style={{"padding":"0 40px"}}>
									{cards}
								</HorizontalScroll>
            </div>
        );
    }
}

export default Carousel;
