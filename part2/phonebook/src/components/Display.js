import React from 'react'

const Display = ({ person }) => {
  return (
    <p>{person.name} {person.number}</p>
  )
}

export default Display