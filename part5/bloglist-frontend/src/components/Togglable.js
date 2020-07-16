import React,{useState} from 'react';

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
          <button onClick={()=>setNewVisible(false)}>cancel</button>
      </div>
    </div>
  );
};

export default Togglable;