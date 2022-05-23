const express = require("express");
const request = require("request");
const config = require("config");
const auth = require("../../middleware/auth");
const router = express.Router();
const { check, validationResult } = require("express-validator/check");
const Profile = require("../../models/Profile");
const User = require("../../models/User");

// @route    GET api/profile/me
// @desc     Get current users profile
// @access   Private
router.get('/me', auth, async (req, res) => {
  try {
    const profile = await Profile.findOne({
      user: req.user.id
    }).populate('user', ['name', 'avatar']);

    if (!profile) {
      return res.status(400).json({ msg: 'There is no profile for this user' });
    }

    res.json(profile);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server Error');
  }
}); 

// @route  post api/profile/
// @desc   Create or Update a User Profile
// @access  Private

router.post(
	"/",
	auth,
	check("status", "Status is required").notEmpty(),
	check("skills", "Skills is required").notEmpty(),
	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		// destructure the request
		const {
			website,
			skills,
			youtube,
			twitter,
			instagram,
			linkedin,
			facebook,
			// spread the rest of the fields we don't need to check
			...rest
		} = req.body;

		// build a profile
		const profileFields = {
			user: req.user.id,
			website:
				website && website !== ""
					? normalize(website, { forceHttps: true })
					: "",
			skills: Array.isArray(skills)
				? skills
				: skills.split(",").map((skill) => " " + skill.trim()),
			...rest,
		};

		// Build socialFields object
		const socialFields = { youtube, twitter, instagram, linkedin, facebook };

		// normalize social fields to ensure valid url
		for (const [key, value] of Object.entries(socialFields)) {
			if (value && value.length > 0)
				socialFields[key] = normalize(value, { forceHttps: true });
		}
		// add to profileFields
		profileFields.social = socialFields;

		try {
			// Using upsert option (creates new doc if no match is found):
			let profile = await Profile.findOneAndUpdate(
				{ user: req.user.id },
				{ $set: profileFields },
				{ new: true, upsert: true, setDefaultsOnInsert: true }
			);
			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			return res.status(500).send("Server Error");
		}
	}
);
// @route  GET api/profile/user/:user_id
// @desc   Get profile by user ID
// @access  Public

router.get("/user/:user_id", async (req, res) => {
	try {
		const profile = await Profile.findOne({
			user: req.params.user_id,
		}).populate("user", ["name", "avatar"]);

		if (!profile) {
			return res.status(400).json({ msg: "There is no profile for this user" });
		}

		return res.json(profile);
	} catch (err) {
		console.error(err.message);
		if (err.kind == "ObjectId") {
			return res.status(400).json({ msg: "Profile Not Found" });
		}
		res.status(500).send("Server Error");
	}
});

//@route  delete api/profile
// @desc  delete profiel, user & posts
// @access  Private

router.delete("/", auth, async (req, res) => {
	try {
		//Remove Profile
		await Profile.findOneAndRemove({
			user: req.user.id,
		});

		await User.findOneAndRemove({
			_id: req.user.id,
		});

		return res.json({ msg: "User Deleted" });
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

// @route  PUT api/profile/experience
// @desc   Get profile by user ID
// @access  private

router.put(
	"/experience",
	[
		auth,
		[
			check("title", "title is required").not().isEmpty(),
			check("company", "Company is required").not().isEmpty(),
			check("from", "from date is required").not().isEmpty(),
		],
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { title, company, location, from, to, current, description } =
			req.body;

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

			await profile.save();

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route  DELETE api/profile/:exp_id
// @desc   Delete Experience from Profile
// @access  Private

router.delete("/experience/:exp_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get Remove Index
		const removeIndex = profile.experience
			.map((item) => item.id)
			.indexOf(req.params.exp_id);

		profile.experience.splice(removeIndex, 1);

		await profile.save();
	} catch (err) {}
});

// @route  PUT api/profile/experience
// @desc   Get profile by user ID
// @access  private

router.put(
	"/education",
	[
		auth,
		[
			check("school", "School is required").not().isEmpty(),
			check("degree", "Degree is required").not().isEmpty(),
			check("fieldofstudy ", "Field of Study is required").not().isEmpty(),
		],
	],

	async (req, res) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(400).json({ errors: errors.array() });
		}

		const { school, degree, fieldofstudy, from, to, current, description } =
			req.body;

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

			await profile.save();

			return res.json(profile);
		} catch (err) {
			console.error(err.message);
			res.status(500).send("Server Error");
		}
	}
);

// @route  DELETE api/profile/:edu_id
// @desc   Delete Education from Profile
// @access  Private

router.delete("/education/:edu_id", auth, async (req, res) => {
	try {
		const profile = await Profile.findOne({ user: req.user.id });

		// Get Remove Index
		const removeIndex = profile.education
			.map((item) => item.id)
			.indexOf(req.params.edu_id);

		profile.education.splice(removeIndex, 1);

		await profile.save();
	} catch (err) {}
});

// @route  GET api/profile/github/:username
// @desc   Get user repos from github
// @access  Public

router.get("/github/:username", (req, res) => {
	try {
		const options = {
			uri: `https://api.github.com/users/${
				req.params.username
			}/repos?per_page=5&sort==created:asc&client_id=${config.get(
				"gitHubClientID"
			)}$client_secret=${config.get("gitHubSecret")}`,
			method: "GET",
			headers: { "user-agent": "node.js" },
		};

		request(options, (error, response, body) => {
			if (error) {
				console.error(error);
			}

			if (response.statusCode !== 200) {
				return res.status(404).json({ msg: "No GitHub profile found" });
			} else {
				res.json(JSON.parse(body));
			}
		});
	} catch (err) {
		console.error(err.message);
		res.status(500).send("Server Error");
	}
});

module.exports = router;
