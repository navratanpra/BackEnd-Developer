const mongoose = require('mongoose');

const bookSchema = new mongoose.Schema ({
    name :  String ,
    author_id : Number ,
    price : String ,
    rating : String
})
module.exports = mongoose.model('Novel', bookSchema)
