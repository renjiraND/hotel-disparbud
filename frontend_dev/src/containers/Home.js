import React from "react";
import axios from 'axios'


export default class Home extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			hotels: []
		}
	}

	updateHotelList() {
		console.log('updateHotelList lhoo');
		var config = {
			// 'Access-Control-Allow-Origin': '*'
		};
		axios.get('http://localhost:8000/hotels/', config)
		     .then(response => {
		     	console.log('DONE GET HOTELS')
		     	console.log(response);
		     	this.setState({ hotels: response['results'] })
		     });
	}

	componentWillMount() {
		console.log('[componentWillMount]');
		this.updateHotelList();
	}

	render() {
		console.log(this.state.hotels);
		return (
		    <div>
				<h2>Home</h2>
				Welcome to Disparbud Hotel Data Center!
				<div>
					<ul>
						{this.state.hotels.map(hotel => <li>{hotel.name}</li>)}
					</ul>
				</div>
		    </div>
	  	);
	}
}