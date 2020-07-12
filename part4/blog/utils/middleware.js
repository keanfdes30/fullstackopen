const morgan = require('morgan')

morgan.token('data',(req,res)=>req.body)
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
 
module.exports = {requestLogger}