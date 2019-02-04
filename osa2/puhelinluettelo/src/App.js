import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import PersonForm from './components/PersonForm'
import PersonsRenderer from './components/PersonsRenderer'
import personService from './services/persons'
import Notification from './components/Notification'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newFilter, setNewFilter ] = useState('')
  const [ notifMessage, setNotifMessage ] = useState(null)
  const [ notifValue, setNotifValue ] = useState(false)

  useEffect(() => {
    personService
      .getAll()
      .then(persons => {
        setPersons(persons)
      })
      .catch(error => {
        createNotification('Henkilöiden hakeminen epäonnistui', false)
      })
  }, [])

  const createNotification = (message, value) => {
    value === true ? setNotifValue(true) : setNotifValue(false)
    setNotifMessage(message)
    setTimeout(() => {
      setNotifMessage(null)
    }, 5000)
  }

  const addPerson = (event) => {
    event.preventDefault()

    const nameObject = {
      name: newName,
      number: newNumber
    }

    let found = false

    persons.forEach(person => {
      if (person.name === newName) {
        found = true
        if (window.confirm(`${person.name} on jo luettelossa, korvataanko vanha numero uudella?`)) {
          const clone = {...person, number: newNumber}
          personService
            .update(person.id, clone)
            .then(updatedPerson => {
              setPersons(persons.map(person =>
                person.id === updatedPerson.id 
                ? updatedPerson
                : person
              ))
              console.log('lisätty')
              createNotification(
                `Henkilön ${person.name} numero päivitetty!`, 
                true
              )
            })
            .catch(error => {
              console.log(error)
              createNotification(
                `Henkilö ${person.name} oli jo poistettu`, 
                false
              )
            })
        }  
      }
    })

    if (!found) {
      personService
        .create(nameObject)
        .then(addedPerson => {
          setPersons(persons.concat(addedPerson))
          setNewName('')
          setNewNumber('')
          createNotification(
            `Henkilö ${addedPerson.name} lisätty`,
            true
          )
        })
        .catch(error => {
          createNotification(
            `Henkilön lisääminen epäonnistui`, 
            false
          )
        })
    }
  }

  const handleNameInputChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberInputChange = (event) => {
    setNewNumber(event.target.value)
  }

  const handleFilterInputChange = (event) => {
    setNewFilter(event.target.value)
  }

  const handleRemoveClick = (person) => {
    if (window.confirm(`Poistetaanko ${person.name}`)) {
      personService
        .destroy(person.id)
        .then(() => {
          setPersons(persons.filter(p => p.id !== person.id))
          createNotification(
            `Henkilö ${person.name} poistettu!`, 
            true
          )
        })
        .catch(error => {
          createNotification(
            `Virhe poistettaessa henkilöä ${person.name}`, 
            false
          )
        })
    }
  }

  return (
    <div>
      <h2>Puhelinluettelo</h2>
      <Notification message={notifMessage} value={notifValue} />
      <Filter 
        filter={newFilter} 
        changeHandler={handleFilterInputChange} 
      />

      <h3>Lisää uusi</h3>
      <PersonForm 
        addPerson={addPerson}
        newName={newName}
        newNumber={newNumber}
        handleNameInputChange={handleNameInputChange}
        handleNumberInputChange={handleNumberInputChange}
      />

      <h3>Luettelo</h3>
      <PersonsRenderer 
        persons={persons}
        filter={newFilter}
        removeHandler={handleRemoveClick}
      />
    </div>
  )

}

export default App
