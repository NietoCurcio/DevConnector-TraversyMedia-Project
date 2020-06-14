const express = require('express');
const router = express.Router();
const auth = require('../../middleware/auth');
const User = require('../../models/User');
// @route   GET api/auth
// @desc    Teste route
// @access  private

// just put this middleware as a second parameter, now this route is protected
router.get('/', auth, async (req, res) => {
  // try catch because we're gonna make a call to our database
  try {
    const user = await User.findById(req.user.id).select('-password');
    // since this is a protected route and we use the token which has the id
    // and we set in the middlware req.user to the user in the token
    res.json(user);
    // fill our state with redux with this data, to know which user is logged all the time
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
