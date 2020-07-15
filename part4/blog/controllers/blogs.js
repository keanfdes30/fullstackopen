const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User = require('../models/user')
const jwt=require('jsonwebtoken')

blogsRouter.get('/',async (req,res)=>{
  const blogs=await Blog.find({}).populate('user','username name id')
  res.json(blogs)
})

const getTokenFrom = request => {
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    return authorization.substring(7)
  }
  return null
}

blogsRouter.post('/',async (request,response,next)=>{
  try{
    const body = request.body
    const token = getTokenFrom(request)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token|| !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const user = await User.findById(decodedToken.id)
    const blog = new Blog({
      url:body.url,
      title:body.title,
      author:body.author,
      likes:body.likes,
      user: user._id
    })
    if(!body.likes){
      blog.likes = 0
    }
    const savedBlog = await blog.save()
    user.posts = user.posts.concat(savedBlog._id)
    await user.save()

    response.json(savedBlog)
  }catch(error){
    next(error)
  }
})

blogsRouter.delete('/:id',async (request,response,next)=>{
  try{
    const token = getTokenFrom(request)
    console.log(token)
    const decodedToken = jwt.verify(token, process.env.SECRET)
    if (!token || !decodedToken.id) {
      return response.status(401).json({ error: 'token missing or invalid' })
    }
    const blog= await Blog.findById(request.params.id)
    if(blog.user.toString() === decodedToken.id){
      await Blog.findByIdAndRemove(request.params.id)
      response.status(204).end()
    }else{
      return response.status(400).json({error:'blog doesnt belong to user'})
    }
  }catch(error){
    next(error)
  }
})

blogsRouter.put('/:id',async (req,res)=>{
  const id=req.params.id
  const blog= await Blog.findById(id)
  blog.likes+=1
  await Blog.findByIdAndUpdate(id,blog,{mew:true})
  res.json(blog)
})

module.exports = blogsRouter
