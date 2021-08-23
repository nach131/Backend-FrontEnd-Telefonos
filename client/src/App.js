import React, { useState, useEffect } from 'react'
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { getAll, create, update } from './services/peoples'

import { Button, Form, ListGroup } from 'react-bootstrap';

const App = () => {
  const [persons, setPersons] = useState([])

  useEffect(() => {
    getAll()
      .then(initialPeoples => {
        setPersons(initialPeoples)
      })
  }, [])


  const [newName, setNewName] = useState('')
  const [newNumero, setNewNumero] = useState('')

  // const handleClick = () => {
  //   let name = {
  //     "name": newName
  //   }
  //   console.log(name);
  //   setPersons([...persons, name])
  //   setNewName('')
  // }

  // e.preventDefault() para que no refresque la pagina
  const addPerson = (e) => {
    e.preventDefault()
    let newPeople = {
      "name": newName,
      number: newNumero
    }

    const existingPerson = persons.find(f => f.name === newName)
    if (existingPerson) {
      const id = existingPerson.id
      update(id, newPeople)
        .then(returnPeople => {
          setPersons(persons.map(people => people.id !== id ? people : returnPeople))
          setNewName('')
          setNewNumero('')
        })

    } else {
      console.log(newPeople);
      create(newPeople)
        .then(returnPeople => {
          setPersons([...persons, returnPeople])
          setNewName('')
          setNewNumero('')
        })
    }
  }

  return (
    <div className="App">
      <header className="App-header">
        <h2 className="mt-4">Phonebook</h2>
        <div className="row">
          <div className="col-4 mx-auto">
            <Form
              onSubmit={addPerson}
              className="mb-3">
              <Form.Control
                placeholder='Name'
                aria-label="Name"
                aria-describedby="basic-addon2"
                onChange={e => setNewName(e.target.value)}
                value={newName}
              />   <Form.Control
                className="mt-2"
                placeholder='Numero'
                aria-label="Numero"
                aria-describedby="basic-addon2"
                onChange={e => setNewNumero(e.target.value)}
                value={newNumero}
              />
              {/* <Form.Control
                className="mt-4"
                placeholder='Buscar'
                aria-label="Buscar"
                aria-describedby="basic-addon2"
                onChange={ }
                value={ }
              > */}

              <Button
                className="mt-4"
                variant="outline-secondary"
                id="button-send"
                type="submit"
              // onSubmit={addPerson}
              // onClick={addPerson}
              >
                Enviar
              </Button>
            </Form>
          </div>
        </div>
        <h3>Persons & Numbers</h3>
        <div className="row">

          <ListGroup className="col-4 lista">
            {persons.map(item => (<ListGroup.Item key={item.id}>{item.name}</ListGroup.Item>))}
          </ListGroup>
          <ListGroup className="col-3 ">
            {persons.map(item => (<ListGroup.Item key={item.id}>{item.number}</ListGroup.Item>))}
          </ListGroup>
        </div>
      </header>
    </div>
  )
}

export default App