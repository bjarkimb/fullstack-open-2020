import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import axios from 'axios'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
  console.log('effect')
  axios
    .get('http://localhost:3001/persons')
    .then(response =>  {
      console.log('promise fulfilled')
      setPersons(response.data)
    })
  },[])
  console.log('render', persons.length, 'persons')

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }


  const handleFilter = (event) => {
    setFilterText(event.target.value)
  }

  const AddPerson = (event) => {
    event.preventDefault()
    if (persons.map((str) => str.name).includes(newName)){
      alert(`${newName} is already added to phonebook`)
      setNewName('')
    }
    else{

      const personObject = {
        name: newName,
        number: newNumber,
      }

      setPersons(persons.concat(personObject))
      setNewName('')
      setNewNumber('')
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm handleFilter={handleFilter} />

      <h2>add a new</h2>

      <PersonForm AddPerson={AddPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      
      <Filter persons={persons}  filterText={filterText} />

    </div>
  )
}

export default App