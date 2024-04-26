/** @format */

const express = require('express');
const {
  getReservations,
  getReservation,
  createReservation,
  updateReservation,
  deleteReservation,
} = require('../controllers/reservations.js');

const router = express.Router({ mergeParams: true });

const { protect, authorize } = require('../middleware/auth');

router
  .route('/')
  .get(protect, authorize('admin', 'user'), getReservations)
  .post(protect, authorize('admin', 'user'), createReservation);
router
  .route('/:id')
  .get(protect, authorize('admin', 'user'), getReservation)
  .put(protect, authorize('admin', 'user'), updateReservation)
  .delete(protect, authorize('admin', 'user'), deleteReservation);
module.exports = router;
