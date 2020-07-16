import React,{useState} from 'react';
import Togglable from './Togglable'
import NewBlog from './NewBlog'
import Blog from './Blog'

const BlogDisplay = ({title,author,url,addBlog,logout,user,blogs,deleteBlog,handleTitle,handleAuthor,handleUrl,likeBlog}) => {
  const [exp,setExp] = useState([])
  return (
    <div>
      <h2>blogs</h2>
        <p>{user.name} logged in<button onClick={logout}>logout</button></p>
          <Togglable buttonLabel="create new note">
            <NewBlog
              title={title}  
              author={author}
              url={url}
              addBlog={addBlog}
              handleTitle={handleTitle}
              handleAuthor={handleAuthor}
              handleUrl={handleUrl}
            />
          </Togglable>
        {blogs.map(blog =>{
          const postStyle = {
            color:"black",
            background: "lightgrey",
            fontSize: 20,
            borderStyle: "solid",
            borderRadius: 5,
            padding: 10,
            marginBottom: 10
            }	
          if(exp.indexOf(blog.id)>=0){
            return( 
              <div key={blog.id} style={postStyle}>
                <p>{blog.title}<button onClick={async ()=> {
                  var arr=[...exp]
                  var index=arr.indexOf(blog.id)
                  arr.splice(index,1)
                  await setExp(arr)
                }}>hide</button></p>
                <p>{blog.author}</p>
                <p>{blog.url}</p>
                <p>{blog.likes}<button onClick={likeBlog} value={blog.id}>like</button></p>     
                <button value={blog.id} onClick={deleteBlog}>Remove</button>      
              </div>
            )
          }
          else{
            return(
              <div key={blog.id} style={postStyle}>
                <Blog 
                  blog={blog} 
                  deleteBlog={deleteBlog} 
                  expand={async ()=> await setExp(exp.concat(blog.id))} 
                />
              </div>
            )
          }
        })}
    </div>
  );
};

export default BlogDisplay;