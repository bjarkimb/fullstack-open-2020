import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(personData =>  {
        setPersons(personData)
      })
  },[])

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
      const changeNumber = window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)
      if (changeNumber) {

        const personObject = {
          name: newName,
          number: newNumber,
        }

        personService
          .update(persons.find(person => person.name === newName).id, personObject)
          .then(personUpdate => {
            setPersons(persons.map(person => (
              person.id === personUpdate.id ? personUpdate : person
            )))
          })
        setNewName('')
        setNewNumber('')
      }
      else {
        setNewName('')
        setNewNumber('')
      }
    }
    else{

      const personObject = {
        name: newName,
        number: newNumber,
      }

      personService
        .create(personObject)
        .then(newPerson => {
          setPersons(persons.concat(newPerson))
          setNewName('')
          setNewNumber('')
        })
      
    }
  }

  const removePerson = (name, id) => {
    const removeAlert = window.confirm(`Delete ${name}?`)
    if (removeAlert){
      personService
        .remove(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <FilterForm handleFilter={handleFilter} />

      <h2>add a new</h2>

      <PersonForm AddPerson={AddPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      
      <Filter persons={persons}  filterText={filterText} removePerson={removePerson} />

    </div>
  )
}

export default App