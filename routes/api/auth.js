const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const { check, validationResult } = require('express-validator');
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

// @route   POST api/auth
// @desc    authenticate user & get token
// @access  public
router.post(
  '/',
  [
    check('email', 'Please include a valid email').isEmail(),
    check('password', 'Please is required').exists(),
  ],
  async (req, res) => {
    const errors = validationResult(req); // remember req.body, req.params, req.query and req.header
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    // User.findOne().then().catch()

    try {
      // Verify if user exist
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
        // this array is for embedded with errors array in our validation
      }

      // match the password
      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'Invalid Credentials' }] });
      }

      const payload = {
        user: {
          id: user.id,
          // with moongose we dont have to use user._id, we can actally use user.id
        },
      };

      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
          // sending the token back to the client
        }
      );
      // dont put the secret right here, the token
    } catch (err) {
      // if something in the try goes wrong, catch take the error where the error occur
      // notice that how the error only occur in the jwtToken, because the users could be save

      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

module.exports = router;
