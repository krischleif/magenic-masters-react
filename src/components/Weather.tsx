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
	getCurrentWeather(location: Location): void {
		fetch(`${API}/weather?lat=${location.latitude}&lon=${location.longitude}&appId=${APIKEY}`)
			.then(res => res.json())
			.then(data => {
				this.setState({ weatherData: data });
				this.getFiveDayWeather(location);
			})
			.catch(err => console.log(err));
	}

	getFiveDayWeather(location: Location){
		fetch(`${API}/forecast?lat=${location.latitude}&lon=${location.longitude}&appId=${APIKEY}`)
			.then(res => res.json())
			.then(data => {
				this.setState({weatherForecast: data.list});
			})
	}

	componentDidMount() {
		this.getCurrentLocation()
			.then(location => this.getCurrentWeather(location))
			.catch(err => console.log(err));
	}

	render() {
		const weatherDisplayDefined = this.state.weatherData && (
			<WeatherDisplay weatherData={this.state.weatherData} />
		);

		let forecast: Array<WeatherData> = this.state.weatherForecast ? Array.from(this.state.weatherForecast) : [];

		const forecastDisplayDefined: Array<any> = [];
		let date = new Date();

		for (let i = 0; i < forecast.length; i=i+8){
			date.setDate(date.getDate() + 1);
			forecastDisplayDefined.push((<div className="col forecast-box"> <WeatherForecast weatherData={forecast[i]} location={this.state.weatherData?.sys.country} date={date.toLocaleDateString()} /> </div>));
		}
		
		

		return (
			<div className="weather-box">
				{weatherDisplayDefined}
				<div className="row w-75 vertical-center">
					{forecastDisplayDefined}
				</div>
			</div>
		);
	}
}