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
}

module.exports = Property;
