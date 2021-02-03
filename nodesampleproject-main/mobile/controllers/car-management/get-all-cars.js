var HttpStatusCode = require("http-status-codes");
var dbConnection = require('../../../utilities/postgresql-connection.js');
let imageUrlPrefix = require('../../../config').imageUrlPrefix

exports.getAllCars = function (req, res) {
    var entityData = {};

    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {

            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }

    function getAllCars(req, entityData) {
        return new Promise(function (resolve, reject) {
            const sqlQuery = 'SELECT "Cars".id , "Cars"."Name" as "CarName",' +
                '"MakerId", "Makers"."name" as "MakerName", ' +
                '"ModelId", "Models"."Name" as "ModelName", ' +
                'images from "Cars" ' +
                'inner join "Makers" on "Makers".id = "Cars"."MakerId" ' +
                'inner join "Models" on "Cars"."ModelId" = "Models".id  ' +
                'inner join (' +
                '    select "CarId", array_agg("CarImages"."ImageName")  as images' +
                '    from "CarImages" ' +
                '    group by "CarImages"."CarId"' +
                ') as "CarImage" on "Cars".id = "CarImage"."CarId"';
            dbConnection.getResult(sqlQuery).then(function (response) {
                if (response.data.length > 0) {

                    response.data.forEach(element => {
                        for(let i=0;i<element.images.length;i++){
                            element.images[i] = imageUrlPrefix+element.images[i]
                        }
                    });

                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: response,
                        message: req.i18n.__('RecordListedSuccessfully')
                    });
                } else {
                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: [],
                        message: req.i18n.__('NoRecord')
                    });
                }
            })
                .catch(function (error) {
                    res.status(error.status).json({
                        data: error.data
                    });
                });
        });
    }

    validateFields(req, res).then(function (response) {
        getAllCars(req, response.data).then(function (response) {
            res.status(response.status).json({
                data: response.data.data,
                message: response.message
            });
        })
            .catch(function (error) {
                res.status(error.status).json({
                    data: error.data
                });
            });
    })
        .catch(function (error) {
            res.status(error.status).json({
                data: error.data
            });
        });

}