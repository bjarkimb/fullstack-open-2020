import React from 'react'

const Header = ({ name }) => {
  return (
    <h2>{name}</h2>
  )
}

const Total = ({ parts }) => {
  const total = parts.reduce((s,p) => {
  	return s+p.exercises
  },0)
  return(
    <p><strong>total of {total} exercises</strong></p>
  ) 
}

const Part = ({name, exercises}) => {
  return (
    <p>
      {name} {exercises}
    </p>    
  )
}

const Content = ({parts}) => {
	return (
    	<div>
    		{parts.map(parts =>
    			<Part key={parts.id} name= {parts.name} exercises={parts.exercises} />)
    		}
    	</div>
  	)
}

const Course = ({ course }) => {
	console.log(course)
	return (
		<div>
			<Header name={course.name} />
			<Content parts={course.parts} />
			<Total parts={course.parts} />
		</div>
	)
}

export default Course