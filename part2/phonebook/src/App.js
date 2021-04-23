import React, { useState } from 'react'

const Person = ({person}) => {
  return (
    <li>{person.name}: {person.number}</li>
  )
}

const App = () => {
  const [ persons, setPersons ] = useState([
    { name: 'Arto Hellas',
    number: '123-456-789'  
    }
  ]) 
  const [ newName, setNewName ] = useState('')
  const [newNumber, setNewNumber] = useState('')
  
  const addPerson = (event) => {
    event.preventDefault()
    const names = persons.map(person => person.name)
    
    if (names.findIndex(name => name === newName) === -1) {
    const newPerson = {
      name: newName,
      number: newNumber
    }
    setPersons(persons.concat(newPerson))
    setNewName('')
    setNewNumber('')
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
  return (
    <div>
      <h2>Phonebook</h2>
      <form onSubmit = {addPerson}>
        <div>
          name: <input value = {newName} onChange = {handleNameChange} />
        </div>
        <div>
          number: <input value = {newNumber} onChange = {handleNumberChange}/>
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
      <h2>Numbers</h2>
      <ul>
        {persons.map(person =>
          <Person key = {person.name} person = {person} />  
        )}
      </ul>
    </div>
  )
}

export default App
