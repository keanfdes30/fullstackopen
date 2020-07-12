const mongoose=require('mongoose')

const password=process.argv[2]

const url=`mongodb+srv://Kean:${password}@cluster0.jhm7l.mongodb.net/phonebook?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema= new mongoose.Schema({
    name: String,
    number:String
})

const Person=mongoose.model('Person',personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
})
if(process.argv.length===3){
    Person.find({}).then(result => {
        console.log('phonebook:')
        result.forEach(note => {
            console.log(`${note.name} ${note.number}`)          
        })
        mongoose.connection.close()
      })
}else if(process.argv.length===5){
    person.save().then(result => {
        console.log(`added ${person.name} ${person.number} to phonebook`)
        mongoose.connection.close()
    })
}else if(process.argv.length<5){
    console.log("More info needed")
    process.exit(1)
}

