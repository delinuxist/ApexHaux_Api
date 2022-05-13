const db = require("../config/db.config");

class Report {
  constructor(id, property_id, reason, descripton, created_on) {
    (this.id = id),
      (this.property_id = property_id),
      (this.created_on = created_on),
      (this.reason = reason),
      (this.descripton = descripton);
  }
}

module.exports = Report;
