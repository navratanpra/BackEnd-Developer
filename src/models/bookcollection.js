const mongoose = require('mongoose')

const BookCollectionSchema = new mongoose.Schema({
    book_name:String,
    author_id:{
        type:Number,
        required:true
    },
    price:Number,
    ratings: Number
},{timestamps:true})
 

module.exports = mongoose.model('BookCollection',BookCollectionSchema)
