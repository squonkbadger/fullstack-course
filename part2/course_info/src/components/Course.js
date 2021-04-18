import React from 'react'

const Header = ({ course }) => {
  return (
    <h1>{course.name}</h1>
  )
}

const Total = ({ course }) => {
  const amounts = course.parts.map(part => part.exercises)
  const sum = amounts.reduce(
    (accumulator, currentValue) => accumulator + currentValue, 0
    )
  return(
    <p>Number of exercises {sum}</p>
  ) 
}

const Part = (props) => {
  return (
    <p>
      {props.part.name} {props.part.exercises}
    </p>    
  )
}

const Content = ({ course }) => {
  return (
    <div>
      {course.parts.map(part =>
        <Part key = {part.id} part = {part} />  
      )}
      <Total course = {course} />
    </div>
  )
}

const Course = ({courses}) => {
  return (
    <div>
      {courses.map(course =>
      <div key = {course.id}>
        <Header course = {course}/>
        <Content course = {course} />
      </div>
      )}
    </div>
  )
}

export default Course