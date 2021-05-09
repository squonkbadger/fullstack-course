import React, { useState, useEffect } from 'react'
import Filter from './components/Filter'
import Form from './components/Form'
import Persons from './components/Persons'
import personService from './services/persons'

const App = () => {
  const [ persons, setPersons ] = useState([])
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
      console.log(index)
      personService
        .update(index, newPerson)
        .then(returnedPerson => {
          setPersons(persons.filter(p => p.name !== newName).concat(newPerson))
        }) }
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
