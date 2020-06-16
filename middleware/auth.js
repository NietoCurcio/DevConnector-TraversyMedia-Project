const jwt = require('jsonwebtoken');
const config = require('config');

module.exports = function (req, res, next) {
  // access to req and res cycle, next to give the cycle to our routes
  //   GET token from the header

  const token = req.header('x-auth-token');
  // req take, res send :D

  if (!token) {
    return res.status(401).json({ msg: 'No token, authorization denied' });
  }

  // Verify token
  try {
    const decoded = jwt.verify(token, config.get('jwtSecret'));

    req.user = decoded.user;
    // assign a value to user in request object
    // console.log('Felipao');
    next();
  } catch (err) {
    res.status(401).json({ msg: 'Token is not valid' });
  }
};
