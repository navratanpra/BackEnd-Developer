const express = require('express');
const bodyParser = require('body-parser');
const route = require('./routes/route.js');
const { default: mongoose } = require('mongoose');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


mongoose.connect("mongodb+srv://navratanp:ORPNqe8p2qYtM8K7@cluster0.bsr8sey.mongodb.net/auth-2",{
    useNewUrlParser: true
})
.then( () => console.log("MongoDb is connected"))
.catch ( err => console.log(err) )


app.use('/', route)


app.listen(process.env.PORT || 3002, function () {
    console.log('Express app running on port ' + (process.env.PORT || 3002))
});
