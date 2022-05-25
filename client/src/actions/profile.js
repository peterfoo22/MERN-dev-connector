import axios from "axios";
import { setAlert } from "./alert";
//import { setAlert } from "./alert";

import { GET_PROFILE, PROFILE_ERROR } from "./types";

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

			await fetch("http://localhost:5001/api/profile/", {
				method: "POST", // or 'PUT'
				headers: {
					"Content-Type": "application/json",
					'Accept': 'application/json',
					"x-auth-token": `${localStorage.token}`
				},
				body: JSON.stringify(formData), // error if you don't turn into JSON
			})
				.then((response) => response.json())
				.then((data) => {
					console.log("Success:", data);

					dispatch({
						type: GET_PROFILE,
						payload: data
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
