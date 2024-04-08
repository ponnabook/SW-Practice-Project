/** @format */

//@desc Get all Reservations
//@route GET /api/v1/reservations
//@access Public
exports.getReservations = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Show all Reservations' });
  };
  
  //@desc Get sigle Reservation
  //@route GET /api/v1/reservations/:id
  //@access Public
  exports.getReservation = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Show Reservation ${req.params.id}` });
  };
  
  //@desc Create new Reservation
  //@route POST /api/v1/reservation
  //@access Private
  exports.createReservation = (req, res, next) => {
    res.status(200).json({ success: true, msg: 'Create new Reservation' });
  };
  
  //@desc Update Reservation
  //@route PUT /api/v1/Reservation/:id
  //@access Private
  exports.updateReservation = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Update Reservation ${req.params.id}` });
  };
  
  //@desc Delete Reservation
  //@route DELETE /api/v1/Reservation/:id
  //@access Private
  exports.deleteReservation = (req, res, next) => {
    res.status(200).json({ success: true, msg: `Delete Reservation ${req.params.id}` });
  };
  