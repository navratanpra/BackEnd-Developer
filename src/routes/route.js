
const express = require('express');
const bcd = require('../logger/logger')
// const cde = require('../util/helper')
const router = express.Router();
const abc=require ('../introduction/intro')



const five=require('../validator/formatter')
let lodash= require('lodash')

router.get('/test-me', function (req, res) {
    console.log('My batch is', abc.name)
     abc.printName()
five.lowercase()
    bcd.welcome()
    // cde.date()
    
let array =['january','february','march','april','may','june','july','august','september','octomber','november','december']
let result1 =lodash.chunk(array,3)
console.log(result1)

//next 
let arr2=[3,5,7,9,11,13,15,17,19,21]
let result2 = lodash.tail(arr2,9)
console.log(result2)

//next 
let arr3=[1,1,2,2,3]
let result3 = lodash.union(arr3)
console.log(result3)

//next 
let arr4 = [["horror","TheShining"],["drama","Titanic"],["fantasy","PansLabyrinth"]];
let result4 = {}
result4= lodash.fromPairs(arr4,1)
console.log(result4)

    res.send('My second ever api!')
});


router.get('/test-you', function(req, res){
    res.send('This is the second routes implementation')
})

router.get('/give-me-students-data',function(req, res){

})
module.exports = router;
// adding this comment for no reason

router.get('/students/:name', function(reu,req){
    console.log("This is a reuest "+JSON.stringify(req.params))
let reqParams = req.parmams
let studentName =reqParams.name
console.log('Name of the student is ', studentName)
//assuming details is firstname + fisrtname
let studentDetails = studentName + " "+studentName

req.send(studentDetails)
})

router.get ('/hello', function (req,rep){
    req.send
}

)



// first question

//first problem movie wala code he idhar 
router.get('/get-movies',function(req, res){ //student detail api he 
    let movies1= ["shole ","Rang de basanti","dil mange more","tiranga"]//api is implementation is used to send response for request
    res.send(movies1)//movies wala iske jese krna he
})



//seond assignment problem
// first que ka movie wala code idhar hai its almost same


router.get('/get-movies',function(req, res){ //student detail api he 
    let movies1= ["shole ","Rang de basanti","dil mange more","tiranga"]//api is implementation is used to send response for request
    res.send(movies1)//movies wala iske jese krna he
})





//3rd question solution:-


router.get('/get-moviess/:indexNumber',function(req, res){ //student detail api he 
    
    let moviesName=['rang de basanti','The shining','Lord of the rings','batman begins']
    let index = req.params.indexNumber;

     if(index > moviesName.length){
        return res.send("use a valid index  ")
     }else{
    
     res.send(moviesName[index])
     }
})



//4th question solution


router.get('/get-/films',function(req, res){ //student detail api he    

    let moviesName=[ {"id": 1,"name": "The Shining"}, 
 {"id": 2,"name": "Incendies"}, 
 {"id": 3,"name": "Rang de Basanti"},
  {"id": 4,"name": "Finding Nemo"}]
    res.send(moviesName)
})


// Fifth Question:-


router.get('/get-/films/:indexNumber',function(req, res){ //student detail api he    

    let moviesName=[ {"id": 1,"name": "The Shining"}, 
 {"id": 2,"name": "Incendies"}, 
 {"id": 3,"name": "Rang de Basanti"},
  {"id": 4,"name": "Finding Nemo"}]
    let index = req.params.indexNumber;
     if(index > moviesName.length){
        return res.send("no movie exist with this id ")
     }else{
     res.send(moviesName[index])
     }
})
