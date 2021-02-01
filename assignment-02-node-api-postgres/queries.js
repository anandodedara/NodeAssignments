const data = require('./data-manipulation')
const pool = require('./db-connection').pool
const carImageUpload = require('./file-upload').carImageUpload

/**
 * GET all cars
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getCars = (request, response) => {
    pool.query('SELECT "Cars".id , "Cars"."Name" as "CarName", "MakerId", "Makers"."name" as "MakerName", "ModelId", "Models"."Name" as "ModelName", "CarImages"."ImageName" from "Cars" inner join "Makers" on "Makers".id = "Cars"."MakerId" inner join "Models" on "Cars"."ModelId" = "Models".id  inner join "CarImages" on "Cars".id = "CarImages".id',
        (error, results) => {
            if (error) {
                throw error
            }
            results.rows.forEach(element => {
                element.ImageName = `http://localhost:3000/uploads/images/${element.ImageName}`
            });
            response.status(200).json(results.rows)
        })
}
/**
 * GET Car by ID
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getCarById = (request, response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT "Cars".id , "Cars"."Name" as "CarName", "MakerId", "Makers"."name" as "MakerName", "ModelId", "Models"."Name" as "ModelName" from "Cars" inner join "Makers" on "Makers".id = "Cars"."MakerId" inner join "Models" on "Cars"."ModelId" = "Models".id WHERE "Cars".id = $1',
        [id], (error, results) => {
            if (error) {
                response.status(500).json("Internal Error.")
                throw error
            }
            response.status(200).json(results.rows)

        })
}

/**
 * POST Add new car record in database
 * 
 * @param {*} request 
 * @param {*} response 
 */
const createCar = async (request, response) => {

    const carName = request.body.carName
    const modelName = request.body.modelName
    const makerName = request.body.makerName
    console.log(request.body)

    if (await data.checkIfCarExists(carName)) {
        response.json("This car is already exists.")
        return;
    }


    const modelId = await data.insertModelIfNotExists(modelName)
    const makerId = await data.insertMakerIfNotExists(makerName)

    const result = await data.insertCar(carName, modelId, makerId)

    if (result) {
        response.status(200).json("Car inserted successfully.")
    }
    else {
        response.status(500).json("Error while inserting car record.")
    }

}


/**
 * PUT Update car record in database
 * @param {*} request 
 * @param {*} response 
 */
const updateCar = async (request, response) => {
    const carId = request.params.id
    const carName = request.body.carName
    const modelName = request.body.modelName
    const makerName = request.body.makerName

    if (await data.checkIfCarExists(carName)) {
        response.json("This car is already exists.")
        return;
    }

    const modelId = await data.insertModelIfNotExists(modelName)
    const makerId = await data.insertMakerIfNotExists(makerName)

    let results = await data.updateSingleCar(carId, carName, modelId, makerId)


    if (results) {
        response.status(200).json("Car details updated")
    }
    else {
        response.status(200).json("Error while updating details. Please check inputed details.")
    }
}


/**
 * DELETE car record by ID
 * 
 * @param {*} request 
 * @param {*} response 
 */
const deleteCar = async (request, response) => {
    const id = request.params.id

    let query = `delete from "Cars" where id = ${id}`
    let results = await pool.query(query)

    console.log(results)

    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        response.status(200).json("Car record deleted.")
    } else {
        response.status(200).json("This car does not exists.")
    }

}

const insertCarImageRecord = async (request, response) => {

    const carId = parseInt(request.params.id);
    const fileName = request.file.filename
    if (!request.file) {
        response.status(500).json('Car image not found.');
        return;
    } 
    let result = await data.insertCarImageRecord(carId, fileName)
    if (result) {
        response.status(200).json({ message: "Image uploaded successfully." })
    } else {
        response.status(500).json({ message: "Error while uploading image." })
    }

}




module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar,
    insertCarImageRecord
}