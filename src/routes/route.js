const express = require("express");
const router = express.Router();

const authorController = require("../controllers/authorController");
const blogController = require("../controllers/blogController")
const authenticate = require("../middleware/authenticate")


router.post("/authors", authorController.createAuthor);

router.post("/blogs", authenticate.authentication, blogController.createBlog);

router.post("/login", authorController.loginUser)

router.get("/blogs", authenticate.authentication, blogController.getBlogs);

router.put("/blogs/:blogId", authenticate.authentication, blogController.updateBlogs);

router.delete("/blogs/:blogId", authenticate.authentication, blogController.deleteBlogs);

router.delete("/blogs", authenticate.authentication, blogController.deleteBlogsByQuery)



module.exports = router;




