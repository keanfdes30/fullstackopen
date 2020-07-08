import React from 'react';
import Person from './Person'

const DispPersons = ({personstoshow,deleteUser}) => {
    return (
        <ul>
            {personstoshow.map((person,i)=><Person key={i} deleteUser={deleteUser} person={person} />)} 
        </ul>
    );
};

export default DispPersons;