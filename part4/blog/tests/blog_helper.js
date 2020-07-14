const Blog= require('../models/blog')
const User = require('../models/user')

const initialBlogs = [
  {
    title:'first',
    author:'kean',
    url:'test',
    likes:5
  },
  {
    title:'second',
    author:'kena',
    url:'test',
    likes:6
  },
  {
    title:'third',
    author:'ripvanwinkle',
    url:'test',
    likes:3
  }
]

const blogstoShow = async () =>{
  const blogs=await Blog.find({})
  return blogs.map(n=>n.toJSON())
}
const usersinDb = async() =>{
  const users = await User.find({})
  return users.map(n=>n.toJSON())
}


module.exports={
  initialBlogs,
  blogstoShow,
  usersinDb
}