module.exports = {
    dbConnection: {
        user: 'postgres',
        host: 'localhost',
        database: 'Vehicles',
        password: '123456',
        port: 5432
    },
    server: {
        PORT: 3000,
    },
    jwtConfig: {
        algorithm: "HS256",
        secretKey: "Test@12345",
    },
    imageUrlPrefix:"http://localhost:3000/uploads/images/",

};