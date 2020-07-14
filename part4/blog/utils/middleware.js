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
const errorHandler = (error, request, response, next) => {
  console.log(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}
 
module.exports = {requestLogger,errorHandler}