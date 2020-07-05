import React,{useState} from 'react';
import ReactDOM from 'react-dom';

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  return (
    <div>
      <h1>Give Feedback</h1>
      <Button handleClick={() => setGood(good+1)} text="good" />
      <Button handleClick={() => setNeutral(neutral+1)} text="neutral" />
      <Button handleClick={() => setBad(bad+1)} text="bad" />
      <h1>Statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}
const Statistic = ({id,value}) => {
  return(
    <tr><td>{id}</td><td>{value}</td></tr>
  )
}
const Statistics = ({good, neutral, bad}) => {
  if(good===0 && neutral===0 && bad===0){
    return (
      <p>No feedback given</p>
    )
  }
  return (
    <table>
      <tbody>
        <Statistic id="good" value={good} />
        <Statistic id="neutral" value={neutral} />
        <Statistic id="bad" value={bad} />
        <Statistic id="all" value={good+neutral+bad} />
        <Statistic id="average" value={(good*1+neutral*0+bad*-1)/(good+neutral+bad)} />
        <Statistic id="positive" value={(good)*100/(good+bad+neutral)+" %"}/>
      </tbody>
    </table>
  )
}

const Button = ({handleClick, text}) => {
  return (
    <button onClick={handleClick}>
      {text}
    </button>
  )
}
ReactDOM.render(<App />, 
  document.getElementById('root')
)
