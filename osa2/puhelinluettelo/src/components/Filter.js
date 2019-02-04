import React from 'react'

const Filter = ({ filter, changeHandler }) => {
  return (
    <div>
      Rajaa näytettäviä
      <input
        value={filter}
        onChange={changeHandler}
      />
    </div>
  )
  
}


export default Filter