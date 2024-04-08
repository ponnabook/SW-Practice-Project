/** @format */

//@desc Get all CoworkingSpaces
//@route GET /api/v1/coworkingSpaces
//@access Public
exports.getCoworkingSpaces = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all CoworkingSpaces' });
};

//@desc Get sigle CoworkingSpace
//@route GET /api/v1/coworkingSpaces/:id
//@access Public
exports.getCoworkingSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show CoworkingSpace ${req.params.id}` });
};

//@desc Create new CoworkingSpace
//@route POST /api/v1/coworkingSpaces
//@access Private
exports.createCoworkingSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new CoworkingSpaces' });
};

//@desc Update CoworkingSpace
//@route PUT /api/v1/coworkingSpaces/:id
//@access Private
exports.updateCoworkingSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update CoworkingSpace ${req.params.id}` });
};

//@desc Delete CoworkingSpace
//@route DELETE /api/v1/CoworkingSpaces/:id
//@access Private
exports.deleteCoworkingSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete CoworkingSpace ${req.params.id}` });
};
