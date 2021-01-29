import './dataManipulation'

const Pool = require('pg').Pool
const pool = new Pool({
    user: 'postgres',
    host: 'localhost',
    database: 'Vehicles',
    password: '123456',
    port: 5432

})

/**
 * GET all cars
 * 
 * @param {*} request 
 * @param {*} response 
 */
const getCars = (request, response) => {
    pool.query('SELECT "Cars".id , "Cars"."Name" as "CarName", "MakerId", "Makers"."name" as "MakerName", "ModelId", "Models"."Name" as "ModelName" from "Cars" inner join "Makers" on "Makers".id = "Cars"."MakerId" inner join "Models" on "Cars"."ModelId" = "Models".id',
        (error, results) => {
            if (error) {
                throw error
            }
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

    if (await checkIfCarExists(carName)) {
        response.json("This car is already exists.")
        return;
    }


    const modelId = await insertModelIfNotExists(modelName)
    const makerId = await insertMakerIfNotExists(makerName)

    const result = await insertCar(carName, modelId, makerId)

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

    if (await checkIfCarExists(carName)) {
        response.json("This car is already exists.")
        return;
    }

    const modelId = await insertModelIfNotExists(modelName)
    const makerId = await insertMakerIfNotExists(makerName)

    let results = await updateSingleCar(carId, carName, modelId, makerId)


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



module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}