const express = require("express");
const auth = require("../../middleware/auth");
const router = express.Router();
const User = require("../../models/User");
const { check, validationResult } = require("express-validator/check");
const Profile = require("../../models/Profile");

// @route  GET api/profile/me
// @desc   Test route
// @access  Public

router.get("/me", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id }).populate(
			"user",
			["name", "avatar"]
		);

		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for the user" });
		}
	} catch (err) {
		console.error(err.message);
		res.status(500).send;
	}
});

// @route  GET api/profile/
// @desc   Create or Update a User Profile
// @access  Private

router.post(
	"/",
	[
		auth,
		[
			check("status", "status is required").not().isEmpty(),
			check("skills", "Skills is required").not().isEmpty(),
		],
	],
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const {
			company,
			website,
			location,
			bio,
			status,
			githubusername,
			skills,
			youtube,
			facebook,
			twitter,
			instagram,
			linkedin,
		} = req.body;

		//profile oject
		const profileFields = {};
		profileFields.user = req.user.id;
		if (company) profileFields.company = company;
		if (website) profileFields.website = website;
		if (location) profileFields.location = location;
		if (bio) profileFields.bio = bio;
		if (status) profileFields.status = status;
		if (githubusername) profileFields.githubusername = githubusername;
		if (skills) {
			profileFields.skills = skills.split(",").map((skill) => skill.trim());
		}

		profileFields.social = {};
		if (youtube) profileFields.social.youtube = youtube;
		if (twitter) profileFields.social.youtube = twitter;
		if (facebook) profileFields.social.youtube = facebook;
		if (linkedin) profileFields.social.youtube = linkedin;
		if (instagram) profileFields.social.youtube = instagram;

		try {
			let profile = Profile.findOne({ user: req.user.id });

			if (profile) {
				profile = await Profile.findOneAndUpdate(
					{ user: req.user.id },
					{ $set: profileFields },
					{ new: true }
				);
				console.log(res);
				return res.json(profile);
			}

			profile = new Profile(profileFields);
			await profile.save();
			res.json(profile);
		} catch (error) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

module.exports = router;
