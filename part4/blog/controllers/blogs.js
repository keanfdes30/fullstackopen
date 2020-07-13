const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/',async (req,res)=>{
  const blogs=await Blog.find({})
  res.json(blogs)
})

blogsRouter.post('/',async (req,res)=>{
  const body=req.body
  if(body.title === undefined || body.url === undefined){
    return res.status(400).send({error:'required fields not defined'})
  }
  if(body.likes===undefined){
    const blog=new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:0
    })
    await blog.save()
    res.json(blog)
  }else{
    const blog=new Blog({
      title:body.title,
      author:body.author,
      url:body.url,
      likes:body.likes
    })
    await blog.save()
    res.json(blog)
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
