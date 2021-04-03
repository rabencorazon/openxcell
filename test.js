var express = require('express')
var multer = require('multer')
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, __dirname + '/public/posts')
    },
    filename: function (req, file, cb) {
        console.log("names : ", file)
        cb(null, file.fieldname + '-' + Date.now())
    }
})
var upload = multer({ storage })

var app = express()

app.post('/upload', upload.array('photos'), function (req, res, next) {
    // req.files is array of `photos` files
    // req.body will contain the text fields, if there were any
});

app.listen(4545)