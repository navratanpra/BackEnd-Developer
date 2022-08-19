// const express = require('express');
// const router = express.Router();
// // const UserModel= require("../models/userModel.js")
// const UserController= require("../controllers/userController")
// const BookController= require("../controllers/bookController")
// const Bookcollection= require("../controllers/bookcollection")  
// const authorcollection= require("../controllers/bookController")



const express = require('express');
const router = express.Router();
// const UserModel= require("../models/userModel.js")
const UserController= require("../controllers/userController")
const BookController= require("../controllers/bookController")
router.post("/createBook",BookController.createBook)
router.post("/createAuthor",BookController.createAuthor)
router.post("/chetanbhagat",BookController.chetanbhagat)
router.post("/twostates",BookController.twostates)
router.post("/between50_100",BookController.between50_100)


module.exports= router;

























