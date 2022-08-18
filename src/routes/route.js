const express = require('express');
const router = express.Router();
const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
const authorController = require("../controllers/authorController")
const authorModel = require("../models/authorModel")
const bookModel = require("../models/bookModel")



router.post("/createBook", authorController.createBook  ) 
router.post("/createNovel" , authorController.createNovel )
router.get("/ChetanBhagatBooks" , authorController.ChetanBhagatBooks)
router.get("/updateTwoStates" , authorController.updateTwoStates)
router.get("/authorPrice" , authorController.authorPrice)
module.exports = router;
