import React from 'react';
import Person from './Person'

const DispPersons = ({personstoshow}) => {
    return (
        <ul>
            {personstoshow.map((person,i)=><Person key={i} person={person} />)}
        </ul>
    );
};

export default DispPersons;