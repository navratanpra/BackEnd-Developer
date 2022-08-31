const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

//-------------------------createUser------------------------------
const createUser = async (req, res) => {
  
    const data = req.body;
    const savedData = await userModel.create(data);
    res.send({ status: true, msg: savedData });
  }


//-------------------------loginUser------------------------------
const loginUser = async (req, res) => {
 
    const userName = req.body.emailId;
    const password = req.body.password;
    let user = await userModel.findOne({ emailId: userName, password: password });
    if (!user) return res.send({ status: false, msg: "username or the password is not correct" });
    //---------------------token generation-------------------------
    const token = jwt.sign({ userId: user._id.toString(), place: "Murshidabad" }, "Shayan Biswas");
    res.setHeader("x-auth-token", token);
    res.send({ status: true, token: token });
  }
  
//--------------------------getUser-----------------------------
const getUserData = async (req, res) => {

    const userId = req.params.userId;
    const userDetails = await userModel.findById(userId);
    res.send({ status: true, data: userDetails });
  
  }

//-------------------------updateUser------------------------------
const updateUser = async (req, res) => {
  
     let userId = req.params.userId;
     let user = await userModel.findById(userId);
     //Return an error if no user with the given id exists in the db
     if (!user) {
       return res.status(404).send("No such user exists");
     }
     let userData = req.body;
     let updatedUser = await userModel.findOneAndUpdate({ _id: userId }, userData, { new: true });
     res.send({ status: "UserData is Updated", data: updatedUser });
    
    
};
//-------------------------deleteUser------------------------------
const deleteUser = async (req, res) => {
   
    const userId = req.params.userId;
    const updatedUser = await userModel.findOneAndUpdate({ _id: userId }, { $set: { isDeleted: true } }, { new: true });
    res.send({ status: true, data: updatedUser });
  
};

//-------------------------postMassage------------------------------
const postMassage = async (req, res) => {
  
    const userId = req.params.userId;
    const postMsg = req.body.post;
    const user = await userModel.findById(userId);
    user.post = []
    let updatePost = user.post
    updatePost.push(postMsg)
    const postMassage = await userModel.findOneAndUpdate({ _id: userId }, { post: updatePost }, { new: true });
    res.send({ status: true, data: postMassage });
  
};

module.exports = { createUser, loginUser, getUserData, updateUser, deleteUser, postMassage }



//dhfjhjhfjhjfhwuirh
//ufhiewhfuwjdinjnj
//fehjhefjshfj
