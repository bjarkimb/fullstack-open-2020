import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Header = (props) => {
  return(
      <h1>{props.text}</h1>
  )
}

const Button = ({handleClick, text}) => (
  <button onClick={handleClick}>
    {text}
  </button>
)

const Statistics = ({good, neutral, bad}) => {
  const total = good + neutral + bad;
  if(total === 0) {
    return(
      <p>No feedback given</p>
    )
  }
  const average = (good - bad)/total;
  const positive = good/total*100;
  return(
    <div>
      <table>
        <tbody>
          <Statistic name='good' number={good} />
          <Statistic name='neutral' number={neutral} />
          <Statistic name='bad' number={bad} />
          <Statistic name='all' number={total} />
          <Statistic name='average' number={average} />
          <Statistic name='positive' number={positive + ' %'} />
        </tbody>
      </table>
    </div>
  )
}

const Statistic = ({name, number}) => {
  return(
    <tr>
      <td>{name}</td>
      <td>{number}</td> 
    </tr>
  ) 
}



const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    setGood(good + 1)
  }
  const neutralClick = () => {
    setNeutral(neutral + 1)
  }
  const badClick = () => {
    setBad(bad + 1)
  }



  return (
    <div>
      <Header text='give feedback' />
      <Button handleClick={goodClick} text='good' />
      <Button handleClick={neutralClick} text='neutral' />
      <Button handleClick={badClick} text='bad' />
      <Header text='statistics' />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}



ReactDOM.render(<App />, 
  document.getElementById('root')
)