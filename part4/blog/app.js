const express=require('express')
const mongoose=require('mongoose')
const app=express()
const cors = require('cors')
const blogsRouter = require('./controllers/blogs')
const config=require('./utils/config')
const middleware = require('./utils/middleware')

mongoose.connect(config.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(()=>console.log('connected to MongoDB'))
  .catch(error=>console.log(error.message))

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)
app.use('/api/blogs',blogsRouter)

module.exports=app
