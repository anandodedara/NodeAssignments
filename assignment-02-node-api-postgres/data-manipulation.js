
const pool = require('./db-connection').pool



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

async function insertCarImageRecord(carId,imageName){


    let query = `INSERT INTO public."CarImages" ("CarId", "ImageName") VALUES(${carId},'${imageName}');`

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

//####################################################

module.exports = {
    insertCar,
    insertModelIfNotExists,
    insertMakerIfNotExists,
    checkIfCarExists,
    updateSingleCar,
    insertCarImageRecord

}