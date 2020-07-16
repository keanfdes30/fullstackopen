import React from 'react';

const Notification = ({notif,col}) => {
  const notifStyle = {
    color:col,
    background: "lightgrey",
    fontSize: 20,
    borderStyle: "solid",
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
    }	
  if(notif===null){
    return null
  }
  else{
    return (
      <div style={notifStyle}>
        {notif}
      </div>
    )
  }
}

export default Notification;