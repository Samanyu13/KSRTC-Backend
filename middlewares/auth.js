const jwt = require('jsonwebtoken');
var config = require('../config/api.json');
const secret = config.API_SECRET; //+ user's unique secret";
var auth = {};

auth.jwtVerifyToken = function (req, res, next)
{
  console.log(req.headers);
  const token = req.headers['x-access-token'];
  if (!token)
  {
    console.log('no token');
    return res.status(403).send({ auth : false, message : 'No token provided.' });
  }
  return jwt.verify(token, secret, function(err, decoded)
  {
    if (err)
    {
      console.log('failed verification');
      return res.status(500).send({ auth : false, message : 'Failed to authenticate token.' });
    }

    // if everything good, save to request for use in other routes
    console.log('everything good');
    req.decoded = decoded;
    return next();
  });
}
module.exports = auth;