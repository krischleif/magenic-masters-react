import React, { useState } from 'react';
import { Fragment } from 'react';

import { WeatherData } from '../types/WeatherData';

interface Props {
    weatherData: WeatherData;
    location?: string;
    date: string;
}

export default function WeatherForecast (props: Props) {
    const [celsius, setCelsius] = useState(props.location !== 'US');

    
    const convertTemp = (temp: number): number => {
        let tempConvert: number = temp - 273.15;
        if(!celsius){
            tempConvert = (tempConvert * 1.8) + 32;
        }

        return tempConvert;
    }

    const { weatherData } = props;
    const degreeType: String = celsius ? 'C' : 'F';
    const degrees: number = convertTemp(weatherData.main.temp);

	return(
        <Fragment>
            <p>On {props.date}</p> 
            <p>Temp {Math.round(degrees)} {degreeType}</p><p> Conditions: {weatherData.weather[0].main}</p>
        </Fragment>
    );
}