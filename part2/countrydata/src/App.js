import React,{useEffect, useState} from 'react';
import axios from 'axios'
import Countries from './components/Countries'

const App = () => {
  const [data, setData] = useState([])
  const [country, setCountry] = useState("")
  const [show,setShow] = useState(false)
  const [val,setVal] = useState("")

  const hook = () => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then(response=>{
        setData(response.data)
      })
  }
  useEffect(hook,[])

  const handleText = (event) => {
    setCountry(event.target.value)
    setShow(false)
  }

  const extend = (event) => {
    setShow(true)
    setVal(event.target.value)
  }

  const disp = () => {
    let regex= new RegExp("^"+country.toLowerCase()+"[a-z]*")
    if(show){
      return(
        data.filter(item=>item.name===val))
    }
    return(
      data.filter(item=>regex.test(item.name.toLowerCase())))
  }
  return (
    <div>
      <div>search: <input onChange={handleText} value={country}/></div>
      <Countries disp={disp()} extend={extend}/>
    </div>
  );
};



export default App;