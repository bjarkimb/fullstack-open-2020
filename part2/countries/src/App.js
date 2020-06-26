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

  return (
    <div>
      <FilterForm handleFilter={handleFilter} />

      <ListCountries filterText={filterText} countries={countries} />
    </div>
  )
}

export default App;