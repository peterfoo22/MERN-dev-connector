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
	GET_REPOS,
} from "./types";

// Get current users profile

export const getCurrentProfile = () => async (dispatch) => {
	try {
		const res = await axios.get("/api/profile/me");

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		console.log("Success - Curren User:", res.data);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//get all profiles

export const getProfiles = () => async (dispatch) => {
	dispatch({ type: CLEAR_PROFILE });
	try {
		const res = await axios.get("/api/profile/");

		dispatch({
			type: GET_PROFILES,
			payload: res.data,
		});

		console.log("Success - All Profiles:", res.data);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//get one profile

export const getProfileByID = (userID) => async (dispatch) => {
	try {
		const res = await axios.get(`/api/profile/user/${userID}`);

		dispatch({
			type: GET_PROFILE,
			payload: res.data,
		});

		console.log("Success - One Profile :", res.data);
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
		const res = await axios.get(`/api/profile/github/${username}`);

		dispatch({
			type: GET_REPOS,
			payload: res.data,
		});

		console.log("Success - GITHUB:", res.data);
	} catch (err) {
		dispatch({
			type: PROFILE_ERROR,
			payload: { msg: err.response.status.text, status: err.response.status },
		});
	}
};

//create or update a profile

export const createProfile =
	(formData, edit = false) =>
	async (dispatch) => {

		const token = JSON.parse(`${localStorage.token}`.trim());
		console.log(token);
		try {
			fetch("/api/profile", {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
					"x-auth-token": token
				},
				body: JSON.stringify(formData),
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Success:", data);
					dispatch({
						type: GET_PROFILE,
						payload: data,
					});
					dispatch(
						setAlert(edit ? "Profile Updated" : "Profile Created", "success")
					);
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
		const res = await axios.put("/profile/experience", formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Experience Added", "success"));
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
		const res = await axios.put("/profile/education", formData);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Education Added", "success"));
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
		const res = await axios.delete(`/profile/experience/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Experience Removed", "success"));
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
		const res = await axios.delete(`/profile/education/${id}`);

		dispatch({
			type: UPDATE_PROFILE,
			payload: res.data,
		});

		dispatch(setAlert("Education Removed", "success"));
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
			await axios.delete("/profile");

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
