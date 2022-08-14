
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


//Q1.  9th aug 2022
// -write an api which gives the missing number in an array of integers starting from 1….e.g [1,2,3,5,6,7] : 4 is missing
// router.get("/missing:number',function")
//  (req,res)
// let arr= [1,2,3,4,5,6,7,8,9,10,11,12,13]

// function missingNumber(arr){
//     for(let i=0; i <arr.length; i++){
//     if (i+1 !=arr[i]){
//         return arr [i]-1
//         //return console.log (this is missing from the array',arr[i]-1)
//         //
//     }else{
//     }
// }
// } 
// let result= missingNumber(arr)





//assignment solution is here 10-8-22

let players =[
    {
        "name":"manish",
        "dob" :"1/1/1995",
        "gender":"male",
        "city":"jalandhar",
        "sports":[
            "swimming"
        ],
    },
     
    {
        "name":"gopal",
        "dob" :"1/09/1995",
         "gender": "male",
         "city" :"delhi",
         "sports":[
            "soccer"
         ],
    },
      
     {
         "name":"lokesh",
         "dob" :"1/1/1990",
         "gender":"male",
          "city":"mumbai",
          "sports":[
            "soccer"
          ],
          
        },
        
    ]
   
    router.post('/players1', function(req, res) {
            let isRepeat = false
    for (let i = 0; i < players.length; i++) {
         if (players[i].name == req.body.name ) {
             isRepeat = true
                 break;
             }
         }
if (isRepeat == true) {
 res.send("Data already existed")
 } else {
     players.unshift(req.body)
 res.send(players)
 }
})   




// 10th august 1st assignment

// router.post("/players", function (req, res) {
//     for (let i = 0; i < players.length; i++) {
//         if (players[i].name === req.body.name) {
//             return res.send("player present");
//         }
//     }

//     players.push(req.body);
//     return res.send({ mes: players, status: true });
// });







//2nd assignment


let booking = [
    {
        bookingNumber: 1,
        bookingId: 12,
        sportId: "",
        centerId: "",
        type: "private",
        slot: "16286598000000",
        bookedOn: "31/08/2021",
        bookedFor: "01/09/2021",
    },{
        bookingNumber: 2,
        bookingId: 13,
        sportId: "",
        centerId: "",
        type: "private",
        slot: "16286598000000",
        bookedOn: "31/08/2021",
        bookedFor: "01/09/2021",
    },{
        bookingNumber: 3,
        bookingId: 13,
        sportId: "",
        centerId: "",
        type: "private",
        slot: "16286598000000",
        bookedOn: "31/08/2021",
        bookedFor: "01/09/2021",
    },
];

router.post("/players/:playerName/bookings/:bookingId", function (req, res) {
    let playerExist = false
    for (let i = 0; i < players.length; i++) {
        if (players[i].name == req.params.playerName) {
            playerExist = true
        }
    }
    if (!playerExist) {
        return res.send("This player does not exist")
    }
    for (let i = 0; i < booking.length; i++) {
        if ((booking[i].bookingId == req.params.bookingId)) {
            return res.send("This booking id already existed in Data");
        }
    }
    req.body.playerName = req.params.playerName
    req.body.bookingId = req.params.bookingId

    booking.push(req.body);
    return res.send(booking);
});


//3rd assignment solution:-

let persons = [
    {
      name : "PK",
      age : 10,
      votingstatus : false
    },
    {
        name : "Sk",
        age : 20,
        votingstatus : false
    },
    {
        name : "AA",
        age : 70,
        votingstatus : false
    },
    {
        name : "SC",
        age : 5,
        votingstatus : false
    },
    {
        name : "HQ",
        age : 40,
        votingstatus : false
    }
]

router.post('/voters1', function(req, res) {
    //let result0 = req.query.age
        let result = [];
        for (let i = 0; i < persons.length; i++) {
        let person = persons[i];
        if (person.age >= 18 ) {
            person.votingStatus = true
            result.push(person)
        }}
        if (req.query.age >= 18) {
            res.send(result)
        } else {
            res.send("not eligible for voting")
        }
    })


    module.exports = router