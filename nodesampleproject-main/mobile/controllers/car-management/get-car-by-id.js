var StatusCode = require('http-status-codes');
var dbConnection = require('../../../utilities/postgresql-connection.js');
var settings = require('../../../config.js');
var validate = require('validator');
var HttpStatusCode = require("http-status-codes");

exports.getUserById = function (req, res) {
    var entityData = {
        Id: req.params.id
    };

    function validateFields(req, res) {
        return new Promise(function (resolve, reject) {
            var isUserIdEmpty = validate.isEmpty(entityData.Id);
            if (isUserIdEmpty) {
                return resolve({
                    status: HttpStatusCode.StatusCodes.BAD_REQUEST,
                    result: req.i18n.__('UserIdRequired')
                });
                //return res.status(400).send({ result: req.i18n.__('UserIdRequired') });
            }

            return resolve({
                status: HttpStatusCode.StatusCodes.OK,
                data: entityData
            });
        });
    }

    function getCarById(req, entityData) {
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
                `) as "CarImage" on "Cars".id = "CarImage"."CarId" where "Cars".id = ${entityData.Id}`;

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
                        message: 'Record listed successfully!!!'
                    });
                } else {
                    return resolve({
                        status: HttpStatusCode.StatusCodes.OK,
                        data: [],
                        message: 'No record found!!!'
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
        getCarById(req, response.data).then(function (response) {
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