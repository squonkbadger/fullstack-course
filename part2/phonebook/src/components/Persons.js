import React from 'react'

const Person = ({person, deletePerson}) => {
  return (
    <li>{person.name}: {person.number}<button onClick={() => deletePerson(person)}>delete</button></li>
  )
}

const Persons = ({personsToShow, deletePerson}) => {
  return (
    <ul>
      {personsToShow.map(person =>
          <Person key = {person.name} person = {person} deletePerson = {deletePerson}/> )
      }
    </ul>
  )
}

export default Persons