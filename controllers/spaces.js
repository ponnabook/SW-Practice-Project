/** @format */

//@desc Get all spaces
//@route GET /api/v1/spaces
//@access Public
exports.getSpaces = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Show all spaces' });
};

//@desc Get sigle space
//@route GET /api/v1/spaces/:id
//@access Public
exports.getSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Show space ${req.params.id}` });
};

//@desc Create new space
//@route POST /api/v1/spaces
//@access Private
exports.createSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: 'Create new spaces' });
};

//@desc Update space
//@route PUT /api/v1/spaces/:id
//@access Private
exports.updateSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Update space ${req.params.id}` });
};

//@desc Delete space
//@route DELETE /api/v1/spaces/:id
//@access Private
exports.deleteSpace = (req, res, next) => {
  res.status(200).json({ success: true, msg: `Delete space ${req.params.id}` });
};
