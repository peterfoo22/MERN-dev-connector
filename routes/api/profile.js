const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User')

const Profile = require('../../models/Profile');

// @route  GET api/profile/me
// @desc   Test route
// @access  Public


router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({ user: req.user.id }).populate('user', ['name','avatar']);

    if(!profile) {
      return res.status(400).json({msg:'There is no profile for the user'});    
    }

  } catch(err) {
    console.error(err.message);
    res.status(500).send    
  }
});

module.exports = router;