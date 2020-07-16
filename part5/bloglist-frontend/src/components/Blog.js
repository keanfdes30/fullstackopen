import React from 'react'
const Blog = ({ blog,deleteBlog,value }) => (
  <div>
    {blog.title} {blog.author}<button value={value} onClick={deleteBlog}>Delete</button>
  </div>
)

export default Blog
