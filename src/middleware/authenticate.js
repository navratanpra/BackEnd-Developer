const jwt = require("jsonwebtoken");
//const blogModel = require("../models/blogModel");

const authentication = function (req, res, next) {
  try {
    // we are setting the x-api-key and also setting the token in the postman header section

    let token = req.headers["x-Api-key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token)
      return res.status(403).send({ status: false, msg: "token must be present" });

        // when we verify the jwt then in which there are two parts 1 part is token and second part is secrete key-> ("project-gp39")

    let decodedToken = jwt.verify(token, "Project1-gp39");
    if (!decodedToken)
      return res.status(403).send({ status: false, msg: "InValid token" });
    req.putAuthorId = decodedToken.userId;
    //console.log(req.authorId)

    next();
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.authentication = authentication;

