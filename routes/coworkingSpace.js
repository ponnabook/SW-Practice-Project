/** @format */

const express = require('express');
const {
  getCoworkingSpaces,
  getCoworkingSpace,
  createCoworkingSpace,
  updateCoworkingSpace,
  deleteCoworkingSpace,
} = require('../controllers/coworkingSpaces.js');
const router = express.Router();
router.route('/').get(getCoworkingSpaces).post(createCoworkingSpace);
router.route('/:id').get(getCoworkingSpace).put(updateCoworkingSpace).delete(deleteCoworkingSpace);
module.exports = router;
