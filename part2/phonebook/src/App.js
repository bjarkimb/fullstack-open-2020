import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import FilterForm from './components/FilterForm'
import Notification from './components/Notification'
import personService from './services/persons'


const App = () => {
  const [ persons, setPersons ] = useState([]) 
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ filterText, setFilterText ] = useState('')
  const [ errorMessage, setErrorMessage ] = useState(null)
  const [ errorColor, setErrorColor ] = useState('green')

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
            setErrorColor('green')
            setErrorMessage(`Updated the number of ${newName}`)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
          })
          .catch(error => {
            setErrorColor('red')
            setErrorMessage(error.response.data.error)
            setTimeout(() => {
              setErrorMessage(null)
            }, 5000)
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
          setErrorColor('green')
          setErrorMessage(`Added ${newName}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setNewName('')
          setNewNumber('')
        })
        .catch(error => {
          setErrorColor('red')
          setErrorMessage(error.response.data.error)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
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
          setErrorColor('green')
          setPersons(persons.filter(person => person.id !== id))
          setErrorMessage(`Removed ${name}`)
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
        })
        .catch(error => {
          setErrorColor('red')
          setErrorMessage(
            `Information of ${name} has already been removed from the server`
          )
          setTimeout(() => {
            setErrorMessage(null)
          }, 5000)
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }


  return (
    <div>
      <h2>Phonebook</h2>

      <Notification message={errorMessage} errorColor={errorColor} />

      <FilterForm handleFilter={handleFilter} />

      <h2>add a new</h2>

      <PersonForm AddPerson={AddPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange} />

      <h2>Numbers</h2>
      
      <Filter persons={persons}  filterText={filterText} removePerson={removePerson} />

    </div>
  )
}

export default App