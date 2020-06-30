import React, { useState, useEffect } from 'react'
import axios from 'axios'

const Weather = ({country}) => {

	const [ weather, setWeather ] = useState(null) 

	const url = "http://api.weatherstack.com/current";
  	const ACCESS_KEY = process.env.REACT_APP_API_KEY

	useEffect(() => {
  		axios.get(`${url}?access_key=${ACCESS_KEY}&query=${country.capital}`)
  			.then(response => {
    		setWeather(response.data)
  		}).catch(error => {
    	console.log(error);
  		})
  	},[country, ACCESS_KEY])

	console.log(weather)
	if (weather){
		return(
			<div>
				<h2>Weather in {country.capital}</h2>
				<p><strong>temperature:</strong> {weather?.current.temperature} Celsius</p>
				<img src={weather?.current.weather_icons[0]} alt="weather_icon" width="80" />
				<p><strong>wind:</strong> {weather?.current.wind_speed} km/h direction {weather?.current.wind_dir}</p>
			</div> 
		)
	}
	else{
		return(
			<div>
				<p>...loading weather data...</p>
			</div>
		)
	}

}

export default Weather