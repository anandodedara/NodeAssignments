const db = require('./queries')
const express = require('express')

const app = express()
const port = 3000

//to use post parameter from request body
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/cars',db.getCars)

app.get('/cars/:id',db.getCarById)

app.post('/cars/create',db.createCar)

app.put('/cars/update/:id',db.updateCar)

app.delete('/cars/delete/:id',db.deleteCar)

app.listen(port,()=>{
    console.log("App is running on port ",port)
})