import React from 'react'

 const Course = ({course}) => {
    return(
      <div>
        <Header name={course.name} />
        <Content parts={course.parts} />
        <Footer parts={course.parts}/>
      </div>
    )
  }
  const Header = ({name}) => {
    return (
      <h1>{name}</h1>
    )
  }
  
  const Content = ({parts}) => {
    return (
      <div>
        {parts.map((part)=><Part part={part} key={part.id} />)}
      </div>  
    )
  }
  
  const Footer = ({parts}) => {
    return (
      <p><b>Number of exercises {parts.reduce((sum,part)=>sum+part.exercises,0)}</b></p>
    )
  }
  
  const Part = ({part}) => {
    return (
      <p>
        {part.name} {part.exercises}
      </p>
    )
  }
  export default Course