import React, { useState, useEffect } from 'react'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogDisplay from './components/BlogDisplay'

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
      setBlogs( blogs.sort((a,b)=>b.likes-a.likes) )
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
      const blog=blogs.find(blog=>blog.id===id)
      if(window.confirm(`Remove ${blog.title} by ${blog.author}?`)){
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
  }

  const logout = async event =>{
    setUser(null)
    window.localStorage.removeItem("loggedBlogUser")
  }

  const likeBlog = async event =>{
    const id =  event.target.value
    const blog=blogs.find(n=>n.id===id)
    blog.likes+=1
    blogService.update(id,blog)
      .then(result=>{
        setBlogs(blogs.map(n=>n.id===id?result:n))
      })
  }

  //display functions
  const loginForm = () => {
    return(
      <div>
        <LoginForm
          username={username}
          password={password}
          handleLogin={handleLogin}
          handleUsername={({target})=>setUsername(target.value)}
          handlePassword={({target})=>setPassword(target.value)}
          />
      </div>
    )
  }
  const blogDisp = () =>{
    return(
      <div>
        <BlogDisplay 
          title={title}
          author={author}
          url={url}
          addBlog={addBlog}
          logout={logout}
          user={user}
          blogs={blogs}
          deleteBlog={deleteBlog}
          handleTitle={({target})=>setTitle(target.value)}
          handleAuthor={({target})=>setAuthor(target.value)}
          handleUrl={({target})=>setUrl(target.value)}
          likeBlog={likeBlog}
        />
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