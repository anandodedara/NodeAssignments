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


//######################################################################################
//Data Manipulation Functions

/**
 * Function to insert new record in Car table
 * @param {string} carName 
 * @param {int} modelId 
 * @param {int} makerId 
 */
async function insertCar(carName, modelId, makerId) {
    let query = 'INSERT INTO public."Cars" ("Name", "MakerId", "ModelId") VALUES($1, $2, $3);'

    let results = await pool.query(query, [carName, makerId, modelId])

    if (results.rowCount > 0) {
        return true
    } else {
        return false
    }

}


/**
 * Insert new model to database in Models table
 * @param {string} modelName 
 */
async function insertModel(modelName) {
    let query = `INSERT INTO public."Models" ("Name") VALUES($1) RETURNING id;`

    let results = await pool.query(query, [modelName])

    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        console.log(`Model inserted ID is : ${results.rows[0].id}`)
        return results.rows[0].id
    }

}

/**
 * Insert new maker to database in Makers table
 * @param {string} makerName 
 */
async function insertMaker(makerName) {

    let query = 'INSERT INTO public."Makers" ("name") VALUES($1) RETURNING id;'

    let results = await pool.query(query, [makerName])

    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        console.log(`Maker inserted ID is : ${results.rows[0].id}`)
        return results.rows[0].id
    }


}


/**
 * check if input model exists then return it's id otherwise insert that model in database
 * @param {string} modelName 
 */
async function insertModelIfNotExists(modelName) {



    let query = `SELECT id from "Models" WHERE "Models"."Name" = '${modelName}'`;


    let results = await pool.query(query);

    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        console.log(`ID is : ${results.rows[0].id}`)
        return results.rows[0].id
    } else {
        return await insertModel(modelName)
    }

}


/**
 * check if input maker exists then return it's id otherwise insert that maker in database
 * @param {string} makerName 
 */
async function insertMakerIfNotExists(makerName) {

    let query = `SELECT id FROM public."Makers" WHERE "name"=$1;`;

    let results = await pool.query(query, [makerName])

    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        console.log(`ID is : ${results.rows[0].id}`)
        return results.rows[0].id
    } else {
        return await insertMaker(makerName)
    }



}

/**
 * This is use to check if car exists or not by carName
 * @param {string} carName 
 */
async function checkIfCarExists(carName) {

    let query = `SELECT "Cars"."Name" from "Cars" WHERE "Cars"."Name" = '${carName}'`;

    let results = await pool.query(query)

    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        return true
    } else {
        return false
    }
}

/**
 * This is function for updating car record in database
 * 
 * @param {*} carId 
 * @param {*} carName 
 * @param {*} modelId 
 * @param {*} makerId 
 */
async function updateSingleCar(carId, carName, modelId, makerId) {
    let query = `UPDATE public."Cars" SET "Name"='${carName}', "MakerId"='${makerId}', "ModelId"='${modelId}' WHERE id='${carId}';`;

    let results = await pool.query(query)

    console.log(results)
    if (results instanceof Error) {
        throw results
    }
    else if (results.rowCount > 0) {
        return true
    } else {
        return false
    }
}

//####################################################


module.exports = {
    getCars,
    getCarById,
    createCar,
    updateCar,
    deleteCar
}