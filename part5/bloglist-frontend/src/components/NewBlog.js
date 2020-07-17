import React from 'react';
import {Form,Button} from 'react-bootstrap'

const NewBlog = ({title,author,url,addBlog,handleAuthor,handleTitle,handleUrl}) => {
  return (
    <div>
      <h2>create new</h2>
      <Form onSubmit={addBlog}>
        <Form.Group>
          <Form.Label>title: </Form.Label>
          <Form.Control value={title} onChange={handleTitle}/>
        </Form.Group>
        <Form.Group>
          <Form.Label>author: </Form.Label>
          <Form.Control value={author} onChange={handleAuthor}/>
        </Form.Group>
        <Form.Group>
         <Form.Label>url: </Form.Label>
          <Form.Control value={url} onChange={handleUrl}/>  
        </Form.Group>
        <Button variant="primary" type="submit">
          Add
        </Button>
      </Form>
    </div>
  );
};

export default NewBlog;