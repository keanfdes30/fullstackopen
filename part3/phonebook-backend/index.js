const express= require("express")
require("dotenv").config()
const morgan = require("morgan")
const app = express()
const cors=require("cors")
const Person = require("./models/person")

app.use(express.static("build"))
app.use(express.json())
app.use(cors())
morgan.token("data",(req)=>req.body)
app.use(morgan((tokens, req, res) =>{
  const strings= [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, "content-length"), "-",
    tokens["response-time"](req, res), "ms",
  ]
  if(tokens.method(req,res)==="POST"){
    strings.push(JSON.stringify(tokens.data(req,res)))
  }else if(tokens.method(req,res)==="PUT"){
    strings.push(JSON.stringify(tokens.data(req,res)))
  }
  return strings.join(" ")
}))

app.get("/api/persons",(req,res)=>{
  Person.find({})
    .then(result=>res.json(result))
    .catch(error=>{
      console.log(error)
      res.status(404).end()
    })
})

app.get("/info",(req,res)=>{
  const date=new Date()
  Person.find({})
    .then(result=>res.send(`<p>Phonebook has ${result.length} entries</p><p>${date}</p>`))
    .catch(error=>{
      console.log(error)
      res.status(404).end()
    })
})

app.get("/api/persons/:id",(req,res,next)=>{
  Person.findById(req.params.id)
    .then(result=>{
      if(result){
        res.json(result)
      }else{
        console.log("id doesnt exist")
        res.status(404).end()
      }
    })
    .catch(error=>next(error))
})

app.delete("/api/persons/:id",(req,res,next)=>{
  Person.findByIdAndRemove(req.params.id)
    .then(res.status(204).end())
    .catch(error=>next(error))
})

app.post("/api/persons/",(req,res,next)=>{
  const newp=req.body
  if(newp===undefined){
    return res.status(400).send({error:"content missing"})
  }
  const person= new Person({
    name:newp.name,
    number:newp.number,
  })
  person.save()
    .then(result=>{
      res.json(result)
    })
    .catch(error=>next(error))
})

app.put("/api/persons/:id",(req,res,next)=>{
  const body=req.body
  Person.findByIdAndUpdate(req.params.id,{name:body.name,number:body.number},{new:true}) //setting runValidators:true creates Validation error so validation property for put method not implemented
    .then(result=>res.json(result))
    .catch(error=>next(error))
})

const errorHandler = (error,request,response,next)=>{
  console.log(error.message)
  if(error.name==="CastError"){
    return response.status(400).send({error:"malformatted id"})
  }else if(error.name==="ValidationError"){
    return response.status(400).send({error:error.message})
  }
  next(error)
}
app.use(errorHandler)

const PORT = process.env.PORT || 3001
app.listen(PORT,() => {
  console.log(`Server running on port ${PORT}`)
})


