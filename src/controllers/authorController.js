const authorModel = require("../models/authorModel");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

const createAuthor = async function (req, res) {
  try {
    let authorData = req.body;
    if (!authorData.fname)
      return res
        .status(400)
        .send({ status: false, msg: "First name is mandatory" });
    if (typeof authorData.fname !== "String")
      return res.status(400).send({ status: false, msg: "Invalid First Name" });
    if (!authorData.lname)
      return res
        .status(400)
        .send({ status: false, msg: "Last Name Is Mandatory" });
    if (typeof authorData.lname !== "String")
      return res.status(400).send({ status: false, msg: "Invalid Last Name" });
    if (!authorData.title)
      return res
        .status(400)
        .send({ status: false, msg: "Title Is A Mandatory Field" });

    let validEmail = validator.validate(authorData.email);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Invalid Email" });
    if (!authorData.password)
      return res
        .status(400)
        .send({ status: false, msg: "Password is Mandatory" });
    let savedData = await authorModel.create(authorData);
    return res.status(201).send({ status: true,msg:"author created", data: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};


const loginUser = async function (req, res) {
  try {
    let userName = req.body.email;
    let password = req.body.password;

    let user = await authorModel.findOne({ email: userName, password: password });
    if (!user)    return res.status(404).send({status: false, msg: "User not found",});

    let token = jwt.sign(
      {
        userId: user._id.toString(),
        batch: "plutonium",
        project: "First",
      },
      "Project1-gp39"
    );
    res.status(200).send({ status: true, token: token });

  } catch (error) {
    res.status(500).send({status : false, msg : error.message})
  }
  
};

module.exports.createAuthor = createAuthor;
module.exports.loginUser = loginUser;
