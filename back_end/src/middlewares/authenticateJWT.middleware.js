const jwt = require('jsonwebtoken');

function authenticateJWT(req, res, next) {

 const accessTokenSecret = "secretsecretsecretsecretsecretsecret";
 const authHeader = req.headers.authorization;

 if (authHeader && authHeader.startsWith('Bearer ')) {
  const token = authHeader.split(' ')[1];

  jwt.verify(token, accessTokenSecret, (err, subject) => {
   if (err) {
    return res.sendStatus(401);
   }

   req.user = subject.user;
   next();
  });
 } else {
  res.sendStatus(401);
 }

}

module.exports = authenticateJWT;