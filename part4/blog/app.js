const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const usersRouter = require('./controllers/users')
const config=require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URL, { useCreateIndex:true, useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('connected to MongoDB'))
  .catch(error=>console.log(error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/users',usersRouter)
app.use('/api/blogs',blogsRouter)
app.use(middleware.errorHandler)

module.exports=app
