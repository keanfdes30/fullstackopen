import React,{useState, useEffect} from 'react';
import Filter from './components/Filter'
import AddPerson from './components/AddPerson';
import DispPersons from './components/DispPersons';
import noteService from './services/persons'

const App = () => {
  const [persons, setPersons ] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [newSearch, setNewSearch] = useState("")

  const hook = () => {
    noteService.get()
              .then(response=>setPersons(response))
  }

  useEffect(hook, [])

  const addName = (event) => {
      event.preventDefault()
      if(persons.filter((person)=>person.name.toLowerCase()===newName.toLowerCase()).length===0){
        const obj = {
          name: newName,
          number: newNumber
        }
      noteService.create(obj)
                  .then(response=>setPersons(persons.concat(response)))
      }else{
        const user=persons.find(p=>p.name===newName)
        const id=user.id
        if(window.confirm(`${user.name} already exists. Are you sure you want to change it?`)){
        const obj={
          name: newName,
          number: newNumber
        }
        noteService.replace(id,obj)
                  .then(response=>{
                    setPersons(persons.map(p=>p.id===id?response:p))
                  })
      }}
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

  const deleteUser = (name) => {
    if(window.confirm(`delete ${name}?`)){
    const user=persons.find(p=>p.name===name)
    noteService.userDelete(user.id)
          .then(setPersons(persons.filter(p=>p!==user)))}
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
      <DispPersons personstoshow={personstoshow} deleteUser={deleteUser} />
    </div>
  )
};

export default App;
