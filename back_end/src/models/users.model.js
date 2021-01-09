var dbConnection = require('../../config/db.config');


var Users = {};

Users.getUserHashedPassword = (username, result) => {

 dbConnection.query('\
  SELECT password as hashedPassword FROM users \
  WHERE username=?; \
  ', username, (err, res) => {

  if (err) {
   console.log("Error");
   result(null, err);
  } else
   result(null, res);

 });

}


module.exports = Users;