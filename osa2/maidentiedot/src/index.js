import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'
import axios from 'axios'

const App = () => {
  const [ countries, setCountries ] = useState([])
  const [ newFilter, setNewFilter ] = useState('')
  const [ newWeather, setNewWeather ] = useState(
    { location: { name: "Loading..." } }
  )

  useEffect(() => {
    console.log('effect')
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        setCountries(response.data)
        console.log(response.data)
      })
  }, [])

  const handleFilterChange = (event) => {
    console.log(event.target.value)
    setNewFilter(event.target.value)
  }

  const listCountries = () => {
    const filteredCountries = countries.filter(country => 
          country.name.toLowerCase().includes(newFilter.toLowerCase()))

    if (filteredCountries.length === 0) {
      return <p>Either loading data or nothing found</p>

    } else if (filteredCountries.length > 10) {
      return <p>Too many matches, specify another filter</p>

    } else if (filteredCountries.length > 1) {
      return (
        filteredCountries.map(country => 
          <li key={country.name}>{country.name}
            <button
              onClick={() => setNewFilter(country.name)}>
              Show
            </button>
          </li>)
      )
    } else {
      return listCountryDetails(filteredCountries[0])
    }
  }

  const listLanguages = (country) => {
    return (
      <ul>
        {country.languages.map(language => 
          <li key={language.name}>{language.name}</li>)}
      </ul>
    )  
  }

  const listCountryDetails = (country) => {
    window.setTimeout(() => getWeather(country.capital), 2000)
    return (
      <div>
        <h1>{country.name}</h1>
          Capital: {country.capital}<br/>
          Population: {country.population}
        <h3>Languages</h3>
          {listLanguages(country)}
        <br/>
        <img 
          src={country.flag} 
          alt={`Flag of ${country.name}`} 
          width="200" 
          height="150" 
        />
        {showWeather()}
      </div>
    )
  }

  const showWeather = () => {
    const city = newWeather.location.name
    if (city === "Loading...") {
      return <h3>Loading current weather...</h3>
    }
    const weather = newWeather.current
    return (
      <>
        <h3>Current weather in {city}</h3>
        <strong>Temperature:</strong> {weather.temp_c} °C
        <br/>
        <img 
          src={weather.condition.icon}
          alt={weather.condition.text}
        />
        <br/>
        <strong>Wind:</strong> {weather.wind_kph} kph, direction {weather.wind_dir}
      </>
    ) 
  }

  const getWeather = (city) => {
    axios
      .get(`https://api.apixu.com/v1/current.json?key=a4cd164234b24028b77185556190302&q=${city}`)
      .then(response => {
        setNewWeather(response.data)
      })
  }

  return (
    <div>
      Find countries
      <input 
        value={newFilter}
        onChange={handleFilterChange}
      />
      <ul>
        {listCountries()}
      </ul>
    </div>
  )
}



ReactDOM.render(<App />, document.getElementById('root'))
