const Blog= require('../models/Blog')

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

module.exports={
  initialBlogs,
  blogstoShow
}