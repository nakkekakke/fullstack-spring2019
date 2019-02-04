import React from 'react'

const PersonsRenderer = ({ persons, filter, removeHandler }) => {
  return (
    <ul>
    {persons
      .filter(person => 
        person.name.toLowerCase().includes(filter.toLowerCase()))
      .map(person => 
        <li key={person.name}>
          {person.name} {person.number} 
          <button onClick={() => removeHandler(person)}>Poista</button>
        </li>
    )}
    </ul>
  )

}
  


export default PersonsRenderer