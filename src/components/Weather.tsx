import React from 'react';
import { Component } from 'react';

import WeatherDisplay from './WeatherDisplay';
import WeatherForecast from './WeatherForecast';

import { WeatherData } from '../types/WeatherData';
import {  Location } from '../types/Location';

interface Props {}

interface State {
	weatherData?: WeatherData;
	weatherForecast?: WeatherData[];
}

const APIKEY: string = '8d8ed2d5e65e0393836acf61688b87f0';
const API: string = 'https://api.openweathermap.org/data/2.5';

export default class Weather extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			weatherData: undefined,
			weatherForecast: undefined
		};
	}

	componentDidMount() {
		this.getCurrentLocation()
			.then(geolocation => this.getCurrentWeather(geolocation))
			.catch(err => console.log(err));
	}

	getCurrentLocation(): Promise<Location> {
		return new Promise((resolve, reject) => {
			if (!navigator.geolocation) {
				reject('You must enable Geolocation');
			} else {
				navigator.geolocation.getCurrentPosition(
					position => {
						resolve({
							latitude: position.coords.latitude,
							longitude: position.coords.longitude
						});
					},
					err => {reject(`Can't get current location: ${err.message}`);}
				);
			}
		});
	}

	//gets current weather data at a given location and saves it into state
	getCurrentWeather(geolocation: Location): void {
		fetch(`${API}/weather?lat=${geolocation.latitude}&lon=${geolocation.longitude}&appId=${APIKEY}`)
			.then(res => res.json())
			.then(data => {
				this.setState({ weatherData: data });
				this.getFiveDayWeather(geolocation);
			})
			.catch(err => console.log(err));
	}

	getFiveDayWeather(geolocation: Location){
		fetch(`${API}/forecast?lat=${geolocation.latitude}&lon=${geolocation.longitude}&appId=${APIKEY}`)
			.then(res => res.json())
			.then(data => {
				this.setState({weatherForecast: data.list});
			})
	}

	render() {
		const weatherDisplayDefined = this.state.weatherData && (
			<WeatherDisplay weatherData={this.state.weatherData} />
		);

		let forecast: Array<WeatherData> = this.state.weatherForecast ? Array.from(this.state.weatherForecast) : [];

		const forecastDisplayDefined = forecast.slice(0,5).map((item, index) => {
				let date = new Date();
				date.setDate(date.getDate() + (index + 1));
				return (<div className="col"> <WeatherForecast weatherData={item} location={this.state.weatherData?.sys.country} date={date.toLocaleDateString()} /> </div>)
		});

		return (
			<div>
				{weatherDisplayDefined}
				<div className="row w-75 vertical-center">
					{forecastDisplayDefined}
				</div>
			</div>
		);
	}
}