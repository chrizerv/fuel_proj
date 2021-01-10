const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UsersModel = require('../models/users.model');






exports.loginAndGetUserToken = (req, res) => {

 const credentials = req.body;

 UsersModel.getUserHashedPassword(credentials.username, (err, rows) => {

  if (err || rows.length !== 1) {
   console.log('WRONG');
   res.status(401).send({ state: "Wrong Username or Password!" });
  }
  else {

   bcrypt.compare(credentials.password, rows[0].hashedPassword, function (err, result) {

    if (result) {
     token = generateUserJWT(credentials.username);
     res.send({ accessToken: token });
    } else
     res.status(401).send({ state: "Wrong Username or Password!" });

   });

  }

  function generateUserJWT(username) {

   const accessTokenSecret = "secretsecretsecretsecretsecretsecret";
   const accessToken = jwt.sign({ user: username }, accessTokenSecret);

   return accessToken;

  }



  //res.status(200).send(rows);


 });

}