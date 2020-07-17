import React from 'react'
const Blog = ({ blog,expand }) => (
  <div>
    {blog.title}-{blog.author}
    <button onClick={expand}>view</button>
  </div>
)

export default Blog
