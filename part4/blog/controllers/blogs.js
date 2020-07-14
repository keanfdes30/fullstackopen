const blogsRouter=require('express').Router()
const Blog=require('../models/blog')
const User = require('../models/user')
blogsRouter.get('/',async (req,res)=>{
  const blogs=await Blog.find({}).populate('user','username name id')
  res.json(blogs)
})

blogsRouter.post('/',async (req,res,next)=>{
  try{
    const body=req.body
    const user=await User.findById(body.userId)
    if(body.title === undefined || body.url === undefined){
      return res.status(400).send({error:'required fields not defined'})
    }
    if(body.likes===undefined){
      const blog=new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:0,
        user:user._id
      })
      const saved=await blog.save()
      user.posts=user.posts.concat(saved._id)
      await user.save()
      res.json(blog)
    }else{
      const blog=new Blog({
        title:body.title,
        author:body.author,
        url:body.url,
        likes:body.likes,
        user:user._id
      })
      const saved=await blog.save()
      user.posts=user.posts.concat(saved._id)
      await user.save()
      res.json(blog)
    }
  }catch(error){
    next(error)
  }
})

blogsRouter.delete('/:id',async (req,res)=>{
  await Blog.findByIdAndRemove(req.params.id)
  res.status(204).end()
})

blogsRouter.put('/:id',async (req,res)=>{
  const id=req.params.id
  const blog= await Blog.findById(id)
  blog.likes+=1
  await Blog.findByIdAndUpdate(id,blog,{mew:true})
  res.json(blog)
})

module.exports = blogsRouter
