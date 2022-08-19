// const mongoose = require('mongoose')

// const AuthorCollectionSchema = new mongoose.Schema({
//     author_id : {
//         type: String,
//         require:true
//     },
//     author_name:String,
//     age:Number,
//     address:String
// },{timestamps:true})

// module.exports = mongoose.model('authorcollection',AuthorCollectionSchema)


const mongoose=require("mongoose")

const authormodel=new mongoose.Schema({
    author_id:Number,
    author_name:String,
    age:Number,
    address:String
    
},{timestamps:true});

module.exports=mongoose.model("Author",authormodel)