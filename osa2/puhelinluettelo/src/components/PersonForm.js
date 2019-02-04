import React from 'react'

const PersonForm = (props) => {
  return (
    <form onSubmit={props.addPerson}>
      <div>
        Nimi: 
        <input 
          value={props.newName} 
          onChange={props.handleNameInputChange} 
        />
      </div>
      <div>
        Numero: 
        <input 
          value={props.newNumber} 
          onChange={props.handleNumberInputChange}
        />
      </div>
      <div>
        <button type="submit">Lisää</button>
      </div>
    </form>
  )
}

export default PersonForm