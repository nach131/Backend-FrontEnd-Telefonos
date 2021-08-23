require('dotenv').config()
require('../mongo')

const express = require('express')
const cors = require('cors')
const morgan = require('morgan')
const app = express()
const path = require('path')
const People = require('../models/People')

app.use(cors())
app.use(express.json())
const PORT = process.env.PORT || 3001

if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'))
}

app.use(morgan('tiny'))
app.get('/info', (req, res) => {
  const date = new Date().toTimeString()
  res.send(date)
})

app.get('/api/peoples', (req, res) => {
  People.find({}).then(peoples => {
    res.json(peoples)
  })
})

app.get('/api/peoples/:id', (req, res, next) => {
  const { id } = req.params

  People.findById(id).then(people => {
    if (people) {
      return res.json(people)
    } else {
      return res.send('No existe este id')
    }
  }).catch(err => {
    next(err)
  })
})

app.post('/api/peoples', (req, res) => {
  const people = req.body

  if (!people || !people.name) {
    return res.status(400).json({
      error: 'people.content is missing'
    })
  }

  const newPeople = People({
    name: people.name,
    number: people.number
  })

  newPeople.save().then(savedNote => {
    res.json(savedNote)
  })
})

app.delete('/api/peoples/:id', (req, res, next) => {
  const { id } = req.params
  People.findByIdAndRemove(id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
  res.status(204).end()
})

app.put('/api/peoples/:id', (req, res, next) => {
  const { id } = req.params
  const people = req.body

  const NewPeopleInfo = {
    name: people.name,
    number: people.number
  }
  People.findByIdAndUpdate(id, NewPeopleInfo, { new: true })
    .then(result => {
      res.json(result)
    })
})

app.delete('/api/peoples/:id', (req, res, next) => {
  const { id } = req.params
  People.findByIdAndRemove(id).then(result => {
    res.status(204).end()
  }).catch(error => next(error))
  res.status(204).end()
})

app.get('*', (req, res) => res.sendFile(path.resolve('client', 'build', 'index.html')))

app.listen(PORT, console.log(`Server is starting at ${PORT}`))
