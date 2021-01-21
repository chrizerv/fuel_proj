const UsersModel = require('../models/users.model');


function authorizeOwner(req, res, next) {

  UsersModel.getRole(req.user, (err, rows) => {

    if (err) {
      console.log('getRole Error!');
      res.status(500).send({ message: "Internal Error" });
    }
    else {

      if (rows[0].role === 'stationOwner') {
        next();

      } else
        res.status(401).send({ message: "Unauthorized" });
    }



  });
}

module.exports = authorizeOwner;