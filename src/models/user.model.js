const db = require("../config/db.config");

class User {
  constructor(
    id,
    email,
    first_name,
    last_name,
    password,
    phone,
    address,
    is_admin
  ) {
    (this.id = id),
      (this.email = email),
      (this.first_name = first_name),
      (this.last_name = last_name),
      (this.password = password),
      (this.phone = phone),
      (this.address = address),
      (this.is_admin = is_admin);
  }

  static create(newUser, cb) {
    db.query(
      `insert into users values(?,?,?,?,?,?,?,?)`,
      [
        newUser.id,
        newUser.email,
        newUser.first_name,
        newUser.last_name,
        newUser.password,
        newUser.phone,
        newUser.address,
        newUser.is_admin,
      ],
      (err, result) => {
        if (err) {
          return cb(null, err);
        }
        cb(
          {
            first_name: newUser.first_name,
            last_name: newUser.last_name,
            email: newUser.email,
          },
          null
        );
      }
    );
  }

  static findUserByEmail(email, cb) {
    db.query(`select * from users where email=?`, [email], (err, result) => {
      if (err) {
        return cb(err, null);
      }
      cb(null, result[0]);
    });
  }
}

module.exports = User;
