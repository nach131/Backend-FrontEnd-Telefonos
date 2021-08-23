const { model, Schema } = require('mongoose')

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

const People = model('People', peopleSchema)

module.exports = People
