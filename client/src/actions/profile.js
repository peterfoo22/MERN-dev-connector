import axios from "axios";
import { setAlert } from "./alert";

//import { setAlert } from "./alert";

import {
	GET_PROFILE,
	PROFILE_ERROR,
	UPDATE_PROFILE,
	ACCOUNT_DELETED,
	CLEAR_PROFILE,
	GET_PROFILES,
	GET_REPOS
} from "./types";

// Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("http://localhost:5001/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		console.log("Success:", res.data);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//get all profiles

export const getProfiles = () => async (dispatch) => {
	dispatch({type: CLEAR_PROFILE});
	try {
		const res = await axios.get("http://localhost:5001/api/profile/");

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});

		console.log("Success:", res.data);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//get all profiles

export const getProfileByID = (userID) => async (dispatch) => {
	try {
		const res = await axios.get(`http://localhost:5001/api/profile/user/${userID}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		console.log("Success:", res.data);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//get githubrepos

export const getGitHubRepos = (username) => async (dispatch) => {
	try {
		const res = await axios.get(`http://localhost:5001/api/profile/github/${username}`);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});

		console.log("Success:", res.data);
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
};

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

//delete experience

export const deleteExperience = (id) => async (dispatch) => {
	try {
		fetch(`http://localhost:5001/api/profile/experience/${id}`, {
			method: "DELETE", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"x-auth-token": `${localStorage.token}`,
			},
		});

		dispatch({
			type: UPDATE_PROFILE,
		});

		dispatch(setAlert("Experience Removed", "success"));

		window.setInterval(window.location.reload(), 20000);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

// delete education

export const deleteEducation = (id) => async (dispatch) => {
	try {
		fetch(`http://localhost:5001/api/profile/education/${id}`, {
			method: "DELETE", // or 'PUT'
			headers: {
				"Content-Type": "application/json",
				Accept: "application/json",
				"x-auth-token": `${localStorage.token}`,
			},
		});

		dispatch({
			type: UPDATE_PROFILE,
		});

		dispatch(setAlert("Education Removed", "success"));

		window.setInterval(window.location.reload(), 20000);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//delete account and profile

export const deleteAccount = (id) => async (dispatch) => {
	if (window.confirm("Are you sure? This cannot be undone!")) {
		try {
			fetch("http://localhost:5001/api/profile/", {
				method: "DELETE", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
					Accept: "application/json",
					"x-auth-token": `${localStorage.token}`,
				},
			});

			dispatch({
				type: CLEAR_PROFILE,
			});

			dispatch({
				type: ACCOUNT_DELETED,
			});

			dispatch(setAlert("Your Account has Been Deleted"));
		} catch (err) {
			dispatch({
				type: PROFILE_ERROR,
				payload: { msg: err.response.status.text, status: err.response.status },
			});
		}
	}
};
