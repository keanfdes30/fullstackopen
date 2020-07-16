import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [notif,setNotif] = useState(null)
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")
  const [user,setUser] = useState(null)
  const [title,setTitle] = useState("")
  const [author,setAuthor] = useState("")
  const [url,setUrl] = useState("")
  const [col,setCol] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )  
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event =>{
    event.preventDefault()
    try{
      const user =await loginService.login({username,password})
      blogService.setToken(user.token)
      window.localStorage.setItem(
        'loggedBlogUser', JSON.stringify(user)
      ) 
      setUser(user)
      setUsername("")
      setPassword("")
    }catch(error){
      setNotif('Wrong username or password')
      setCol("red")
      setTimeout(()=>{setNotif(null)},5000)
      setPassword("")
    }
  }

  const addBlog = async event =>{
    event.preventDefault()
      const blog={
        title:title,
        url:url,
        author:author
      }
      blogService.create(blog)
        .then(result=>{
          setBlogs(blogs.concat(result))
          setTitle("")
          setUrl("")
          setAuthor("")
          setNotif(`${blog.title} by ${blog.author} added`)
          setCol("rgb(27, 133, 27)")
          setTimeout(()=>{setNotif(null)},5000)
        }) 
        .catch(error=>{
          setNotif(`title or url not present`)
          setCol("red")
          setTimeout(()=>{setNotif(null)},5000)
        })
  }

  const deleteBlog = async event =>{
      const id =  event.target.value
      blogService.deleteobj(id)
        .then(result=>{
          setBlogs(blogs.filter(blog=>blog.id!==id))
        })
        .catch(error=>{
          setNotif(`Not Authorized to delete`)
          setCol("red")
          setTimeout(()=>{setNotif(null)},5000)
        })
  }

  const logout = async event =>{
    setUser(null)
    window.localStorage.removeItem("loggedBlogUser")
  }

  //display functions
  const loginForm = () => {
    return(
      <div>
        <form onSubmit={handleLogin}>
          <h1>login to application</h1>
          <div>username: <input placeholder="Username"  value={username} onChange={({target})=>setUsername(target.value)}></input></div>  
          <div>password: <input placeholder="Password"  value={password} onChange={({target})=>setPassword(target.value)}></input></div>  
        <button>Submit</button>
      </form>
      </div>
    )
  }

  const blogDisp = () =>{
    return(
      <div>
        <h2>blogs</h2>
        <p>{user.name} logged in<button onClick={logout}>logout</button></p>
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>title: <input value={title} onChange={({target})=>setTitle(target.value)}></input></div>  
          <div>author: <input value={author} onChange={({target})=>setAuthor(target.value)}></input></div>  
          <div>url: <input value={url} onChange={({target})=>setUrl(target.value)}></input></div>  
          <button>Add</button>
        </form>
        {blogs.map(blog =><Blog key={blog.id} value={blog.id} blog={blog} deleteBlog={deleteBlog} />)}
      </div>
    )
  }

  return (
    <div>
      <Notification notif={notif} col={col} />
      {user===null && loginForm()}
      {user!==null && blogDisp()}
    </div>
  )
}

export default App