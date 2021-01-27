const db = require('./queries')
const express = require('express')
const { request, response } = require('express')

const app = express()
const port = 3000

app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
    
})

//get all users
app.get('/users', db.getUsers)

//add new user
app.post('/users/add', db.addUser)

//update existing user by id
app.put("/users/update",db.updateUserById)

app.delete('/users/delete/',db.deleteUser)

app.listen(port, () => {
    console.log("App is running on " + port)
})