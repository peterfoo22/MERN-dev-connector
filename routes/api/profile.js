const express = require('express');
const auth = require('../../middleware/auth');
const router = express.Router();
const User = require('../../models/User')
const { check, validationResult } = require('express-validator/check')
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

// @route  GET api/profile/
// @desc   Create or Update a User Profile
// @access  Private

router.post(
'/',
[ 
  auth,
  [
    check('status', "status is required").not().isEmpty(),
    check('skills', 'Skills is required').not().isEmpty()
    
  ]
], 
(req, res)=>{
  const errors = validationResult(req);
  if(!errors.isEmpty()) {
    return res.status(400).json( {errors: errors.array() });
  }
});

module.exports = router;