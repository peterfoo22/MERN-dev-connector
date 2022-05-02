import React, { Fragment, useState } from "react";

const Register = () => {
	const [formData, setFormData] = useState({
		name: "",
		email: "",
		password: "",
		password2: "",
	});

	const { name, email, password, password2 } = formData;

	const onChange = async (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		if (password !== password2) {
			console.log("Passwords don't match");
		} else {
			const newUser = {
				name,
				email,
				password
			}

			try {
			const url = "http://localhost:5001/api/users";
			const options = {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json;charset=UTF-8",
			},
			body: JSON.stringify(newUser),
			};
			fetch(url, options)
			.then((response) => response.json())
			.then((data) => {
				console.log(data);
			});
			} catch (err) {
				console.error(err.response.data);
			}

		}
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Sign Up</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Create Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>
				<div className="form-group">
					<input
						type="text"
						placeholder="Name"
						name="name"
						value={name}
						required
						onChange={(e) => onChange(e)}
					/>
				</div>
				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => onChange(e)}
						name="email"
					/>
					<small className="form-text">
						This site uses Gravatar so if you want a profile image, use a
						Gravatar email
					</small>
				</div>
				<div className="form-group">
					<input
						type="password"
						value={password}
						onChange={(e) => onChange(e)}
						placeholder="Password"
						name="password"
						minLength="6"
					/>
				</div>
				<div className="form-group">
					<input
						type="password"
						value={password2}
						onChange={(e) => onChange(e)}
						placeholder="Confirm Password"
						name="password2"
						minLength="6"
					/>
				</div>
				<input type="submit" className="btn btn-primary" value="Register" />
			</form>
			<p className="my-1">
				Already have an account? <a href="login.html">Sign In</a>
			</p>
		</Fragment>
	);
};

export default Register;
