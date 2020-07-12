const blogsRouter=require('express').Router()
const Blog=require('../models/blog')

blogsRouter.get('/',(req,res)=>{
    Blog.find({})
        .then(blogs=>res.json(blogs))
})

blogsRouter.post('/',(req,res)=>{
    const blog= new Blog(req.body)

    blog.save()
        .then(blog=>res.json(blog))
})

blogsRouter.delete('/:id',(req,res)=>{
    Blog.findByIdAndRemove(req.params.id)
        .then(()=>res.status(204).end())
})

module.exports = blogsRouter
