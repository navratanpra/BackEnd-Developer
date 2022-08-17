const BookModel= require("../models/BookModel")

const createBook= async function (req, res) {
    let data= req.body
    let savedData= await BookModel.create(data)
    res.send({msg: savedData})
}

const getBooksData= async function (req, res) {
    let allBooks= await BooksModel.find()
    res.send({msg: allBooks})
}
module.exports.createBook= createBook
module.exports.getBooksData= getBooksData


_//____________________________________xxxxxxxxxxx________________________________________________

//16august assignment

const { count } = require("console");
const BookModel = require("../models/bookModel");
//---------------------1------------------------
const createBook = async function (req, res) {
  let data = req.body;
  let savedData = await BookModel.create(data);
  res.send({ msg: savedData });
};
//------------------------2------------------------
const bookList = async function (req, res) {
  let savedData = await BookModel.find().select({bookName: 1, authorName: 1, _id: 0});
  res.send({ msg: savedData });
};
//----------------------------3-------------------------------
const getBooksInYear = async function (req, res) {
  let savedData = await BookModel.find({year: { $eq: req.body.year}})
  res.send({ msg: savedData });
};
//----------------------------4--------------------------------
const getParticularBooks = async function (req, res) {
  let savedData = await BookModel.find(req.body);
  res.send({ msg: savedData });
};
//-----------------------------5-----------------------------------
const getXINRBooks = async function (req, res) {
  let savedData = await BookModel.find({"price.indianPrice": {$in: [ "100", "200", "500" ]}});
  res.send({ msg: savedData });
};
//-----------------------------------6----------------------------
const getRandomBooks = async function (req, res) {
  let savedData = await BookModel.find({stockAvailable: true,totalPages: { $gt:  500}} )
  res.send({ msg: savedData });
};
module.exports.createBook = createBook;
module.exports.bookList = bookList;
module.exports.getBooksInYear = getBooksInYear;
module.exports.getParticularBooks = getParticularBooks;
module.exports.getXINRBooks = getXINRBooks;
module.exports.getRandomBooks = getRandomBooks;