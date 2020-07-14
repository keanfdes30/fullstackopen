const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/',async(req,res)=>{
  const users = await User.find({}).populate('posts')
  res.json(users)
})

usersRouter.post('/',async (req,res,next)=>{
  const body=req.body
  const salt=10
  if(body.password.length<3){
    return res.status(400).send({error:'password is too short'})
  }
  const passwordHash=await bcrypt.hash(body.password,salt)
  try{
    const user=new User({
      username:body.username,
      name:body.name,
      passwordHash
    })
    const saved = await user.save()
    res.json(saved)
  }catch(error){
    next(error)
  }
})

module.exports = usersRouter