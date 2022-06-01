const Property = require("../models/property.model");
const cloudinary = require("../utils/cloudinary");

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
        status: "error",
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

  const input = {
    id,
    ownerId,
  };

  Property.propertyById(id, (data, err) => {
    // check error
    if (err) {
      return next(err);
    }
    if (data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `Property with id: ${id} not found`,
      });
    }

    Property.deletePropertyById(input, (_, err) => {
      // check error
      if (err) {
        return next(err);
      }
      res.status(200).json({
        status: "success",
        data: data[0],
      });
    });
  });
};

exports.productsById = (req, res, next) => {
  const { id } = req.params;

  Property.propertyById(id, (data, err) => {
    if (err) {
      return next(err);
    }
    if (data.length === 0) {
      return res.status(404).json({
        status: "error",
        message: `Property with id: ${id} not found`,
      });
    }
    res.status(200).json({
      status: "success",
      data: data[0],
    });
  });
};

exports.allProperties = (req, res, next) => {
  const ownerId = req.user.userId;
  Property.allProperties(ownerId, (data, err) => {
    if (err) {
      return next(err);
    }

    if (data.length === 0) {
      return res.status(200).json({
        status: "succes",
        message: "No data.. Please create property ads",
      });
    }

    res.status(200).json({
      status: "success",
      count: data.length,
      data: data,
    });
  });
};

exports.createProperty = async (req, res, next) => {
  const { status, price, state, city, address, type } = req.body;

  const result = await cloudinary.uploader.upload(req.file.path);

  const id = result.public_id;

  const image_url = result.secure_url;

  const owner = req.user.userId;

  const created_on = new Date().toJSON().slice(0, 19).replace("T", " ");

  const newProp = new Property(
    id,
    owner,
    status,
    Number(price),
    state,
    city,
    address,
    type,
    image_url,
    created_on
  );

  Property.createProperty(newProp, async (err, data) => {
    if (err) {
      await cloudinary.uploader.destroy(id);
      return next(err);
    }

    res.status(201).json({
      status: "success",
      data: data,
    });
  });
};
