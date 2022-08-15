const mongoose = require('mongoose');

const BookSchema = new mongoose.Schema( {
    BookName: {
        type: String,
        required: true
    },

    AuthorName: {
        type: String,
        
        required: true
    },
    Category: {
        type: String,
        
        required: true
    
    },
    
    emailId: String,
    gender: {
        type: String,
        enum: ["horror", "science", "history"] //"falana" will give an error
    },
    Year: Number,
    
}, { timestamps: true });

module.exports = mongoose.model('Book', BookSchema) //users



