import React,{useState} from 'react';
import {Button} from 'react-bootstrap'

const Togglable = (props) => {
  const [newVisible,setNewVisible] = useState(false)

  const hide={display: newVisible? 'none':''}
  const display={display: newVisible? '':'none'}
  return (
    <div>
        <div style={hide}>
          <button onClick={()=>setNewVisible(true)}>{props.buttonLabel}</button>
        </div>
        <div style={display}>
          {props.children}
          <Button onClick={()=>setNewVisible(false)}>cancel</Button>
      </div>
    </div>
  );
};

export default Togglable;