import React from 'react';
import Country from './Country'
const Countries = ({disp,extend}) => {

    if(disp.length===1){
      return(
        <div>
          {disp.map((dis,i)=><Country dis={dis} key={i} />)}
        </div>
      )
    }else if (disp.length>10){
      return(
        <div>Too many matches</div>
      )
    }else if (disp.length===0){
      return(
        <div>No matches</div>
      )
    }else{
      return(
        <ul>
          {disp.map((dis,i)=> <li key={i}>{dis.name} <button onClick={extend} value={dis.name}>show</button></li>)}
        </ul>
      )
    }
  }
  

export default Countries;