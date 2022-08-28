const mongoose = require('mongoose');
  const ObjectId = mongoose.Schema.Types.ObjectId

  
const bookingSchema = new mongoose.Schema( {
     
    userId : {
        type : ObjectId,
        ref : 'userdoc'
    },
           productId:{
            type:ObjectId,
            ref: 'product'
           },
    amount: Number,
	isFreeAppUser: Boolean,

	date: Number

}, { timestamps: true });

module.exports = mongoose.model('bookingdoc' , bookingSchema)