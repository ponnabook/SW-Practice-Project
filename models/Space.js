/** @format */

const mongoose = require('mongoose');
const SpaceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name'],
    unique: true,
    trim: true,
    maxlength: [50, 'Name can not be more than 50 characters'],
  },
  address: {
    type: String,
    required: [true, 'Please add an address']
  },
  telephone: {
    type: String,
    required: [true, 'Please add a telephone']
  },
  openTime: {
    type: Date,
    required: [true, 'Please add a open time'],
  },
  closeTime: {
    type: Date,
    required: [true, 'Please add a close time'],
  }
});
module.exports = mongoose.model('Space', SpaceSchema);
