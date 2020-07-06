import React from 'react'
import Display from './Display'

//example from mozilla
const filterItems = (arr, query) => {
  return arr.filter(el => el.name.toLowerCase().indexOf(query.toLowerCase()) !== -1)
}


const Filter = ({ persons, filterText, removePerson }) => {
  if (filterText === ''){
    return(
      persons.map((person) =>
        <Display key={person.name} person={person} removePerson={removePerson} />
      )
    )
  }
  else {
    const filtList = filterItems(persons,filterText)
    return (
      filtList.map((person) =>
        <Display key={person.name} person={person} removePerson={removePerson} />
      )

    )
  }
}

export default Filter