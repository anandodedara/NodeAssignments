const db = require('./queries')
const express = require('express')
const carImageUpload = require('./file-upload').carImageUpload
const { request, response } = require('express')

const app = express()
const port = 3000

//to use post parameter from request body
app.use(express.urlencoded({ extended: true }))

app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })
})

app.get('/cars', db.getCars)

app.get('/cars/:id', db.getCarById)

app.post('/cars/create', db.createCar)

app.put('/cars/update/:id', db.updateCar)

app.delete('/cars/delete/:id', db.deleteCar)

app.post('/cars/uploadImage/:id', carImageUpload.single('carImage'), (request, response, next) => {
    const file = request.file
    
    if (!file) {
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }else{
        //console.log(request)
        db.insertCarImageRecord(request,response)
    }
})

app.listen(port, () => {
    console.log("App is running on port ", port)
})