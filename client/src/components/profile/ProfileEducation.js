import React from "react";
import PropTypes from "prop-types";
import Moment from "react-moment";

const ProfileEducation = ({
	experience: { school, degree, fieldofstudy, current, to, from, description },
}) => {
	return (
		<div>
			<h3 className="text-dark ">
				<p>
					<Moment format="YYYY/MM/DD">{from}</Moment> -{" "}
					{!to ? "Now" : <Moment format="YYYY/MM/DD">{to}</Moment>}
				</p>
				<p>
					<strong>Degree: </strong>
					{degree}
				</p>
				<p>
					<strong>Field of Study: </strong>
					{fieldofstudy}
				</p>
				<p>
					<strong>School: </strong>
					{school}
				</p>
			</h3>
		</div>
	);
};

ProfileEducation.propTypes = {
	experience: PropTypes.array.isRequired,
};

export default ProfileEducation;
