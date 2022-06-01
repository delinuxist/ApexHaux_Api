const Property = require("../models/property.model");

exports.searchByType = (req, res, next) => {
  // destructure type from req.query
  const { type } = req.query;

  Property.propertiesByType(type, (data, err) => {
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

exports.deletePropertyById = (req, res, next) => {
  // destructure id from req.params
  const { id } = req.params;
  // get user id from req.user
  const ownerId = req.user.userId;

  Property.propertyById(id, (data, err) => {
    // check error
    if (err) {
      return next(err);
    }
    if (!data) {
      return res.status(404).json({
        error: "error",
        message: `Property with id: ${id} not found`,
      });
    }

    Property.deletePropertyById(id, ownerId, (_, err) => {
      // check error
      if (err) {
        return next(err);
      }
      res.status(200).json({
        status: "success",
        data: data,
      });
    });
  });
};
