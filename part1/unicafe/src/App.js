import React, { useState } from 'react'

const Title = (props) => {
  return (
  <h1>{props.title}</h1>)
}

const Button = ({increaseFeedback, feedback}) => (
  <button onClick={increaseFeedback}>
    {feedback}
  </button>
)

const Statistics = ({feedback, amount}) => (
<p>{feedback}: {amount}</p>
)

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <Title title = "give feedback" />
      <Button increaseFeedback = {() => setGood(good + 1)} feedback = "good" />
      <Button increaseFeedback = {() => setNeutral(neutral + 1)} feedback = "neutral" />
      <Button increaseFeedback = {() => setBad(bad + 1)} feedback = "bad" />
      <Title title = "statistics" />
      <Statistics feedback = "good" amount = {good} />
      <Statistics feedback = "neutral" amount = {neutral} />
      <Statistics feedback = "bad" amount = {bad} />
    </div>
  )
}

export default App
