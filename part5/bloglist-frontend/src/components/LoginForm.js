import React from 'react';
import {Form,Button} from 'react-bootstrap'

const LoginForm = ({username,password,handleLogin,handleUsername,handlePassword}) => {
  return (
    <div>
        <h1>login to application</h1>
        <Form onSubmit={handleLogin}>
          <Form.Group>
            <Form.Label>Username: </Form.Label>
            <Form.Control placeholder="Username"  value={username} onChange={handleUsername} />
          </Form.Group>
          <Form.Group>
            <Form.Label>Password: </Form.Label>
            <Form.Control placeholder="Password"  value={password} onChange={handlePassword} />
          </Form.Group>
          <Button variant="primary" type="submit">Submit</Button>
        </Form>
    </div>
  );
};

export default LoginForm;