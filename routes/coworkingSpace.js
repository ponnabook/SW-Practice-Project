/** @format */

const express = require('express');
const {
  getCoworkingSpaces,
  getCoworkingSpace,
} = require('../controllers/coworkingSpaces.js');

const reservationRouter = require('./reservation.js');

const router = express.Router();

router.use('/:coworkingSpaceId/reservations/', reservationRouter);

router.route('/').get(getCoworkingSpaces);
router.route('/:id').get(getCoworkingSpace);
module.exports = router;
