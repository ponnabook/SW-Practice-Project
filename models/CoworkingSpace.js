/** @format */

const mongoose = require('mongoose');
const CoworkingSpaceSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please add a name'],
      unique: true,
      trim: true,
      maxlength: [50, 'Name can not be more than 50 characters'],
    },
    address: {
      type: String,
      required: [true, 'Please add an address'],
    },
    telephone: {
      type: String,
      required: [true, 'Please add a telephone'],
    },
    openTime: {
      type: String,
      required: [true, 'Please add a open time'],
    },
    closeTime: {
      type: String,
      required: [true, 'Please add a close time'],
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

//Reverse populate with virtuals
CoworkingSpaceSchema.virtual('reservations', {
  ref: 'Reservation',
  localField: '_id',
  foreignField: 'coworkingSpace',
  justOne: false,
});
module.exports = mongoose.model('CoworkingSpace', CoworkingSpaceSchema);
