const db = require('./queries')
const express = require('express')

const app = express()
const port = 3000


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/cars',db.getCars)

app.get('/cars/:id',db.getCarById)

app.listen(port,()=>{
    console.log("App is running on port ",port)
})