var dbConnection = require('../../config/db.config');


var Users = {};

Users.getUserHashedPassword = (username, result) => {

  dbConnection.query('\
  SELECT password as hashedPassword FROM users \
  WHERE username=?; \
  ', username, (err, rows) => {

    if (err) {
      result(true, err);
    } else
      result(false, rows);

  });

}

Users.getRole = (username, result) => {

  dbConnection.query('\
  SELECT role FROM users \
  WHERE username=?; \
  ', username, (err, rows) => {

    if (err) {
      result(true, err);
    } else
      result(false, rows);

  });

}


module.exports = Users;