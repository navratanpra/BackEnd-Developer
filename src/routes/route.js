const express = require('express');
const router = express.Router();

const authorController= require("../controllers/authorController")
const bookController= require("../controllers/bookController")
const publishController= require("../controllers/publisherController")

router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

router.post("/createAuthor", authorController.createAuthor  )
router.post("/createPublisher", publishController.createPub )
router.get("/getAuthorsData", authorController.getAuthorsData)
router.get("/createPub", publishController.createPub) 
router.put("/getbookauthor", bookController.getBooksWithAuthorDetails) 
router.post("/getbooksData", bookController.getBooksData )
router.post("/createBook", bookController.createBook )

// router.get("/getBooksData", bookController.getBooksData)

// router.get("/getBooksWithAuthorDetails", bookController.getBooksWithAuthorDetails)

module.exports = router;


