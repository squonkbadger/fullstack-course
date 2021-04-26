
import axios from 'axios'
import React, { useState, useEffect} from 'react'

const CountryData = ({country, api_key, setWeather, weather}) => {
  const query = 'http://api.weatherstack.com/current?access_key='+api_key+'&query='+country[0].capital
  useEffect(() => {
    setWeather(null)
    axios
      .get(query)
      .then(response => {
        setWeather(response.data)
      })
  }, [query, setWeather])
  return (
  <div>
    <h2>
      {country[0].name}
    </h2>
    <ul>
      <li>Capital: {country[0].capital}</li>
      <li>Population: {country[0].population}</li>
    </ul>
    <h3>Languages:</h3>
    <ul> {
      country[0].languages.map(language => <li key={language.name}>{language.name}</li>)
    }</ul>
    <h3> 
      Flag:
    </h3>
    <img src={country[0].flag} alt="flag" width="100"/>
    <h3>Weather:</h3>
    {weather?<Weather weather = {weather}/>:null}
  </div>)
}

const Weather = ({weather}) => {
  return (
  <ul>
    <li>Temperature: {weather.current.temperature} C</li>
    <li><img src={weather.current.weather_icons[0]} alt="weather icon"/></li>
    <li>Wind speed: {weather.current.wind_speed}</li>
    <li>Wind direction: {weather.current.wind_dir}</li>
  </ul>)
}

const CountryName = ({country, setNewSearch}) => {
  return (
  <li key = {country.name}>
    {country.name}
    <button onClick={() => setNewSearch(country.name)}>Show</button>
  </li>
  )}

const Results = ({countriesToShow, setNewSearch, api_key, setWeather, weather}) => {

  if (countriesToShow.length > 10 || countriesToShow.length === 0) {
    return (
    <div>Too many matches, specify another filter.</div>
  )
  } else if (countriesToShow.length === 1){
    return (<div><CountryData country = {countriesToShow} api_key = {api_key} setWeather = {setWeather} weather = {weather} /></div>)
  } else {
    return (
      <ul>{
        countriesToShow.map(country => 
        <CountryName key = {country.name} country = {country} setNewSearch={setNewSearch}/>)
      }</ul>)
  }
}

function App() {
  const api_key = process.env.REACT_APP_API_KEY
  const [ countries, setCountries] = useState([])
  
  const [ newSearch, setNewSearch ] = useState('')
  const [weather, setWeather] = useState(null)
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(newSearch.toLowerCase())===true)
  
  const handleNewSearch = (event) => {
     setNewSearch(event.target.value)
  }

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
      })
  }, [])
 
  return (
   <div>
     <h2>Country search</h2>
     <div>
       <input value= {newSearch} onChange = {handleNewSearch}/>
    </div>
    <h2>Results</h2>
    <Results countriesToShow = {countriesToShow} setNewSearch = {setNewSearch} api_key={api_key} setWeather = {setWeather} weather ={weather}/>
  </div>
  )
}

export default App;
