const productModel = require("../models/productModel")
const userModel = require("../models/userModel")
const orderModel = require("../models/orderModel")

const createOrder = async (req, res) => {
 let data = req.body
    let pId = data.productId
    let uId = data.userId
    //-------------product validation------------
    let product = await productModel.findById(pId);
    if (!product) res.send({ msg: "Product doesn't exit" })
    //---------------user validation--------------
    let user = await userModel.findById(uId)
    if (!user) res.send({ msg: "User doesn't exit" });

    let header = req.headers["isfreeappuser"];//true or false
    let headerValue = false;//true
    if (header === "true") headerValue = true;
    let order = {
        isFreeAppUser: headerValue,//true 
        productId: pId,
        userId: uId
    }
    //-----------------scenario-3------------------
    if (headerValue) {
        order.amount = 0
        await orderModel.create(order)
        return res.send({ msg: "Order Created", data: order});
    }
    else {
        //-----------------scenario-1------------------
        if (user.balance >= product.price) {
            user.balance  -= product.price
            await user.save()
            order.amount = product.price
        
            await orderModel.create(order)
            return res.send({ msg: "Order Created", data: order});
        } else {
            //-----------------scenario-2------------------
            return res.send({ msg: "User has not sufficient balance" });
        }
    }
}

module.exports = { createOrder }