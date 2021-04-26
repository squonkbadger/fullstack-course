import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [persons, setPersons] = useState([])
  const [ newName, setNewName ] = useState('')
  const [ newNumber, setNewNumber ] = useState('')
  const [ newSearch, setNewSearch ] = useState('')

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
    const names = persons.map(person => person.name)
    
    if (names.findIndex(name => name === newName) === -1) {
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
      })
    } else {
      window.alert(`${newName} is already added to phonebook`)
    }
  }
  
  const handleNameChange = (event) => {
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    setNewNumber(event.target.value)
  }
  const handleNewSearch = (event) => {
    setNewSearch(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newSearch = {newSearch} handleNewSearch = {handleNewSearch}/>
      <Form 
        addPerson = {addPerson} 
        newName = {newName} 
        handleNameChange={handleNameChange}
        newNumber = {newNumber}
        handleNumberChange = {handleNumberChange}
      />
      <h2>Numbers</h2>
      <Persons personsToShow = {personsToShow}/>
    </div>
  )
}

export default App
