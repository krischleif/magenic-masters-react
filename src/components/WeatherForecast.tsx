import React from 'react';
import { Component, Fragment } from 'react';

import { WeatherData } from '../types/WeatherData';

interface Props {
    weatherData: WeatherData;
    location?: string;
    date: string;
}

interface State {
    celsius: boolean;
}

export default class WeatherForecast extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
            celsius: this.props.location !== 'US'
		};
	}
    
    convertTemp(temp: number): number {
        let tempConvert: number = temp - 273.15;
        if(!this.state.celsius){
            tempConvert = (tempConvert * 1.8) + 32;
        }

        return tempConvert;
    }

	render() {
        const { weatherData } = this.props;
        const degreeType: String = this.state.celsius ? 'C' : 'F';
        const degrees: number = this.convertTemp(weatherData.main.temp);

        return (
			<Fragment>
                <p>On {this.props.date}</p> 
                <p>It will be {Math.round(degrees)} {degreeType} outside</p><p> Conditions: {weatherData.weather[0].main}</p>
			</Fragment>
		);
	}
}