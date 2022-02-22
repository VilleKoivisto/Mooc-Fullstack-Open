// tehtävät 1.6-1.14

import { useState } from 'react'

// anekdootit arrayssa
const anecdotes = [
  'If it hurts, do it more often.',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
  'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.'
]

// painikekomponentti
const Button = ({ handleClick, text }) => {
  return(
    <button onClick={handleClick}>
        {text}
    </button>
  )
}

// tilastokomponentti
const Statistics = (props) => {
  if (props.sumAll() === 0) {
    return "No feedback given yet"
  }
  return(
    <div>
      <table><thead>
        <StatisticsLine text="Good" value={props.good}/>
        <StatisticsLine text="Neutral" value={props.neutral}/>
        <StatisticsLine text="Bad" value={props.bad}/>
        <StatisticsLine text="All" value = {props.sumAll()}/>
        <StatisticsLine text ="Average" value={props.calcAverage()}/>
        <StatisticsLine text="Positive" value={props.goodFromAll()}/>
      </thead></table>
     </div>
  )
}

// tilastorivin komponentti
const StatisticsLine = (props) => (
  <tr>
    <td>{props.text}</td>
    <td>{props.value}</td>
  </tr>
)

// äänestetyimmän anekdootin näyttävä komponentti
const WinnerAnecdote = (props) => (
  <div>
    "{props.anecdotes[props.index]}"
  </div>
)

const App = () => {
  // hookit
  // --------------------------------------------------------------------------
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [all, setAll] = useState([])
  const [selected, setSelected] = useState(0) // alkutilanteessa 1. anekd.
  const [votes, setVotes] = useState(new Array(anecdotes.length).fill(0))
  // selvitä staten asynkronisuus -> syy miksei tää toimi
  // const [mostVoted, setMostVoted] = useState(0) // alkutilanteessa 1. anekd.

  // handlerit
  // --------------------------------------------------------------------------
  const handleGood = () => {
    setGood(good + 1)
    setAll(all.concat(1))
  }

  const handleNeutral = () => {
    setNeutral(neutral + 1)
    setAll(all.concat(0))
  }

  const handleBad = () => {
    setBad(bad + 1)
    setAll(all.concat(-1))
  }

  const handleSelectAnecdote = () => {
    setSelected(randomInt())
  }

  const handleVotes = () => {
    const copyOfVotes = [...votes]
    copyOfVotes[selected] += 1
    
    setVotes(copyOfVotes)
  }

  // apufunktiot
  // --------------------------------------------------------------------------
  const sumAll = () => good + neutral + bad

  const goodFromAll = () => good / sumAll() * 100

  const calcAverage = () => {
    let sum = 0
    for (let i = 0; i < all.length; i++) {
      sum += all[i]
    }
    return sum / all.length
  }

  const randomInt = () => Math.floor(Math.random() * anecdotes.length)

  const findMostVoted = () => votes.indexOf(Math.max(...votes))

  // --------------------------------------------------------------------------
  return (
    <div>
      <h1>Give feedback</h1>

      <Button handleClick={handleGood} text="Good"/>
      <Button handleClick={handleNeutral} text="Neutral"/>
      <Button handleClick={handleBad} text="Bad"/>

      <h2>Statistics</h2>

      <Statistics good={good} neutral={neutral} bad={neutral}
        sumAll={sumAll} calcAverage={calcAverage} goodFromAll= {goodFromAll}/>
      
      <h2>Anecdote of the day</h2>

      <p>"{anecdotes[selected]}"</p>

      <Button handleClick={handleSelectAnecdote} text="Next anecdote"/>
      <Button handleClick={handleVotes} text="Vote"/>

      <h2>Anecdote with most votes</h2>

      <WinnerAnecdote anecdotes={anecdotes} index={votes.indexOf(Math.max(...votes))}/>
    </div>
  )
}

export default App