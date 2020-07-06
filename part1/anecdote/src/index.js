import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const App = ({anecdotes}) => {
  const [selected, setSelected] = useState(0)
  const [arr, setArr] = useState(new Uint8Array(anecdotes.length))
  var temp=Math.floor(Math.random() * (anecdotes.length))

  const updateArray = (arr,temp) => {
    const copy = [...arr]
    copy[temp]+=1
    return copy
  }

  const mostVotes = (arr) => {
    var max = arr.reduce((a,b)=>Math.max(a,b))
    var index= arr.indexOf(max)
    return index;
  }

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Display anecdote={anecdotes[selected]}/>
      <Display anecdote={"has "+arr[selected]+" votes"} />
      <Button text="vote" handleClick={()=>setArr(updateArray(arr,selected))}/>
      <Button text="next anecdote" handleClick={()=>setSelected(temp)}/>
      <h1>Anecdote with the most votes</h1>
      <Display anecdote={anecdotes[mostVotes(arr)]}/>
      <Display anecdote={"has "+arr[mostVotes(arr)]+" votes"} />
    </div>
  )
}

const Display = ({anecdote}) => {
  return (
    <p>{anecdote}</p>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)