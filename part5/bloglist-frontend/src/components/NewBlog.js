import React from 'react';

const NewBlog = ({title,author,url,addBlog,handleAuthor,handleTitle,handleUrl}) => {
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>title: <input value={title} onChange={handleTitle}></input></div>  
        <div>author: <input value={author} onChange={handleAuthor}></input></div>  
        <div>url: <input value={url} onChange={handleUrl}></input></div>  
        <button>Add</button>
      </form>
    </div>
  );
};

export default NewBlog;