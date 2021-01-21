const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {

 const accessTokenSecret = process.env.SECRETEKEY;
 const authHeader = req.headers.authorization;

 if (authHeader && authHeader.startsWith('Bearer ')) {
  const token = authHeader.split(' ')[1];

  jwt.verify(token, accessTokenSecret, (err, subject) => {
   if (err) {
    return res.status(401).send({ message: "Unauthorized" });
   }

   req.user = subject.user;
   next();
  });

 } else {
  res.status(400).send({ message: "Bad Bearer token" });
 }

}

module.exports = authenticateJWT;