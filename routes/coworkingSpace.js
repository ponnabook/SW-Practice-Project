/** @format */

const express = require('express');
const {
  getCoworkingSpaces,
  getCoworkingSpace
} = require('../controllers/coworkingSpaces.js');
const router = express.Router();
router.route('/').get(getCoworkingSpaces);
router.route('/:id').get(getCoworkingSpace);
module.exports = router;
