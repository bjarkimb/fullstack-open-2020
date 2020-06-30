import React, { useState, useEffect } from 'react'
import axios from 'axios'
import FilterForm from './components/FilterForm'
import ListCountries from './components/ListCountries'


const App = () => {
  const [ countries, setCountries ] = useState([]) 
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
  axios
    .get('https://restcountries.eu/rest/v2/all')
    .then(response =>  {
      setCountries(response.data)
    })
  },[])

  const handleFilter = (event) => {
    setFilterText(event.target.value)
  }

  const handleClick = (name) => {
    console.log('setting search text to', name)
    setFilterText(name)
  }

  return (
    <div>
      <FilterForm handleFilter={handleFilter} />

      <ListCountries filterText={filterText} countries={countries} handleClick={handleClick} />
    </div>
  )
}

export default App;