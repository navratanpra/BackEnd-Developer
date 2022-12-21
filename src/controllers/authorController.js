const authorModel = require("../models/authorModel");
const validator = require("email-validator");
const jwt = require("jsonwebtoken");

// ========================================create author details in given schema model===============
const createAuthor = async function (req, res) {
  try {

    //================we are putting Inupt in firstName that is required must can not be empty======== 

    let authorData = req.body;
    if (!authorData.fname)
      return res.status(400).send({ status: false, msg: "First name is mandatory" });


    // =====FirstName cant not be empty and firstName should be string.===================

    if (typeof authorData.fname !== "string")
      return res.status(400).send({ status: false, msg: "Invalid First Name" });



    // We are giving input in LastName that is required that is must it cant not be empty========

    if (!authorData.lname)
      return res.status(400).send({ status: false, msg: "Last Name Is Mandatory" });

 // LastName should be string.......................

    if (typeof authorData.lname !== "string")
      return res.status(400).send({ status: false, msg: "Invalid Last Name" });

  // when we are putting the title in the postman it s value cant be empty and title should be mendatory

    if (!authorData.title)
      return res.status(400).send({ status: false, msg: "Title Is A mandatory Field" });


// among of these three enom  (mr, mrs, miss) one is mandatory.

    if (
      authorData.title !== "Mr" &&
      authorData.title !== "Miss" &&
      authorData.title !== "Mrs"
    )
      return res.status(400).send({ status: false, msg: "Title not correct" });



// we are checking validation ( if email id is not present in the postman then it will be shown a msg that please provide a valied email address and it should be unique)
// 400 for Bad Request
//201 means ok it being used for whatver we are creating server or postman it s basically use for server like author,blog etc. (it will msg that successfully created)
//500 is server error
//200 is for Ok everything is perfact

    let validEmail = validator.validate(authorData.email);
    if (validEmail === false)
      return res.status(400).send({ status: false, msg: "Invalid Email" });
    if (!authorData.password)
      return res.status(400).send({ status: false, msg: "Password is Mandatory" });

// we are creating author model given schema

    let savedData = await authorModel.create(authorData);
    return res.status(201)
    .send({ status: true, msg: "author created", data: savedData });
  } catch (error) {
    return res.status(500).send({ status: false, message: error.message });
  }
};

// we are creating login in which we are taking userName and Password from the postman in body section
// 404 page not found
// 201 successfully created 200  is ok 400 is for bad request 401 is for authentication required 403 for forbiddon (not allowed.) 500 for internal server error.

const loginUser = async function (req, res) {
  try {
    let userName = req.body.email;
    let password = req.body.password;

    let user = await authorModel.findOne({
      email: userName,
      password: password,
    });
    if (!user)
      return res.status(404).send({ status: false, msg: "eamil or password is incorrect" });

//we are creating a json token which is from my authorId when we create it will be devided in 3parts 
// 1st header,2nd is payload 3rd is signature secrete key->("Project1-gp39")

    let token = jwt.sign(
      {
        authorId: user.authorId,
        batch: "plutonium",
        project: "First",
      },
      "Project1-gp39"
    );

// we are setting the header in the postman as a api, x-api-token (..........)

    res.setHeader("x-api-key", token);

    // we are sending response in this line
    res.status(200).send({ status: true, token: token });
  } catch (error) {
    res.status(500).send({ status: false, msg: error.message });
  }
};

module.exports.createAuthor = createAuthor;
module.exports.loginUser = loginUser;
