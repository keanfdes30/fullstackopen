const morgan = require('morgan')

morgan.token('data',(req)=>req.body)
const requestLogger = morgan((tokens,req,res)=>{
  const string=[
    tokens.method(req,res),
    tokens.url(req,res),
    tokens.status(req,res),
    tokens.res(req,res,'content-length'),'-',
    tokens['response-time'](req,res),'ms'
  ]
  if(tokens.method(req,res)==='POST'){
    string.push(JSON.stringify(tokens.data(req,res)))
  }
  return string.join(' ')
})

const tokenHandler = (request,response,next) =>{
  const authorization = request.get('authorization')
  if (authorization && authorization.toLowerCase().startsWith('bearer ')) {
    request.token = authorization.substring(7)
  }else{
    return null
  }
  next()
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }else if (error.name === 'JsonWebTokenError'){
    return response.status(400).json({error:'invalid token'})
  }else if (error.name === 'TypeError'){
    return response.status(500).json({error:'the id doesnt exist'})
  }

  next(error)
}
 
module.exports = {requestLogger,errorHandler,tokenHandler}