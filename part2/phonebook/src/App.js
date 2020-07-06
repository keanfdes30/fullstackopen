import React,{useState, useEffect} from 'react';
import Filter from './components/Filter'
import AddPerson from './components/AddPerson';
import DispPersons from './components/DispPersons';
import axios from 'axios'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("")

  const hook = () => {
    axios
    .get('http://localhost:3001/persons')
    .then(response=>{
      setPersons(response.data)
    })
  }

  useEffect(hook, [])

  const addName = (event) => {
    event.preventDefault()
    if(persons.filter((person)=>person.name.toLowerCase()===newName.toLowerCase()).length===0){
      const obj = {
        name: newName,
        number: newNumber
      }
      setPersons(persons.concat(obj))
    }else{
      window.alert(newName+" is already added to phonebook");
    }
    setNewName("")
    setNewNumber("")
  }

  const handleText = (event) => {
    setNewName(event.target.value)
  }
  const handleNumber = (event) => {
    setNewNumber(event.target.value)
  }

  const check = (event) => {
    var temp=event.target.value
    setNewSearch(temp)
    const namestoShow=persons.filter((person)=>person.name===temp)
    if(namestoShow.length!==0){
      setShowAll(false)
    }else{
      setShowAll(true)
    }
  }

  const personstoshow = showAll?persons:persons.filter((person)=>person.name===newSearch)

  return(
    <div>
      <h2>Phonebook</h2>
      <Filter check={check} newSearch={newSearch} />
      <h2>add a new</h2>
      <AddPerson addName={addName} handleText={handleText} handleNumber={handleNumber} newName={newName}
      newNumber={newNumber}/>
      <h2>Numbers</h2>
      <DispPersons personstoshow={personstoshow} />
    </div>
  )
};

export default App;
