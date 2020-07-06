import React from 'react'
import Course from './components/course'

const App = ({courses}) => {
    return (
        <div>
        {courses.map((course)=><Course course={course} key={course.id} />)}
        </div>
    )
}
export default App