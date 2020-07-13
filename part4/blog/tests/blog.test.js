const mongoose=require('mongoose')
const app=require('../app')
const supertest=require('supertest')
const api= supertest(app)
const helper = require('./blog_helper')
const Blog=require('../models/blog')

//reloading database with original data
beforeEach(async () => {
  await Blog.deleteMany({})

  const obj = helper.initialBlogs
    .map(n=>new Blog(n))
  const promiseArr=obj.map(n=>n.save())
  await Promise.all(promiseArr)
})
//tests
test('blogs are returned as json', async () =>{
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type',/application\/json/)
})

test('returns correct number of blog posts', async () =>{
  const response = await api.get('/api/blogs')
  expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('successful post request', async () =>{
  const newBlog = {
    title:'third',
    author:'ripvanwinkle',
    url:'test',
    likes:3
  }
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type',/application\/json/)  

  const blogstoShow = await helper.blogstoShow()
  expect(blogstoShow.length).toBe(helper.initialBlogs.length+1)
})

test('likes defaults to 0 if not specified', async () =>{
  let temp =100
  const newBlog = {
    title:'third',
    author:'ripvanwinkle',
    url:'test'
  }  
  await api
    .post('/api/blogs')
    .send(newBlog)
  const result=await helper.blogstoShow() 
  result.forEach(n=>{
    if(n.title===newBlog.title && n.author===newBlog.author && n.url===newBlog.url){
      temp=n.likes
    }
  })
  expect(temp).toBe(0)
})

test('missing title or url return status 400', async () =>{
  const newBlog = {
    author:'papa',
    url:'test'
  }  
  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)
})

test('check if identifier gets changed to id', async ()=>{
  const response=await helper.blogstoShow()
  response.forEach(n=>expect(n.id).toBeDefined())
})

test('checking if deleting works', async() =>{
  const temp=await helper.blogstoShow()
  const todelete = temp[2]

  await api
    .delete(`/api/blogs/${todelete.id}`)
    .expect(204)
  const check=await helper.blogstoShow()
  expect(check.length).toBe(helper.initialBlogs.length-1)
})

test('check if identifier gets changed to id', async ()=>{
  const response=await helper.blogstoShow()
  response.forEach(n=>expect(n.id).toBeDefined())
})

test('checking if updating likes works', async() =>{
  const temp=await helper.blogstoShow()
  const toupdate = temp[2]
  await api
    .put(`/api/blogs/${toupdate.id}`)
    .send({...toupdate,likes:toupdate.likes+1})
    .expect(200)
  const check =await helper.blogstoShow()
  expect(check[2]).toEqual({
    id:toupdate.id,
    title:'third',
    author:'ripvanwinkle',
    url:'test',
    likes:4
  })
})
//closing database connection
afterAll(async () => {
  await Blog.deleteMany({})

  const obj = helper.initialBlogs
    .map(n=>new Blog(n))
  const promiseArr=obj.map(n=>n.save())
  await Promise.all(promiseArr)
  mongoose.connection.close()
})