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

  static propertiesByType(type, cb) {
    db.query(`select * from properties where type=?`, [type], (err, result) => {
      if (err) {
        return cb(null, err);
      }

      cb(result, null);
    });
  }

  static deletePropertyById(propId, cb) {
    db.query(`delete from properties where id=?`, [propId], (err, result) => {
      if (err) {
        return cb(null, err);
      }
      cb(result, null);
    });
  }

  static propertyById(prodId, cb) {
    db.query(`select * from properties where id=?`, [prodId], (err, result) => {
      if (err) {
        return cb(null, err);
      }
      cb(result, null);
    });
  }
}

module.exports = Property;
