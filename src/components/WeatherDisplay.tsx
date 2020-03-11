import React from 'react';
import { Component, Fragment } from 'react';

import { WeatherData } from '../types/WeatherData';

interface Props {
	weatherData: WeatherData;
}

interface State {
	celsius: boolean;
}

export default class WeatherDisplay extends Component<Props, State> {
	constructor(props: Props) {
		super(props);
		this.state = {
			celsius: this.props.weatherData.sys.country !== 'US'
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
        const degreeType: String = this.state.celsius ? 'Celsius' : 'Fahrenheit';
        const degrees: number = this.convertTemp(weatherData.main.temp);

        return (
			<Fragment>
				<h1>
					Current conditions in {weatherData.name} are:
				</h1>
				<h2>{weatherData.weather[0].main}</h2>
                <h3>It is {Math.round(degrees)} degrees {degreeType}</h3>
			</Fragment>
		);
	}
}