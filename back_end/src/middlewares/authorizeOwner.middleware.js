const UsersModel = require('../models/users.model');


function authorizeOwner(req, res, next) {

 UsersModel.getRole(req.user, (err, rows) => {

  if (rows[0].role === 'stationOwner') {
   next();

  } else
   res.sendStatus(403);

 });
}

module.exports = authorizeOwner;