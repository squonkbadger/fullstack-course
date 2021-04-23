import React from 'react'

const Filter = ({newSearch,handleNewSearch}) => {
  return (
  <div>
    <input value = {newSearch} onChange = {handleNewSearch} />
  </div>)
}

export default Filter