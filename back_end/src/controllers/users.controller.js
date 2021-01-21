const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const UsersModel = require('../models/users.model');






exports.loginAndGetUserToken = (req, res) => {

  const credentials = req.body;
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!(credentials.hasOwnProperty('username') &&
    credentials.hasOwnProperty('password') &&
    usernameRegex.test(credentials.username))
  ) {
    res.status(400).send({ message: "Wrong Username or Password!" });
    return;
  }


  UsersModel.getUserHashedPassword(credentials.username, (err, rows) => {

    if (err) {
      console.log('getUserHashedPassword error!');
      res.status(500).send({ message: "Internal Error" });

    } else if (rows.length !== 1) {
      res.status(400).send({ message: "Wrong Username or Password!" });

    } else {

      bcrypt.compare(credentials.password, rows[0].hashedPassword, function (err, result) {

        if (result) {
          token = generateUserJWT(credentials.username);
          res.status(201).send({ accessToken: token });
        } else
          res.status(400).send({ message: "Wrong Username or Password!" });

      });

    }

  });

}


function generateUserJWT(username) {

  const accessTokenSecret = process.env.SECRETKEY;
  const accessToken = jwt.sign({ user: username }, accessTokenSecret);

  return accessToken;

}


exports.getUserInfo = (req, res) => {

  const authenticatedUser = req.user;

  UsersModel.getRole(req.user, (err, rows) => {

    if (err) {
      console.log('getRole error');
      res.status(500).send({ message: "Internal Error" });
    }
    else
      res.status(200).send({ user: authenticatedUser, role: rows[0].role });

  });

}