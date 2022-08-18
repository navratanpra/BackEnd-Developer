

//16august assignment
const { count } = require("console")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")

const createBook = async function (req, res) {
    let data = req.body

    let savedData = await authorModel.create(data)
    res.send({ msg: savedData })
}
const createNovel = async function (req, res) {
    let data = req.body

    let savedData = await bookModel.create(data)
    res.send({ msg: savedData })
}

const ChetanBhagatBooks = async function (req, res) {
    let data = await authorModel.findOne({ author_name: "Chetan Bhagat" }).select({ author_id: 1, _id: 0 })
    console.log(data);
    let list = await bookModel.find(data);
    res.send({ Data: list });
}

const updateTwoStates = async function (req, res) {
    let data = await bookModel.findOneAndUpdate(
        { name: "Two states" },
        { $set: { price: 100 } },
        { new: true }
    )
    let author = await authorModel.findOne({ author_id: data.author_id }).select({ author_name: 1, _id: 0 });
    res.send({ Data: data, author_name: author.author_name })
}

const authorPrice = async function (req, res) {
    let book = await bookModel.find( { price : { $gte: 50, $lte: 100} } ).select({ _id : 0, author_id :1})//.forEach
    //console.log(book)
    let temp = []
    for (let i = 0; i < book.length; i++) {
        let y = book[i].author_id
        temp.push(y)
    }
    let authorName = await authorModel.find( {$in : temp} ).select({_id : 0,author_name : 1})
    res.send({msg: authorName})
}


module.exports.createBook = createBook
module.exports.createNovel = createNovel
module.exports.ChetanBhagatBooks = ChetanBhagatBooks
module.exports.updateTwoStates = updateTwoStates
module.exports.authorPrice = authorPrice





//______________________________17th august assignment_____________________________________________________

