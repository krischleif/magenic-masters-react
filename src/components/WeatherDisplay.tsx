import React, { useState } from 'react';
import { Component, Fragment } from 'react';

import { WeatherData } from '../types/WeatherData';

interface Props {
	weatherData: WeatherData;
}

interface State {
	celsius: boolean;
}

export default function WeatherDisplay (props: Props) {
	const [celsius, setCelsius] = useState(props.weatherData.sys.country !== 'US');
	
	const { weatherData } = props;
	const degreeType: String = celsius ? 'Celsius' : 'Fahrenheit';
    
    const convertTemp = (temp: number): number => {
        let tempConvert: number = temp - 273.15;
        if(!celsius){
            tempConvert = (tempConvert * 1.8) + 32;
        }

        return tempConvert;
	}
	
	const degrees: number = convertTemp(weatherData.main.temp);

	return (
		<Fragment>
			<h1>
				In {weatherData.name} it looks like {weatherData.weather[0].description}
			</h1>
			<h3>It is {Math.round(degrees)} degrees {degreeType}</h3>
		</Fragment>
	);
}