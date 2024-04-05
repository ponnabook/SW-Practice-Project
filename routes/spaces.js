/** @format */

const express = require('express');
const {
  getSpaces,
  getSpace,
  createSpace,
  updateSpace,
  deleteSpace,
} = require('../controllers/spaces.js');
const router = express.Router();
router.route('/').get(getSpaces).post(createSpace);
router.route('/:id').get(getSpace).put(updateSpace).delete(deleteSpace);
module.exports = router;
