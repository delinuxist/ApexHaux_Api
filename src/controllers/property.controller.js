const Property = require("../models/property.model");

exports.searchByType = (req, res, next) => {
  // destructure type from req.query
  const { type } = req.query;

  // get user id from req.user
  const ownerId = req.user.userId;

  Property.propertiesByType({ type, ownerId }, (data, err) => {
    // check errors
    if (err) {
      return next(err);
    }
    if (data.length === 0) {
      return res.status(404).json({
        error: "error",
        message: `Type: ${type} searched returned 0 array`,
      });
    }
    res.status(200).json({
      status: "success",
      data: data,
    });
  });
};
