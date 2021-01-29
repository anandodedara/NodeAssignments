const db = require('./queries')
const express = require('express')
const { request, response } = require('express')

const app = express()
const port = 3000



app.use(express.urlencoded({ extended: true }));



var multer = require('multer');
var strg = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, './uploads/images');
    },
    filename: (req, file, cb) => {
        //console.log(file);
        var filetype = '';
        if (file.mimetype === 'image/gif') {
            filetype = 'gif';
        }
        if (file.mimetype === 'image/png') {
            filetype = 'png';
        }
        if (file.mimetype === 'image/jpeg') {
            filetype = 'jpg';
        }
        cb(null, 'image-' + Date.now() + '.' + filetype);
    }
});
var upload = multer({ storage: strg });


app.post('/upload/:id', upload.single('profilepicture'), function (req, res, next) {
    const id = parseInt(req.params.id);

    if (!req.file) {
        res.status(500);
        return next(err);
    }
    //let filename = req.file.filename


    //db.callback(id, filename);

    res.json({ fileUrl: 'http://localhost:3000/uploads/images/' + req.file.filename });
})



/*


app.get('/', (request, response) => {
    response.json({ info: 'Node.js, Express, and Postgres API' })

})















//get all users
app.get('/users', db.getUsers)

//get user by id
app.get('/users/:id', db.getUserById)

//add new user
app.post('/users/add', db.creteUser)

//update existing user by id
app.put("/users/update/:id", db.updateUserById)

app.delete('/users/delete/:id', db.deleteUser)

*/
app.listen(port, () => {
    console.log("App is running on " + port)
})