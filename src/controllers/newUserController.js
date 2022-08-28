const { count } = require("console")
const userdocModel= require("../models/newUserModel")

const createuserdoc = async function (req, res) {
    let data = req.body
let headerdata = req.headers["isfreeappuser"]
  data.isfreeappuser = headerdata
if(!headerdata){
    return res.send({"msg":"isFreeAppUser is required"})
}
        let savedData= await userdocModel.create(data)
        res.send({data: savedData})
}
module.exports.createuserdoc = createuserdoc


