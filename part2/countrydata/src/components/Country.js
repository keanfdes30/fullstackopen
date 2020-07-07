import React, { useState,useEffect } from 'react'
import axios from 'axios'

const Country = ({dis}) => {
    const [weather,setWeather] = useState()
    const {name,capital,flag,languages,population} = dis
    const ACCESS_KEY = process.env.REACT_APP_API_KEY
    const hook = () => {
        axios
          .get(`http://api.weatherstack.com/current?access_key=${ACCESS_KEY}&query=${capital}`)
          .then(response=>{
              console.log(response.data)
            setWeather(response.data)
          })
          .catch(error=>console.log(error.message))
    }
    useEffect(hook,[])

    const weatherInfo = () =>{
        if(weather===undefined){    
            return <p>no data</p>
        }
        const {temperature,weather_icons,wind_speed,wind_dir} = weather.current
        return(
            <div>
                <p>temperature: {temperature}</p>
                <img src={weather_icons} alt="weather description"></img>
                <p>wind speed: {wind_speed}mph  direction: {wind_dir}</p>
            </div>
        )
    }

    return (
    <div>
        <h3>{name}</h3>
        <p>capital: {capital}</p>
        <p>population: {population}</p>
        <h3>Languages</h3>
        <div>{languages.map((lang,i)=><p key={i}>{lang.name}</p>)}</div>
        <img src={flag} height="300px" width="300px" alt="country flag" ></img>
        <h3>Weather in {capital}</h3>
        {weatherInfo()}
    </div>
    )
}

export default Country