import React from 'react'

const Filter = ({check, newSearch}) => {
    return(
        <div>
            filter: <input onChange={check} value={newSearch} placeholder="Search" />
        </div>
    )    
}
export default Filter