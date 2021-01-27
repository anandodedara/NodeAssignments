const Pool = require('pg').Pool
const pool = new Pool({
    user:'postgres',
    host:'localhost',
    database:'Vehicles',
    password:'123456',
    port:5432

})

const getCars = (request,response) =>{
    pool.query('SELECT "Cars".id , "Cars"."Name" as "CarName", "MakeId", "Make"."name" as "MakerName", "ModelId", "Models"."Name" as "ModelName" from (("Cars" inner join "Make" on "Make".id = "Cars"."MakeId") inner join "Models" on "Cars"."ModelId" = "Models".id)',
    (error,results)=>{
        if(error){
            throw error
        }
        response.status(200).json(results.rows)
    })
}

const getCarById = (request,response) => {
    const id = parseInt(request.params.id)

    pool.query('SELECT "Cars".id , "Cars"."Name" as "CarName", "MakeId", "Make"."name" as "MakerName", "ModelId", "Models"."Name" as "ModelName" from (("Cars" inner join "Make" on "Make".id = "Cars"."MakeId") inner join "Models" on "Cars"."ModelId" = "Models".id) WHERE "Cars".id = $1',
    [id], (error,results)=>{
        if(error){
            response.status(500).json("Internal Error.")
            throw error
        }
        response.status(200).json(results.rows)

    })
}


module.exports = {
    getCars,
    getCarById
}