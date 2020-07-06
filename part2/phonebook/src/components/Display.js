import React from 'react'

const Display = ({ person, removePerson }) => {
  return (
    <p>{person.name} {person.number} <button onClick={() => removePerson(person.name,person.id)}>delete</button></p>
  )
}

export default Display