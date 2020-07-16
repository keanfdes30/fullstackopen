import React from 'react';

const LoginForm = ({username,password,handleLogin,handleUsername,handlePassword}) => {
  return (
    <div>
          <form onSubmit={handleLogin}>
          <h1>login to application</h1>
          <div>username: <input placeholder="Username"  value={username} onChange={handleUsername}></input></div>  
          <div>password: <input placeholder="Password"  value={password} onChange={handlePassword}></input></div>  
        <button>Submit</button>
        </form>
    </div>
  );
};

export default LoginForm;