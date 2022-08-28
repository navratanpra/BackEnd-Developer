const { count } = require("console")
const bookingModel= require("../models/newBookingController")
const UserdocModel= require("../models/newUserController")
const ProductModel= require("../models/newProductController")
const userdoc = require("../models/userdoc")


const createbooking= async function (req, res) {
    let data = req.body
    
    let userId = data.userId
    let productId = data.productId
    
   if(!userId) {
    return res.send ({msg:'userId is mandatory field'})
   }else if(!productId){
    return res.send({msg:'please enter valid productId'})
   }
   let UserId = await UserdocModel.findById(userId)
   let ProductId = await ProductModel.findById(productId)

   if(!UserId){
    return res.send("this user id is not found in user database")
   }else if(!ProductId) {
    return res.send("this product id is not found in any database")
   }else {}
    
   let tokan = req.headers.isfreeappuser
   console.log(tokan)
   let val = 0 
   // if free app user is true
   if (tokan === "true"){
    data.amount = val
    data.isFreeAppUser = tokan
    
        let savedData= await bookingModel.create(data) 
        res.send({data: savedData})
   }
 // if freeappuser is false
   else if (UserId.balance >= ProductId.price){
    await userdoc.findOneAndUpdate({_id:userId},
        {$set: {balance : UserId.balance - ProductId.price}})
        data['amount']= ProductId.price;
        data['isFreeAppUser'] = req.headers.isfreeappuser;
        let savedData = await bookingModel.create(data)
        res.send({msg:savedData})
   } else {
     res.send("insufficient balance")
   }


}

module.exports.createbooking = createbooking