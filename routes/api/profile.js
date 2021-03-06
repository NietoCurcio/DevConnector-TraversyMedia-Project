const express = require('express');
const request = require('request');
const config = require('config');
const router = express.Router();
const auth = require('../../middleware/auth');
const { check, validationResult } = require('express-validator');

const Profile = require('../../models/Profile');
const User = require('../../models/User');
const Post = require('../../models/Post');
const { Router } = require('express');
const { remove } = require('../../models/Profile');
const axios = require('axios');

// @route   GET api/profile/me
// @desc    Get current users profile
// @access  Private
// endpoint = route but endpoint is like take a data (in our backend routes) and send to our client
router.get('/me', auth, async (req, res) => {
  // when use moongose, that returns a promise, so async..await together with try catch

  try {
    const profile = await await Profile.findOne({
      user: req.user.id,
    }).populate('user', ['name', 'avatar']);
    // populate add stuff to our query

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Internal Error');
  }
});

// @route   POST api/profile
// @desc    Create or update an user profile
// @access  Private
router.post(
  '/',
  [
    auth,
    [
      check('status', 'Status is required').not().isEmpty(),
      check('skills', 'Skills is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      company,
      location,
      website,
      bio,
      skills,
      status,
      githubusername,
      youtube,
      twitter,
      instagram,
      linkedin,
      facebook,
    } = req.body;

    // Build profile object
    const profileFields = {};
    profileFields.user = req.user.id;
    if (company) profileFields.company = company;
    if (website) profileFields.website = website;
    if (location) profileFields.location = location;
    if (bio) profileFields.bio = bio;
    if (status) profileFields.status = status;
    if (githubusername) profileFields.githubusername = githubusername;
    if (skills) {
      profileFields.skills = skills.split(',').map((skill) => skill.trim());
    }

    // Build social object
    profileFields.social = {};
    if (youtube) profileFields.social.youtube = youtube;
    if (twitter) profileFields.social.twitter = twitter;
    if (facebook) profileFields.social.facebook = facebook;
    if (linkedin) profileFields.social.linkedin = linkedin;
    if (instagram) profileFields.social.instagram = instagram;

    try {
      let profile = await Profile.findOne({ user: req.user.id });

      if (profile) {
        // Update
        profile = await Profile.findOneAndUpdate(
          { user: req.user.id },
          { $set: profileFields },
          { new: true }
        );

        return res.json(profile);
      }

      // Create
      profile = new Profile(profileFields);
      // profileFields is already a object

      await profile.save();
      // profile take the Profile model constructor, then he have access to .save method

      res.json(profile);
    } catch (err) {
      console.error(errr.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route   GET api/profile
// @desc    Get all profiles
// @access  Public
router.get('/', async (req, res) => {
  try {
    const profiles = await Profile.find().populate('user', ['name', 'avatar']);
    res.json(profiles);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   GET api/profile/user/:user_id
// @desc    Get profile by user id
// @access  Public
// notice that here we have request params, so req.params, that come in url or uri
router.get('/user/:user_id', async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.params.user_id,
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'Profile not found' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId')
      return res.status(400).json({ msg: 'Profile not found' });

    res.status(500).send('Internal Server Error');
  }
});

// @route   DELETE api/profile
// @desc    Delete profile, user & post
// @access  Private
router.delete('/', auth, async (req, res) => {
  try {
    // Remove user posts
    await Post.deleteMany({ user: req.user.id });

    // Remove Profile
    await Profile.findOneAndRemove({ user: req.user.id });
    // Note that in findById will search for '_id: idValue' field, not user: idValue

    // Remove user
    await User.findOneAndRemove({ _id: req.user.id });
    // _id: req.user.id }); if I try id: req.user.id, dont work

    // findById and findOne only work with _id: req.user.id, '_id'

    res.json({ msg: 'User deleted' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   PUT api/profile/education
// @desc    Add profile education
// @access  Private
router.put(
  '/education',
  [
    auth,
    [
      check('school', 'School is required').not().isEmpty(),
      check('degree', 'Degree is required').not().isEmpty(),
      check('fieldofstudy', 'Field of study is required').not().isEmpty(),
      check('from', 'From data is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    } = req.body;

    const newEdu = {
      school,
      degree,
      fieldofstudy,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.education.unshift(newEdu);
      // push and unshift for arrays, unshift is in the beginning and push end

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route   DELETE api/profile/education/:edu_id
// @desc    Delete education from profile
// @access  Private
router.delete('/education/:edu_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.education
      .map((item) => item.id)
      .indexOf(req.params.edu_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Could not find this education Id' });
    }

    profile.education.splice(removeIndex, 1);

    // {
    //   current: false,
    //   _id: '5ee6ba0ee41f353170cfeba2',
    //   title: 'felipao',
    //   company: 'test',
    //   location: 'brazil',
    //   from: '2022-08-08T03:00:00.000Z',
    //   description: 'web developer supervisor',
    // } to update, add a third argument with the same id, and the new data, look .splice documentation

    await profile.save();

    res.json(profile);
    // splice = take something out
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   PUT api/profile/experience
// @desc    Add profile experience
// @access  Private
router.put(
  '/experience',
  [
    auth,
    [
      check('title', 'Title is required').not().isEmpty(),
      check('company', 'Company is required').not().isEmpty(),
      check('from', 'From data is required').not().isEmpty(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    } = req.body;

    const newExp = {
      title,
      company,
      location,
      from,
      to,
      current,
      description,
    };
    try {
      const profile = await Profile.findOne({ user: req.user.id });

      profile.experience.unshift(newExp);
      // push and unshift for arrays, unshift is in the beginning and push end

      await profile.save();

      res.json(profile);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Internal Server Error');
    }
  }
);

// @route   DELETE api/profile/experience/:exp_id
// @desc    Delete profile experience
// @access  Private
router.delete('/experience/:exp_id', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id });

    // Get remove index
    const removeIndex = profile.experience
      .map((item) => item.id)
      .indexOf(req.params.exp_id);

    if (removeIndex === -1) {
      return res.status(400).json({ msg: 'Could not find this experience Id' });
    }

    profile.experience.splice(removeIndex, 1);

    // {
    //   current: false,
    //   _id: '5ee6ba0ee41f353170cfeba2',
    //   title: 'felipao',
    //   company: 'test',
    //   location: 'brazil',
    //   from: '2022-08-08T03:00:00.000Z',
    //   description: 'web developer supervisor',
    // } to update add a third argument with the same id, and the new data, look .splice documentation

    await profile.save();

    res.json(profile);
    // splice = take something out
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});

// @route   GET api/profile/github/:username
// @desc    Get user repos from github
// @access  Public
router.get('/github/:username', async (req, res) => {
  try {
    const uri = encodeURI(
      `https://api.github.com/users/${req.params.username}/repos?per_page=5&sort=created:asc`
    );

    const headers = {
      'user-agent': 'node.js',
      Authorization: `token ${config.get('githubToken')}`,
    };

    const gitHubResponse = await axios.get(uri, { headers });
    // console.log('felipao');
    // console.log(body); in this way, we received body like "id": "123", "name": "felipe"
    // console.log('felipao');
    // console.log(JSON.parse(body)); and this, we take body like id: 123, name: "felipe"

    res.json(gitHubResponse.data);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Internal Server Error');
  }
});
module.exports = router;
