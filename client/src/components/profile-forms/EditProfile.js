import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import withRouter from "../../withRouter";
import { createProfile } from "../../actions/profile";
import { getCurrentProfile } from "../../actions/profile";


const EditProfile = ({
	profile: { profile, loading },
	createProfile,
	getCurrentProfile,
	history,
}) => {

	const [formData, setFormData] = useState({
		company: "",
		website: "",
		location: "",
		status: "",
		skills: "",
		githubusername: "",
		bio: "",
		twitter: "",
		facebook: "",
		linkedin: "",
		youtube: "",
		instagram: "",
	});

	const [displaySocialInputs, toggleSocialInputs] = useState(false);

  useEffect(()=>{
    getCurrentProfile();

    setFormData({
			company: loading || !profile.company ? "" : profile.company,
			website: loading || !profile.website ? "" : profile.website,
			location: loading || !profile.location ? "" : profile.location,
			status: loading || !profile.status ? "" : profile.status,
			skills: loading || !profile.skills ? "" : profile.skills.join(","),
			githubusername:
				loading || !profile.githubusername ? "" : profile.githubusername,
			bio: loading || !profile.bio ? "" : profile.bio,
			twitter: loading || !profile.twitter ? "" : profile.twitter,
			facebook: loading || !profile.social ? "" : profile.social.facebook,
			linkedin: loading || !profile.social ? "" : profile.social.linkedin,
			youtube: loading || !profile.social ? "" : profile.social.youtube,
			instagram: loading || !profile.social ? "" : profile.social.instagram,
		});
  },[loading])

	const {
		company,
		website,
		location,
		status,
		skills,
		githubusername,
		bio,
		twitter,
		facebook,
		linkedin,
		youtube,
		instagram,
	} = formData;

	const onChange = (e) =>
		setFormData({ ...formData, [e.target.name]: e.target.value });

	const onSubmit = (event) => {
		event.preventDefault();
		createProfile(formData, history, true);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Create Your Profile</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Let's get some information to make your
				profile stand out
			</p>
			<small>* = required field</small>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<select name="status" value={status} onChange={(e) => onChange(e)}>
						<option value="0">* Select Professional Status</option>
						<option value="Developer">Developer</option>
						<option value="Junior Developer">Junior Developer</option>
						<option value="Senior Developer">Senior Developer</option>
						<option value="Manager">Manager</option>
						<option value="Student or Learning">Student or Learning</option>
						<option value="Instructor">Instructor or Teacher</option>
						<option value="Intern">Intern</option>
						<option value="Other">Other</option>
					</select>
					<small className="form-text">
						Give us an idea of where you are at in your career
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Company"
						name="company"
						value={company}
						onChange={(e) => onChange(e)}
					/>
					<small className="form-text">
						Could be your own company or one you work for
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Website"
						value={website}
						onChange={(e) => onChange(e)}
						name="website"
					/>
					<small className="form-text">
						Could be your own or a company website
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Location"
						value={location}
						onChange={(e) => onChange(e)}
						name="location"
					/>
					<small className="form-text">
						City & state suggested (eg. Boston, MA)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Skills"
						value={skills}
						onChange={(e) => onChange(e)}
						name="skills"
					/>
					<small className="form-text">
						Please use comma separated values (eg. HTML,CSS,JavaScript,PHP)
					</small>
				</div>
				<div className="form-group">
					<input
						type="text"
						value={githubusername}
						onChange={(e) => onChange(e)}
						placeholder="Github Username"
						name="githubusername"
					/>
					<small className="form-text">
						If you want your latest repos and a Github link, include your
						username
					</small>
				</div>
				<div className="form-group">
					<textarea
						placeholder="A short bio of yourself"
						value={bio}
						onChange={(e) => onChange(e)}
						name="bio"
					></textarea>
					<small className="form-text">Tell us a little about yourself</small>
				</div>

				<div className="my-2">
					<button
						onClick={() => toggleSocialInputs(!displaySocialInputs)}
						type="button"
						className="btn btn-light"
					>
						Add Social Network Links
					</button>
					<span>Optional</span>
				</div>

				{displaySocialInputs && (
					<Fragment>
						<div className="form-group social-input">
							<i className="fab fa-twitter fa-2x"></i>
							<input
								type="text"
								value={twitter}
								onChange={(e) => onChange(e)}
								placeholder="Twitter URL"
								name="twitter"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-facebook fa-2x"></i>
							<input
								type="text"
								value={facebook}
								onChange={(e) => onChange(e)}
								placeholder="Facebook URL"
								name="facebook"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-youtube fa-2x"></i>
							<input
								value={youtube}
								onChange={(e) => onChange(e)}
								type="text"
								placeholder="YouTube URL"
								name="youtube"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-linkedin fa-2x"></i>
							<input
								value={linkedin}
								onChange={(e) => onChange(e)}
								type="text"
								placeholder="Linkedin URL"
								name="linkedin"
							/>
						</div>

						<div className="form-group social-input">
							<i className="fab fa-instagram fa-2x"></i>
							<input
								value={instagram}
								onChange={(e) => onChange(e)}
								type="text"
								placeholder="Instagram URL"
								name="instagram"
							/>
						</div>
					</Fragment>
				)}

				<input type="submit" className="btn btn-primary my-1" />
				<Link to="/dashboard" className="btn btn-light my-1">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

EditProfile.propTypes = {
	createProfile: PropTypes.func.isRequired,
	profile: PropTypes.object.isRequired,
	getCurrentProfile: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
	profile: state.profile,
});

export default connect(mapStateToProps, { createProfile, getCurrentProfile })(
	withRouter(EditProfile)
);
