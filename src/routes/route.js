const express = require('express');
const router = express.Router();
const CowinController= require("../controllers/cowinController")
const weather = require("../controllers/weatherController")
const meme = require("../controllers/meamController")



router.get("/test-me", function (req, res) {
    res.send("My first ever api!")
})

// router.get("/weather",weather.londonWeather)
// router.post("/createuser", CowinController.createUser)
router.get("/cowin/states", CowinController.getStates)
router.get("/cowin/districtsInState/:stateId", CowinController.getDistricts)
// router.get("/cowin/getByPin", CowinController.getByPin)
// router.get("/districtbyid", CowinController.getDistrictSessions)



// WRITE A GET API TO GET THE LIST OF ALL THE "vaccination sessions by district id" for any given district id and for any given date

router.post("/cowin/getOtp", CowinController.getOtp)
router.get("/getAllMemes", meme.getAllMemes);
router.post("/createMeme", meme.createMeme);
router.get("/getWeatherAll",weather.getWeatherAll);
router.get("/getWeatherTemp",weather.getWeatherTemp);
router.get("/arrangeByTemp",weather.arrangeByTemp);

module.exports = router;

