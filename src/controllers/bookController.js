const authorModel = require("../models/authorModel")
const bookModel= require("../models/bookModel")
const publisherModel1=require("../models/publisherModel")
const mongoose=require('mongoose')

const createBook = async function (req, res) {
    let book = req.body
    let author1 = book.authorId
    let publisher1 = book.publisherId
    let isValid = mongoose.Types.ObjectId.isValid(author1)
    let isValid1 = mongoose.Types.ObjectId.isValid(publisher1)
    // if (isValid === false) {
    //     return res.send("invalid lenght of author")
    // } else if (isValid1 === false) {
    //     return res.send("invalid length of publisher id ")
    // }

    let idfromauthor = await authorModel.findById(author1)
    let idfromPublisher = await publisherModel1.findById(publisher1)



    if (!idfromauthor) {
        return res.send("this author dosent exist")
    } else if (!idfromPublisher) {
        return res.send("this publisher dosent exist")
    } else if (!idfromauthor && !idfromPublisher) {
        return res.send("author and publisher both id's are invalid , please try with valid id ")
    } else {
        let bookCreated = await bookModel.create(book)
        res.send({ data: bookCreated })
    }
}

const getBooksData = async function (req, res) {
    
    let books =  await bookModel.find().populate("authorId").populate("publisherId")    
   res.send({ data: books })
}

const getBooksWithAuthorDetails = async function (req, res) {
   
     let data =   await publisherModel1.find({name : ["Penguin","Harper Collins"]}).select({_id : 1})
     let bookid = await bookModel.updateMany({ publisherId : data },{ $set : {isHardCover : true , new : true }},{upsert : true})

     let authorIds = await authorModel.find( { ratings : { $gt : 3.5 }}).select({_id : 1})
     let rating1 = await bookModel.updateMany({authorId : authorIds }, { $inc : {price :10 }},{upsert : true})
  
     res.send({ data: bookid , rating1})
   }  
   



// const getBooksWithAuthorDetails = async function (req, res) {
//     let specificBook = await bookModel.find().populate('author_id')
//     res.send({data: specificBook})

// }

module.exports.createBook= createBook
module.exports.getBooksData= getBooksData
module.exports.getBooksWithAuthorDetails= getBooksWithAuthorDetails

// module.exports.getBooksWithAuthorDetails = getBooksWithAuthorDetails