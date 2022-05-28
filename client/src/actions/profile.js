import axios from "axios";
import { setAlert } from "./alert";

//import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR, UPDATE_PROFILE } from "./types";

// Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("http://localhost:5001/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//create or update a profile

export const createProfile =
	(formData, history, edit = false) =>
	async (dispatch) => {

		try {
			// could not use the axios.post command as it as not working, used the fetch command instead
			await fetch("http://localhost:5001/api/profile/", {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"x-auth-token": `${localStorage.token}`,
				},
				body: JSON.stringify(formData), // error if you don't turn into JSON
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Success:", data);

					dispatch({
						type: GET_PROFILE,
						payload: data,
					});

					dispatch(setAlert(edit ? "Profile Updated" : "Profile Created"));

				
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.status.text, status: err.response.status },
			});
		}
	};


// add experience

export const addExperience = (formData) => async (dispatch) => {
			try {

			console.log('this is hitting this function')
			// could not use the axios.post command as it as not working, used the fetch command instead
			await fetch("http://localhost:5001/api/profile/experience", {
				method: "PUT", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"x-auth-token": `${localStorage.token}`,
				},
				body: JSON.stringify(formData), // error if you don't turn into JSON
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Success:", data);

					dispatch({
						type: UPDATE_PROFILE,
						payload: data,
					});

					dispatch(setAlert("Experience Added", "Success"));
				})
				.catch((error) => {
					console.error("Error:", error);
				});
		} catch (err) {
			const errors = err.response.data.errors;

			if (errors) {
				errors.forEach((error) => {
					dispatch(setAlert(error.msg, "danger"));
				});
			}

			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.status.text, status: err.response.status },
			});
		}
}

export const addEducation = (formData) => async (dispatch) => {
	try {
		// could not use the axios.post command as it as not working, used the fetch command instead
		await fetch("http://localhost:5001/api/profile/education", {
			method: "PUT", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"x-auth-token": `${localStorage.token}`,
			},
			body: JSON.stringify(formData), // error if you don't turn into JSON
		})
			.then((response) => response.json())
			.then((data) => {
				console.log("Success:", data);

				dispatch({
					type: UPDATE_PROFILE,
					payload: data,
				});

				dispatch(setAlert("Education Added", "Success"));
			})
			.catch((error) => {
				console.error("Error:", error);
			});
	} catch (err) {
		const errors = err.response.data.errors;

		if (errors) {
			errors.forEach((error) => {
				dispatch(setAlert(error.msg, "danger"));
			});
		}

		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};