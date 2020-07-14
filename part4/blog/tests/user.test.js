const mongoose=require('mongoose')
const app=require('../app')
const supertest=require('supertest')
const bcrypt=require('bcrypt')
const api= supertest(app)
const User = require('../models/user')
const helper = require('./blog_helper')

describe('when there is initially one user in db', ()=>{
  //reloading original data before every test
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', passwordHash })

    await user.save()
  })  
  test('creation succeeds', async ()=>{
    const usersAtStart = await helper.usersinDb()

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersinDb()
    expect(usersAtEnd).toHaveLength(usersAtStart.length + 1)

    const usernames = usersAtEnd.map(u => u.username)
    expect(usernames).toContain(newUser.username)
  })
  test('duplicate username is rejected',async ()=>{
    const user = {
      username:'root',
      name:'kean',
      password:'time'
    }

    const result=await api
      .post('/api/users')
      .send(user)
      .expect(400)
    expect(result.error.text).toContain('`username` to be unique')
  })
})
afterAll(async () => {
  mongoose.connection.close()
})