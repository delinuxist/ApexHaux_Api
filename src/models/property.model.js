const db = require("../config/db.config");

class Property {
  constructor(
    id,
    owner,
    status = "available",
    price,
    state,
    city,
    address,
    type,
    image_url,
    created_on
  ) {
    (this.id = id),
      (this.owner = owner),
      (this.status = status),
      (this.price = price),
      (this.state = state),
      (this.city = city),
      (this.address = address),
      (this.type = type),
      (this.image_url = image_url),
      (this.created_on = created_on);
  }

  static propertiesByType({ type, ownerId }, cb) {
    db.query(
      `select * from properties where type=? and owner=?`,
      [type, ownerId],
      (err, result) => {
        if (err) {
          return cb(null, err);
        }

        cb(result, null);
      }
    );
  }

  static deletePropertyById({ prodId, ownerId }, cb) {
    db.query(
      `delete from properties where id=? and owner=?`,
      [prodId, ownerId],
      (err, result) => {
        if (err) {
          return cb(null, err);
        }
        cb(result, null);
      }
    );
  }

  static propertyById(prodId, cb) {
    db.query(`select * from properties where id=?`, [prodId], (err, result) => {
      if (err) {
        return cb(null, err);
      }
      cb(result, null);
    });
  }

  static allProperties(ownerId, cb) {
    db.query(
      `select * from properties where owner=?`,
      [ownerId],
      (err, result) => {
        if (err) {
          return cb(null, err);
        }
        cb(result, null);
      }
    );
  }

  static createProperty(newProp, cb) {
    db.query(
      `insert into properties values(?,?,?,?,?,?,?,?,?,?)`,
      [
        newProp.id,
        newProp.owner,
        newProp.status,
        newProp.price,
        newProp.state,
        newProp.city,
        newProp.address,
        newProp.type,
        newProp.image_url,
        newProp.created_on,
      ],
      (err, result) => {
        if (err) {
          return cb(err, null);
        }
        cb(null, {
          id: newProp.id,
          status: newProp.status,
          price: newProp.price,
          state: newProp.state,
          city: newProp.city,
          address: newProp.address,
          type: newProp.type,
          image_url: newProp.image_url,
          created: newProp.created_on,
        });
      }
    );
  }
}

module.exports = Property;
