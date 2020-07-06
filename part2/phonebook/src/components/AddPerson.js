import React from 'react';

const AddPerson = (props) => {
    return (
        <form onSubmit={props.addName}>
        <div>name: <input onChange={props.handleText} value={props.newName} placeholder="Name" /></div>
        <div>number: <input onChange={props.handleNumber} value={props.newNumber} placeholder="Number" /></div>
        <button>Submit</button>
      </form>
    );
};

export default AddPerson;