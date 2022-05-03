import React, { Fragment, useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
	const [formData, setFormData] = useState({
		email: "",
		password: "",
	});

	const { email, password } = formData;

	const onChange = async (e) => {
		setFormData({ ...formData, [e.target.name]: e.target.value });
	};

	const onSubmit = (e) => {
		e.preventDefault();
		console.log('sucess');
		if (password !== '123456') {
			console.log("Passwords don't match");
		} else {

			console.log('success')
			// const newUser = {
			// 	name,
			// 	email,
			// 	password
			// }

			// try {
			// const url = "http://localhost:5001/api/users";
			// const options = {
			// method: "POST",
			// headers: {
			// 	Accept: "application/json",
			// 	"Content-Type": "application/json;charset=UTF-8",
			// },
			// body: JSON.stringify(newUser),
			// };
			// fetch(url, options)
			// .then((response) => response.json())
			// .then((data) => {
			// 	console.log(data);
			// });
			// } catch (err) {
			// 	console.error(err.response.data);
			// }

			

		}
	};

	return (
		<Fragment>
			<h1 className="large text-primary">Sign In</h1>
			<p className="lead">
				<i className="fas fa-user"></i> Sign Into Your Account
			</p>
			<form className="form" onSubmit={(e) => onSubmit(e)}>

				<div className="form-group">
					<input
						type="email"
						placeholder="Email Address"
						value={email}
						onChange={(e) => onChange(e)}
						name="email"
					/>
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
				<input type="submit" className="btn btn-primary" value="Login" />
			</form>
			<p className="my-1">
				Don't have Account? <Link to="/register">Sign Up</Link>
			</p>
		</Fragment>
	);
};

export default Login;
