
import axios from 'axios'
import React, { useState, useEffect} from 'react'

const CountryData = ({country}) => {
  console.log(country)
  console.log(country[0].flag)
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
    <img src={country[0].flag} alt="flag" width="300"/>
  </div>)
}

const CountryName = ({country}) => {
  return (
  <li>{country.name}</li>
  )}

const Results = ({countriesToShow}) => {
  console.log(countriesToShow)
  if (countriesToShow.length > 10 || countriesToShow.length === 0) {
    return (
    <div>Too many matches, specify another filter.</div>
  )
  } else if (countriesToShow.length === 1){
    return (<div><CountryData country = {countriesToShow} /></div>)
  } else {
    return (
      <ul>{
        countriesToShow.map(country => 
        <CountryName key = {country.name} country = {country} />)
      }</ul>)
  }
}

function App() {
  const [ countries, setCountries] = useState([])
  
  const [ newSearch, setNewSearch ] = useState('')
  
  const countriesToShow = countries.filter(country =>
    country.name.toLowerCase().includes(newSearch.toLowerCase())===true)

  const handleNewSearch = (event) => {
     setNewSearch(event.target.value)
  }

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])
  console.log(countriesToShow)
  return (
   <div>
     <h2>Country search</h2>
     <div>
       <input value= {newSearch} onChange = {handleNewSearch}/>
    </div>
    <h2>Results</h2>
    <Results countriesToShow = {countriesToShow} />
  </div>
  )
}

export default App;
