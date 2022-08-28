const { count } = require("console")
const productModel= require("../models/newProductModel")

const createProduct= async function (req, res) {
    let data = req.body
    
    let savedData= await productModel.create(data)
    res.send({data: savedData})
}

module.exports.createproduct= createProduct