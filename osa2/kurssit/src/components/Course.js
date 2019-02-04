import React from 'react'


const Total = ({ course }) => {
  const total = course.parts.reduce((previous, current) => 
    previous + current.exercises, 0)

  return (
    <p>
      yhteensä {total} tehtävää
    </p>
  )
}

const Header = ({ course }) => {
  return (
    <h1>{course}</h1>
  )
}

const Part = (props) => {
  return (
    <p>
      {props.name} {props.exercises}
    </p>
  )
}

const Content = ({ content }) => {
  return(
    content.map(part =>
      <Part key={part.id} name={part.name} exercises={part.exercises} />
    )
  )
}

const Course = ({ course }) => {
  return (
    <>
      <Header course={course.name} />
      <Content content={course.parts} />
      <Total course={course} />
    </>
  )
}

export default Course