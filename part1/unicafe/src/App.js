import React, { useState } from 'react'

const Title = (props) => {
  return (
  <h1>{props.title}</h1>)
}

const Button = ({increaseFeedback, feedback}) => { 
  return (
  <button onClick={increaseFeedback}>
    {feedback}
  </button>
  )
}

const Statistics = ({feedback, amount}) => {
  return (
  <p>{feedback}: {amount}</p>
  )
}

const Display = ({total, good, neutral, bad}) => {
  if (total === 0) {
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <div>
  <Statistics feedback = "good" amount = {good} />
      <Statistics feedback = "neutral" amount = {neutral} />
      <Statistics feedback = "bad" amount = {bad} />
      <Statistics feedback = "total" amount = {total} />
      <Statistics feedback = "average" amount = {total === 0? 0 : (good - bad)/total} />
      <Statistics feedback = "positive" amount = {total === 0? 0 : good/total*100} />
  </div>
  )
    }  
const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
 
  return (
    <div>
      <Title title = "give feedback" />
      <Button increaseFeedback = {() => {setGood(good + 1);setTotal(total+1)}}feedback = "good" />
      <Button increaseFeedback = {() => {setNeutral(neutral + 1);setTotal(total+1)}} feedback = "neutral" />
      <Button increaseFeedback = {() => {setBad(bad + 1);setTotal(total+1)}} feedback = "bad" />
      <Title title = "statistics" />
      <Display total = {total} good = {good} neutral = {neutral} bad = {bad}/>
    </div>
  )
}

export default App
