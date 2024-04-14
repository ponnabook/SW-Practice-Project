const mongoose = require('mongoose');

const ReservationSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.ObjectId,
        ref: 'User',
        required:true
    },
    reserveDate:{
        type: Date,
        required:true
    },
    coworkingSpaceId:{
        type:mongoose.Schema.ObjectId,
        ref: 'CoworkingSpace',
        required:true
    },
    numberOfRoom:{
        type:Number,
        default:1,
        max:3,
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Reservation',ReservationSchema);