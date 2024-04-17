/** @format */

const Reservation = require('../models/Reservation');
const CoworkingSpace = require('../models/CoworkingSpace');
const ReminderEmail = require('./reminderEmail');

//@desc Get all Reservations
//@route GET /api/v1/reservations
//@access Public
exports.getReservations = async (req, res, next) => {
  let query;

  //   General users can see only thier reservations
  if (req.user.role !== 'admin') {
    query = Reservation.find({ user: req.user.id }).populate({
      path: 'coworkingSpace',
    });
  } else {
    //If you are an admin, you can see all
    if (req.params.coworkingSpaceId) {
      query = Reservation.find({
        coworkingSpace: req.params.coworkingSpaceId,
      }).populate({
        path: 'coworkingSpace',
      });
    } else {
      query = Reservation.find().populate({
        path: 'coworkingSpace',
      });
    }
  }

  try {
    const reservations = await query;

    res.status(200).json({
      success: true,
      count: reservations.length,
      data: reservations,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot find Reservation' });
  }
};

//@desc Get sigle Reservation
//@route GET /api/v1/reservations/:id
//@access Public
exports.getReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id).populate({
      path: 'coworkingSpace',
    });

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot find reservation' });
  }
};

//@desc Create new Reservation
//@route POST /api/v1/coworkingSpaces/:coworkingSpaceId/reservations
//@access Private
exports.createReservation = async (req, res, next) => {
  try {
    req.body.coworkingSpace = req.params.coworkingSpaceId;
    const coworkingSpace = await CoworkingSpace.findById(
      req.params.coworkingSpaceId
    );

    if (!coworkingSpace) {
      return res.status(404).json({
        success: false,
        message: `No coworkingspace with the id of ${req.params.coworkingSpaceId}`,
      });
    }

    //add user Id to req.body
    req.body.user = req.user.id;

    // Check for existed reservation
    // const existedReservation = await Reservation.find({ user: req.user.id });

    // If the user is not an admin, they can only create 3 reservation
    // if (existedReservation.length >= 3 && req.user.role !== "admin") {
    if (req.body.numberOfRoom > 3 && req.user.role !== 'admin') {
      return res.status(400).json({
        success: false,
        message: `The user can only reserved up to 3 rooms`,
      });
    }

    const reservation = await Reservation.create(req.body);
    ReminderEmail.sendConfirmation(req.user.email, req.body);
    ReminderEmail.scheduleReminder(req.user.email, req.body);

    res.status(201).json({
      success: true,
      msg:
        'send email reminder to ' +
        req.user.email +
        ' before 1 day of this reservation',
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot create Reservation' });
  }
};

//@desc Update Reservation
//@route PUT /api/v1/reservations/:id
//@access Private
exports.updateReservation = async (req, res, next) => {
  try {
    let reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }
    //Make sure user is the appointment owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to update this reservation`,
      });
    }

    reservation = await Reservation.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: reservation,
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot update Reseravtion' });
  }
};

//@desc Delete Reservation
//@route DELETE /api/v1/reservations/:id
//@access Private
exports.deleteReservation = async (req, res, next) => {
  try {
    const reservation = await Reservation.findById(req.params.id);

    if (!reservation) {
      return res.status(404).json({
        success: false,
        message: `No reservation with the id of ${req.params.id}`,
      });
    }

    //Make sure user is the reservation owner
    if (
      reservation.user.toString() !== req.user.id &&
      req.user.role !== 'admin'
    ) {
      return res.status(401).json({
        success: false,
        message: `User ${req.user.id} is not authorized to delete this bootcamp`,
      });
    }

    await reservation.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.log(error);
    return res
      .status(500)
      .json({ success: false, message: 'Cannot delete Reservation' });
  }
};
