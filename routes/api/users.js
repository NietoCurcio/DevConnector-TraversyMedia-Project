const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const gravatar = require('gravatar');
const config = require('config');
const { check, validationResult } = require('express-validator');

const User = require('../../models/User');

// @route   POST api/users
// @desc    Register user
// @access  public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with six or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req); // remenber req.body, req.params, req.query
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password } = req.body;

    // User.findOne().then().catch()

    try {
      // Verify if user exist
      let user = await User.findOne({ email });

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ msg: 'User already exist' }] });
        // this array is for embedded with errors array in our validation
      }

      // Get users gravatar

      const avatar = gravatar.url(email, {
        s: '200', //size
        r: 'pg', //rating
        d: 'mm', // default image
      });

      user = new User({
        //create a new instance with User constructor
        name,
        email,
        avatar,
        password,
      });
      // Encrypt password
      const salt = await bcrypt.genSalt(10); // salt = hash

      user.password = await bcrypt.hash(password, salt);
      // promise is nothing less than receive something, receive a information, .then, .await

      // user.save().then()
      await user.save(); // or even post, give a information, besides receive

      // Return jsonwebtoken
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
