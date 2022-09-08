const jwt = require("jsonwebtoken");

const authentication = function (req, res, next) {
  try {
    let token = req.headers["x-Api-key"];
    if (!token) token = req.headers["x-api-key"];
    if (!token)
      return res
        .status(403)
        .send({ status: false, msg: "value of key is reqd in header" });
    let decodedToken = jwt.verify(token, "Project1-gp39");
    if (!decodedToken)
      return res.status(403).send({ status: false, msg: "InValid token" });
    req["x-api-key"] = decodedToken;
    next();
  } catch (error) {
    return res.status(500).send({ status: false, msg: error.message });
  }
};


const authorisation = async function (req, res, next) {
  
}

module.exports.authentication = authentication;
module.exports.authorisation = authorisation;
