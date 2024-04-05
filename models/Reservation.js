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
    coworkingSpace:{
        type:mongoose.Schema.ObjectId,
        ref: 'Space',
        required:true
    },
    createdAt:{
        type: Date,
        default: Date.now
    }
});

module.exports=mongoose.model('Reservation',ReservationSchema);