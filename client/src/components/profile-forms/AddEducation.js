import React, { useState } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Fragment } from "react";
import { Link } from "react-router-dom";
import { addEducation } from "../../actions/profile";
import withRouter from "../../withRouter";

const AddEducation = ({ addEducation }) => {
	const [formData, setFormData] = useState({
		school: "",
		degree: "",
		fieldofstudy: "",
		from: "",
		to: "",
		current: false,
		description: "",
	});

	const [toDateDisabled, toggleDisabled] = useState(false);

	const { school, degree, fieldofstudy, from, to, current, description } = formData;

	const onChange = (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		addEducation(formData);
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Add You Education</h1>
			<p className="lead">
				<i className="fas fa-code-branch"></i> Add any school or bootcamp have attended
			</p>
			<small>* = required field</small>
			<form onSubmit={(e) => onSubmit(e)} className="form">
				<div className="form-group">
					<input
						type="text"
						placeholder="* School or Bootcamp"
						value={school}
						onChange={(e) => onChange(e)}
						name="school"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="* Degree or Certificate"
						value={degree}
						onChange={(e) => onChange(e)}
						name="degree"
						required
					/>
				</div>
				<div className="form-group">
					<input
						type="text"
						placeholder="Field of Study"
						value={fieldofstudy}
						onChange={(e) => onChange(e)}
						name="fieldofstudy"
					/>
				</div>
				<div className="form-group">
					<h4>From Date</h4>
					<input
						type="date"
						placeholder="From"
						value={from}
						onChange={(e) => onChange(e)}
						name="from"
					/>
				</div>
				<div className="form-group">
					<p>
						<input
							type="checkbox"
							name="current"
							checked={current}
							value={current}
							placeholder="Current"
							onChange={(event) => {
								setFormData({ ...formData, current: !current });
								toggleDisabled(!toDateDisabled);
							}}
						/>{" "}
						Current Education
					</p>
				</div>
				<div className="form-group">
					<h4>To Date</h4>
					<input
						type="date"
						value={to}
						disabled={toDateDisabled ? "disabled" : ""}
						onChange={(e) => onChange(e)}
						name="to"
					/>
				</div>
				<div className="form-group">
					<textarea
						name="description"
						cols="30"
						rows="5"
						value={description}
						onChange={(e) => onChange(e)}
						placeholder="Program Description"
					></textarea>
				</div>
				<input type="submit" className="btn btn-primary my-1" />
				<Link to="/dashboard" className="btn btn-light my-1">
					Go Back
				</Link>
			</form>
		</Fragment>
	);
};

AddEducation.propTypes = {
	addEducation: PropTypes.func.isRequired,
};

export default connect(null, { addEducation })(withRouter(AddEducation));
