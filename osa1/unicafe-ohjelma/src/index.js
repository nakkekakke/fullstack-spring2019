import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Title = ({ text }) => <h1>{text}</h1>

const Statistics = ({ positive, neutral, negative }) => {
  const totalReviews = positive + neutral + negative
  const average = (positive - negative) / totalReviews
  const positiveShare = positive / totalReviews * 100 + " %"

  if (totalReviews === 0) {
    return (
      <p>Ei yhtään palautetta annettu</p>
    )
  }

  return (
    <table>
      <tbody>
        <Statistic text='hyvä' value={positive} />
        <Statistic text='neutraali' value={neutral} />
        <Statistic text='huono' value={negative} />
        <Statistic text='yhteensä' value={totalReviews} />
        <Statistic text='keskiarvo' value={average} />
        <Statistic text='positiivisia' value={positiveShare} />
      </tbody>
    </table>
  )
}

const Statistic = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
    
  )
} 

const Button = (props) => {
  return (
    <button onClick={props.handleClick}>
      {props.text}
    </button>
  )
}

const App = () => {
  const [positive, setPositive] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [negative, setNegative] = useState(0)



  return (
    <div>
      <Title text='Anna palautetta' />
      <Button handleClick={() => setPositive(positive + 1) } text='hyvä' />
      <Button handleClick={() => setNeutral(neutral + 1) } text='neutraali' />
      <Button handleClick={() => setNegative(negative + 1) } text='huono' />
      <Title text='Statistiikka' />
      <Statistics positive={positive} neutral={neutral} negative={negative} />
      
    </div>
  )
}


ReactDOM.render(<App />, document.getElementById('root'));