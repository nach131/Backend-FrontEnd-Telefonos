const { model, Schema } = require('mongoose')
const mongoose = require('mongoose')

// const connectioString = process.env.MONGO_DB_URI
const connectioString = 'mongodb://localhost:27017/BootcampTelefonos'

// conexion mongodb
mongoose.connect(connectioString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false,
  useCreateIndex: true
})
  .then(() => {
    console.log('Esta conectado')
  }).catch(err => {
    console.log(err)
  })

const peopleSchema = new Schema({
  name: String,
  number: String
})

peopleSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id
    delete returnedObject._id
    delete returnedObject.__v
  }
})

// Nombre del modelo en singular
const People = model('People', peopleSchema)

const people = new People({
  name: 'Arto Hellas',
  number: '040-123456'
})

people.save()
  .then(result => {
    console.log(result)
    mongoose.connection.close()
  })
  .catch(err => {
    console.error(err)
  })

// en la consola node Add Note.js
