import React, { useState } from 'react'

const Button = ({anecdoteAction, name}) => {
  return (
  <button onClick={anecdoteAction}>{name}</button>)
}

const Title = ({name}) => {
  return (
    <h1>{name}</h1>
  )
}

const Best = ({votes,anecdotes}) => {
  const highestVotes = Math.max(...votes)
  const mostVoted = votes.indexOf(highestVotes)
  return (
    <p>{anecdotes[mostVoted]} has {highestVotes} votes</p>
  )
}

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(new Array(6).fill(0))
  const titleAnecdote = "Anecdote of the day"
  const titleBest = "Anecdote with most votes"
  return (
    <div>
      <Title name = {titleAnecdote} />
      <Button anecdoteAction = {() => setSelected(Math.floor(Math.random() * 6))} name = "Next anecdote"/>
      <p>{anecdotes[selected]} has {votes[selected]} votes</p>
      <Button anecdoteAction ={() => {
        const newVotes = [...votes]
        newVotes[selected] += 1
        setVotes(newVotes)}
      } name="Vote" />
      <Title name = {titleBest} />
      <Best votes = {votes} anecdotes = {anecdotes}/>
    </div>
  )
}

export default App