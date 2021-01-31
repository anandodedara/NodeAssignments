let multer = require('multer');

let storage = multer.diskStorage({
    destination: (request, file, callback) => {
        callback(null, './uploads/images/')
    },
    filename: (request, file, callback) => {
        let filetype = ''
        if (file.mimetype === 'image/png') {
            filetype = 'png'
        }
        else if (file.mimetype === 'image/jpg') {
            filetype = 'jpg'
        }
        else if (file.mimetype === 'image/jpeg') {
            filetype = 'jpeg'
        }
        callback(null, `car-${Date.now()}.${filetype}`)
    }
});
let carImageUpload = multer({ storage: storage })


module.exports = {
    carImageUpload
}