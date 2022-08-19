// const { count } = require("console")
// const BookModel= require("../models/bookModel")
// const bookcollection= require("../models/bookcollection")
// const authorModel = require("../models/authorModel")
// const bookModel = require("../models/bookModel")
 
// const createbookname= async function(req,res){
//   let data = req.body
//   let alldata = await bookcollection(data)
//   res.send({msg:alldata})
// }

//   module .exports.createbookname = createbookname

//   //_______________________________________ problem 1__________________________________________________

//   const getbooksData = async function (req, res) {
//     let authors = await authorModel.find({author_name :"Chetan Bhagat"})
//     let bookid = await BookModel.find({ author_id : { $eq : authors[0].author_id}})
//     res.send( {msg : bookid })
//   }



//   //_______________________________________problem 2________________________________________________________

//   const findauthor = async function (req, res) {
//     let bookprice = await BookModel.findOneAndUpdate(
//     {name: "Two states"}, //condition
//     { price : 100 },  //update in data
//     { new: true} // , upsert: true
    
//     )
//     let updateprice =  bookprice.price;
//     let authorupdate = await authorModel.find({ author_id: { $eq : bookprice.author_id}}).select({author_name : 1, _id : 0})
//     res.send({msg : authorupdate , updateprice } )
//   }



// // ______________________________________3rdproblem______________________________________________________________________


// const findbooks = async function (req, res) {

// let allBooks = await bookModel.find({ price : {$gte: 50, $lte: 100}})
// let store = allBooks.map(x => x.author_id);
// let NewBooks = await authorModel.find({author_id : store}).select({author_name : 1, _id :0})
// res.send(NewBooks)

// }


// // ____________________________________done_______________________________________________________________________________________



// const createBook= async function (req, res) {
//     let data= req.body

//     let savedData= await BookModel.create(data)
//     res.send({msg: savedData})
// }

// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find( {authorName : "HO" } )
//     console.log(allBooks)
//     if (allBooks.length > 0 )  res.send({msg: allBooks, condition: true})
//     else res.send({msg: "No books found" , condition: false})
// }


// const updateBooks= async function (req, res) {
//     let data = req.body // {sales: "1200"}
//     // let allBooks= await BookModel.updateMany( 
//     //     { author: "SK"} , //condition
//     //     { $set: data } //update in data
//     //  )
//     let allBooks= await BookModel.findOneAndUpdate( 
//         { authorName: "ABC"} , //condition
//         { $set: data }, //update in data
//         { new: true , upsert: true} ,// new: true - will give you back the updated document // Upsert: it finds and updates the document but if the doc is not found(i.e it does not exist) then it creates a new document i.e UPdate Or inSERT  
//      )
     
//      res.send( { msg: allBooks})
// }

// const deleteBooks= async function (req, res) {
//     // let data = req.body 
//     let allBooks= await BookModel.updateMany( 
//         { authorName: "FI"} , //condition
//         { $set: {isDeleted: true} }, //update in data
//         { new: true } ,
//      )
     
//      res.send( { msg: allBooks})
// }




// // CRUD OPERATIONS:
// // CREATE
// // READ
// // UPDATE
// // DELETE



// module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
// module.exports.updateBooks= updateBooks
// module.exports.deleteBooks= deleteBooks










const BookModel= require("../models/bookModel")
const authormodel=require("../models/authormodel")

const createBook= async function (req, res) {
    let data= req.body

    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}
const createAuthor= async function (req, res) {
  let data= req.body

  let savedData= await authormodel.create(data)
  res.send({msg: savedData})
}


const chetanbhagat=async function(req,res){
  let authorId=await authormodel.find({author_name:"Chetan Bhagat"}).select({ _id : 0,author_id :1 })
  console.log(authorId)
// let id = await Authormodel.find({author_name:"Chetan Bhagat"}).select({author_Id:1,_id:0})
  let bookname=await BookModel.find(authorId[0]).select({name:1,_id:0})
  res.send({msg:bookname})
}
const twostates=async function(req,res){
  let savedData = await BookModel.findOneAndUpdate(
      { name : "Two states" } , { $set: { price : 100} } , { new : true } 
      ).select({ _id : 0,author_id : 1 })
      let updatePrice = await BookModel.find({ name : "Two states"}).select({ _id : 0,price :1})
      let newPrice = updatePrice[0]
      let savedData2 = await authormodel.find(savedData).select({ _id :0 ,author_name : 1})
      res.send({msg: savedData2 , updatedPrice : newPrice })
}
let between50_100=async function(req,res){
  let allBooks=await BookModel.find({price:{$gte:50,$lte:100}})
  
  let id=allBooks.map(item=>item.author_id)
  
  let authName=await authormodel.find({author_id:id}).select({author_name:1,_id:0})
  res.send(authName) 

  
}
  
  
   
    
  


// const getBooksData= async function (req, res) {
//     let allBooks= await BookModel.find(  { authorName : "SK" , isPublished: true }  )
//     res.send({msg: allBooks})
// }

module.exports.createBook= createBook
// module.exports.getBooksData= getBooksData
module.exports.createAuthor= createAuthor
module.exports.chetanbhagat= chetanbhagat
module.exports.twostates= twostates
module.exports.between50_100= between50_100