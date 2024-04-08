/** @format */
const CoworkingSpace = require("../models/CoworkingSpace");
//@desc Get all CoworkingSpaces
//@route GET /api/v1/coworkingSpaces
//@access Public
exports.getCoworkingSpaces = async (req, res, next) => {
  try {
    const coworkingSpace = await CoworkingSpace.find();

    if (!coworkingSpace) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: coworkingSpace });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
    
};

//@desc Get sigle CoworkingSpace
//@route GET /api/v1/coworkingSpaces/:id
//@access Public
exports.getCoworkingSpace = async (req, res, next) => {
  try {
    const coworkingSpace = await CoworkingSpace.findById(req.params.id);

    if (!coworkingSpace) {
      return res.status(400).json({ success: false });
    }

    res.status(200).json({ success: true, data: coworkingSpace });
  } catch (err) {
    return res.status(400).json({ success: false });
  }
};

/*

//@desc Create new CoworkingSpace
//@route POST /api/v1/coworkingSpaces
//@access Private
exports.createCoworkingSpace = async(req, res, next) => {
  const coworkingSpace = await CoworkingSpace.create(req.body);
  res.status(201).json({success:true, data:coworkingSpace});
};

//@desc Update CoworkingSpace
//@route PUT /api/v1/coworkingSpaces/:id
//@access Private
exports.updateCoworkingSpace = async(req, res, next) => {
  try{
    const coworkingSpace = await CoworkingSpace.findByIdAndUpdate(req.params.id, req.body, {
        new:true,
        runValidators:true
    });

    if(!coworkingSpace){
        return res.status(400).json({success:false});
    }

    res.status(200).json({success:true, data:coworkingSpace});
} catch(err){
    return res.status(400).json({success:false});
}
};

//@desc Delete CoworkingSpace
//@route DELETE /api/v1/CoworkingSpaces/:id
//@access Public
exports.deleteCoworkingSpace = async(req, res, next) => {
  try{
    const coworkingSpace = await coworkingSpace.findById(req.params.id);
    
    if(!coworkingSpace){
        return res.status(400).json({success:false, message:`Bootcamp not found with id of ${req.params.id}`});
    }

    await coworkingSpace.deleteOne();

    res.status(200).json({success:true, data:{}});
} catch(err){
    return res.status(400).json({success:false});
}
}; */
