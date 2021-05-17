import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'
import Notification from './components/Notification'
import Error from './components/Error'

const App = () => {
  const [ persons, setPersons ] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')
  const [ notification, setNotification] = useState(null)
  const [ error, setError] = useState(null)
  
  useEffect(() => {
    personService
      .getAll()
      .then(initialPersons => {
        setPersons(initialPersons)
      })
  }, [])

  const personsToShow = persons.filter(person => person.name.toLowerCase().includes(newSearch.toLowerCase()) === true)

  const addPerson = (event) => {
    event.preventDefault()
    const index = persons.findIndex(person => person.name === newName)
    if (index === -1) {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    personService
      .create(newPerson)
      .then(returnedPerson => {
        setPersons(persons.concat(returnedPerson))
        setNewName('')
        setNewNumber('')
        setNotification(`Created '${returnedPerson.name}'`)
        setTimeout(() => {
          setNotification(null)
        }, 5000)
      })
    } else {
      const id = persons.find(p => p.name === newName).id
      console.log(id)
      updatePerson(id, newName, newNumber) 
      }
    }


  const updatePerson = (index, newName, newNumber) => {
    
    if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one?`)) {
      const newPerson = {
        name: newName,
        number: newNumber
      }
      personService
        .update(index, newPerson)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.name !== newName).concat(returnedPerson))
          setNotification(`Updated '${returnedPerson.name}'`)
          setTimeout(() => {
            setNotification(null)
          }, 5000)
        })
        .catch(error => {
          setError(
            `Person '${newName}' was already removed from the server`
          )
          setTimeout(() =>{
            setError(null)
          }, 5000)
          setPersons(persons.filter(p => p.id !== index))
        })
      }
  }

  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const deletePerson = (person) => {
    if (window.confirm(`remove '${person.name}'?`)) {
    personService
      .deletePerson(person.id)
      .then(setPersons(persons.filter(p => p.id !== person.id)))
  }}

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message = {notification} />
      <Error message = {error} />
      <Filter newSearch = {newSearch} handleNewSearch = {handleNewSearch}/>
      <Form 
        addPerson = {addPerson} 
        newName = {newName} 
        handleNameChange={handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow} deletePerson = {deletePerson}/>
    </div>
  )
}

export default App
