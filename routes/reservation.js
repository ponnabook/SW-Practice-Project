/** @format */

const express = require('express');
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations.js');
const router = express.Router();
router.route('/').get(getReservations).post(createReservation);
router.route('/:id').get(getReservation).put(updateReservation).delete(deleteReservation);
module.exports = router;
